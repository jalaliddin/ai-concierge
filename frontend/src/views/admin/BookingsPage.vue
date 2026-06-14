<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Transfer Bronlari</h1>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.guest="{ item }">{{ item.guest?.name }} ({{ item.guest?.room_number || '—' }})</template>
      <template #item.transfer="{ item }">{{ item.transfer?.name }}</template>
      <template #item.pickup_time="{ item }">{{ formatDate(item.pickup_time) }}</template>
      <template #item.status="{ item }">
        <v-chip :color="statusColor(item.status)" size="small">{{ item.status }}</v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-select
          :model-value="item.status"
          @update:model-value="v => updateStatus(item, v)"
          :items="['pending','confirmed','completed','cancelled']"
          density="compact"
          variant="outlined"
          hide-details
          style="width: 140px"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
const items = ref([])
const loading = ref(false)
const headers = [
  { title: 'Mehmon', key: 'guest' },
  { title: 'Transfer', key: 'transfer' },
  { title: 'Olib ketish vaqti', key: 'pickup_time' },
  { title: 'Manzil', key: 'pickup_location' },
  { title: 'Yo\'lovchilar', key: 'passengers', width: 100 },
  { title: 'Holat', key: 'status', width: 120 },
  { title: 'Status o\'zgartirish', key: 'actions', sortable: false, width: 160 },
]
const statusColors = { pending:'warning', confirmed:'info', completed:'success', cancelled:'error' }
function statusColor(s) { return statusColors[s] || 'default' }
function formatDate(d) { return d ? new Date(d).toLocaleString('uz') : '—' }
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/transfer-bookings'); items.value = data.data || data } finally { loading.value = false }
}
async function updateStatus(item, status) {
  await api.patch(`/transfer-bookings/${item.id}`, { status })
  item.status = status
}
</script>
