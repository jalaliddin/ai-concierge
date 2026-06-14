<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Mehmon So'rovlari</h1>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.guest="{ item }">{{ item.guest?.name }}</template>
      <template #item.type="{ item }">
        <v-chip size="small" variant="tonal">{{ item.type }}</v-chip>
      </template>
      <template #item.priority="{ item }">
        <v-chip :color="priorityColor(item.priority)" size="small">{{ item.priority }}</v-chip>
      </template>
      <template #item.status="{ item }">
        <v-chip :color="statusColor(item.status)" size="small">{{ item.status }}</v-chip>
      </template>
      <template #item.created_at="{ item }">{{ new Date(item.created_at).toLocaleDateString('uz') }}</template>
      <template #item.actions="{ item }">
        <v-select
          :model-value="item.status"
          @update:model-value="v => updateStatus(item, v)"
          :items="['new','in_progress','resolved']"
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
  { title: 'Tur', key: 'type', width: 130 },
  { title: 'Mavzu', key: 'subject' },
  { title: 'Muhimlik', key: 'priority', width: 100 },
  { title: 'Holat', key: 'status', width: 120 },
  { title: 'Sana', key: 'created_at', width: 120 },
  { title: 'Status', key: 'actions', sortable: false, width: 160 },
]
const priorityColors = { low:'success', medium:'warning', high:'error' }
const statusColors = { new:'warning', in_progress:'info', resolved:'success' }
function priorityColor(p) { return priorityColors[p] || 'default' }
function statusColor(s) { return statusColors[s] || 'default' }
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/requests'); items.value = data.data || data } finally { loading.value = false }
}
async function updateStatus(item, status) { await api.patch(`/requests/${item.id}`, { status }); item.status = status }
</script>
