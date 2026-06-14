<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      permanent
      :rail="rail"
      width="260"
    >
      <!-- Logo -->
      <div class="pa-4 d-flex align-center" :class="rail ? 'justify-center' : ''">
        <v-icon color="accent" size="28" class="mr-2">mdi-compass-rose</v-icon>
        <span v-if="!rail" class="text-white font-weight-bold text-body-1">Khiva Tour</span>
        <v-btn v-if="!rail" icon variant="text" class="ml-auto" @click="rail = true">
          <v-icon color="white" size="20">mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <v-btn v-if="rail" icon variant="text" class="mx-auto d-block mb-2" @click="rail = false">
        <v-icon color="white">mdi-chevron-right</v-icon>
      </v-btn>

      <v-divider color="rgba(255,255,255,0.1)" />

      <v-list density="compact" nav class="mt-2">
        <v-list-item
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="!rail ? item.title : undefined"
          active-color="accent"
          rounded="lg"
          class="mb-1 sidebar-item"
          :value="item.to"
        >
          <template v-slot:append>
            <v-badge
              v-if="item.badge && badges[item.badge]"
              :content="badges[item.badge]"
              color="error"
              inline
            />
          </template>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-divider color="rgba(255,255,255,0.1)" class="mb-2" />
        <div class="pa-3">
          <v-list-item
            :title="!rail ? authStore.user?.name : undefined"
            :subtitle="!rail ? authStore.user?.email : undefined"
            prepend-icon="mdi-account-circle"
            class="sidebar-item"
            density="compact"
          />
          <v-btn
            @click="logout"
            variant="tonal"
            color="error"
            size="small"
            block
            class="mt-2"
            :icon="rail"
          >
            <v-icon>mdi-logout</v-icon>
            <span v-if="!rail" class="ml-1">Chiqish</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Top bar (mobile) -->
    <v-app-bar v-if="mobile" color="primary" elevation="0">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer" />
      <v-app-bar-title class="text-white font-weight-bold">Khiva Tour Admin</v-app-bar-title>
    </v-app-bar>

    <!-- Main content -->
    <v-main style="background: #F8FAFC">
      <div class="pa-4 pa-md-6" style="max-width: 1400px; margin: 0 auto">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/api/axios'

const router = useRouter()
const authStore = useAuthStore()
const drawer = ref(true)
const rail = ref(false)
const mobile = ref(window.innerWidth < 768)
const badges = ref({ requests: 0, orders: 0, bookings: 0 })

const menuItems = [
  { title: 'Dashboard', to: '/admin/dashboard', icon: 'mdi-view-dashboard' },
  { title: 'Mehmon uylari', to: '/admin/guest-houses', icon: 'mdi-home-city' },
  { title: 'Transferlar', to: '/admin/transfers', icon: 'mdi-car' },
  { title: 'Xizmatlar', to: '/admin/services', icon: 'mdi-map-marker-star' },
  { title: 'Bron qilishlar', to: '/admin/bookings', icon: 'mdi-calendar-check', badge: 'bookings' },
  { title: 'Buyurtmalar', to: '/admin/orders', icon: 'mdi-shopping', badge: 'orders' },
  { title: "So'rovlar", to: '/admin/requests', icon: 'mdi-bell-alert', badge: 'requests' },
  { title: 'Registratsiyalar', to: '/admin/registrations', icon: 'mdi-card-account-details' },
  { title: 'Qoidalar', to: '/admin/house-rules', icon: 'mdi-format-list-checks' },
  { title: 'Bilim bazasi', to: '/admin/knowledge-base', icon: 'mdi-book-open-variant' },
  { title: 'Tavsiyalar', to: '/admin/recommendations', icon: 'mdi-map-marker-radius' },
  { title: 'Blog', to: '/admin/posts', icon: 'mdi-post' },
  { title: 'Suhbatlar', to: '/admin/conversations', icon: 'mdi-chat' },
]

let pollInterval = null

onMounted(() => {
  fetchBadges()
  pollInterval = setInterval(fetchBadges, 30000)
})

onUnmounted(() => clearInterval(pollInterval))

async function fetchBadges() {
  try {
    const { data } = await api.get('/dashboard/stats')
    badges.value.requests = data.kpi.new_requests || 0
    badges.value.orders = data.kpi.pending_orders || 0
    badges.value.bookings = data.kpi.pending_bookings || 0
  } catch {}
}

async function logout() {
  await authStore.logout()
  router.push('/admin/login')
}
</script>

<style scoped>
.sidebar-item {
  color: #E2E8F0 !important;
}
.sidebar-item :deep(.v-icon) { color: rgba(226, 232, 240, 0.7) !important; }
.sidebar-item:hover :deep(.v-icon) { color: #14B8A6 !important; }
.v-list-item--active .sidebar-item,
:deep(.v-list-item--active) {
  background: rgba(20, 184, 166, 0.15) !important;
  border-left: 3px solid #14B8A6;
}
:deep(.v-list-item--active .v-icon) { color: #14B8A6 !important; }
</style>
