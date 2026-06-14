<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Dashboard</h1>

    <!-- KPI Cards -->
    <v-row class="mb-6">
      <v-col v-for="kpi in kpiCards" :key="kpi.title" cols="6" sm="4" md="2" lg="2">
        <v-card rounded="lg" elevation="1" class="text-center pa-4">
          <v-icon :color="kpi.color" size="36" class="mb-2">{{ kpi.icon }}</v-icon>
          <div class="text-h5 font-weight-bold" :class="`text-${kpi.color}`">{{ stats.kpi?.[kpi.key] ?? 0 }}</div>
          <div class="text-caption text-medium-emphasis mt-1">{{ kpi.title }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts -->
    <v-row>
      <v-col cols="12" md="7">
        <v-card rounded="lg" elevation="1" class="pa-4">
          <h3 class="text-body-1 font-weight-bold mb-4">Haftalik Mehmonlar</h3>
          <div v-if="stats.weekly_guests?.length">
            <div class="chart-bars d-flex align-end" style="height: 120px; gap: 6px">
              <div
                v-for="d in guestChartData"
                :key="d.date"
                class="chart-bar flex-grow-1"
                :style="{ height: d.height + '%', background: '#14B8A6', borderRadius: '4px 4px 0 0' }"
                :title="`${d.date}: ${d.count} mehmon`"
              />
            </div>
            <div class="d-flex justify-between mt-1">
              <span v-for="d in guestChartData" :key="d.date" class="text-caption text-medium-emphasis">
                {{ d.label }}
              </span>
            </div>
          </div>
          <div v-else class="text-center text-medium-emphasis py-8">Hali ma'lumot yo'q</div>
        </v-card>
      </v-col>

      <v-col cols="12" md="5">
        <v-card rounded="lg" elevation="1" class="pa-4">
          <h3 class="text-body-1 font-weight-bold mb-4">Tezkor harakatlar</h3>
          <v-list density="compact">
            <v-list-item
              v-for="action in quickActions"
              :key="action.to"
              :to="action.to"
              :prepend-icon="action.icon"
              :title="action.title"
              :subtitle="action.subtitle"
              rounded="lg"
              class="mb-1"
            />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api/axios'

const stats = ref({ kpi: {}, weekly_guests: [], weekly_revenue: [] })

const kpiCards = [
  { key: 'guests_today', title: "Bugungi mehmonlar", icon: 'mdi-account-group', color: 'accent' },
  { key: 'active_conversations', title: "Faol suhbatlar", icon: 'mdi-chat', color: 'info' },
  { key: 'pending_bookings', title: "Kutilayotgan bronlar", icon: 'mdi-car-clock', color: 'warning' },
  { key: 'pending_orders', title: "Yangi buyurtmalar", icon: 'mdi-shopping', color: 'success' },
  { key: 'new_requests', title: "Yangi so'rovlar", icon: 'mdi-bell-alert', color: 'error' },
]

const quickActions = [
  { to: '/admin/bookings', icon: 'mdi-car', title: 'Bronlarni ko\'rish', subtitle: 'Transfer bronlari' },
  { to: '/admin/orders', icon: 'mdi-shopping', title: 'Buyurtmalar', subtitle: 'Landing buyurtmalari' },
  { to: '/admin/requests', icon: 'mdi-bell', title: "So'rovlar", subtitle: 'Mehmon so\'rovlari' },
  { to: '/admin/registrations', icon: 'mdi-card-account-details', title: 'Registratsiyalar', subtitle: 'Kartochka yuborish' },
]

const guestChartData = computed(() => {
  const data = stats.value.weekly_guests || []
  const max = Math.max(...data.map(d => d.count), 1)
  return data.map(d => ({
    date: d.date,
    count: d.count,
    height: Math.max((d.count / max) * 100, 5),
    label: new Date(d.date).toLocaleDateString('uz', { weekday: 'short' }),
  }))
})

onMounted(async () => {
  try {
    const { data } = await api.get('/dashboard/stats')
    stats.value = data
  } catch {}
})
</script>

<style scoped>
.chart-bars { padding: 0 4px; }
.chart-bar { min-width: 20px; transition: height 0.3s ease; }
</style>
