<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Buyurtmalar (Landing)</h1>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.total="{ item }">{{ item.total }} {{ item.currency }}</template>
      <template #item.status="{ item }">
        <v-chip :color="statusColor(item.status)" size="small">{{ item.status }}</v-chip>
      </template>
      <template #item.created_at="{ item }">{{ new Date(item.created_at).toLocaleDateString('uz') }}</template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" variant="text" color="primary" @click="viewOrder(item)"><v-icon>mdi-eye</v-icon></v-btn>
        <v-select
          :model-value="item.status"
          @update:model-value="v => updateStatus(item, v)"
          :items="['new','confirmed','completed','cancelled']"
          density="compact"
          variant="outlined"
          hide-details
          style="width: 130px; display: inline-flex"
          class="ml-2"
        />
      </template>
    </v-data-table>

    <v-dialog v-model="orderDialog" max-width="600">
      <v-card rounded="xl" v-if="selectedOrder">
        <v-card-title class="pa-6 pb-0">Buyurtma #{{ selectedOrder.order_number }}</v-card-title>
        <v-card-text class="pa-6">
          <div><b>Mijoz:</b> {{ selectedOrder.customer_name }}</div>
          <div><b>Email:</b> {{ selectedOrder.customer_email }}</div>
          <div><b>Tel:</b> {{ selectedOrder.customer_phone }}</div>
          <div><b>Sana:</b> {{ selectedOrder.preferred_date || '—' }}</div>
          <div><b>Jami:</b> {{ selectedOrder.total }} {{ selectedOrder.currency }}</div>
          <v-divider class="my-3" />
          <div v-for="item in selectedOrder.items" :key="item.id" class="mb-2">
            <b>{{ item.item_name }}</b> × {{ item.quantity }} = {{ item.line_total }} USD
          </div>
          <div v-if="selectedOrder.notes"><b>Izoh:</b> {{ selectedOrder.notes }}</div>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer /><v-btn @click="orderDialog = false">Yopish</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
const items = ref([])
const loading = ref(false)
const orderDialog = ref(false)
const selectedOrder = ref(null)
const statusColors = { new:'warning', confirmed:'info', completed:'success', cancelled:'error' }
function statusColor(s) { return statusColors[s] || 'default' }
const headers = [
  { title: '# Raqam', key: 'order_number', width: 130 },
  { title: 'Mijoz', key: 'customer_name' },
  { title: 'Email', key: 'customer_email' },
  { title: 'Jami', key: 'total', width: 120 },
  { title: 'Sana', key: 'created_at', width: 120 },
  { title: 'Holat', key: 'status', width: 120 },
  { title: 'Amallar', key: 'actions', sortable: false, width: 220 },
]
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/orders'); items.value = data.data || data } finally { loading.value = false }
}
function viewOrder(item) { selectedOrder.value = item; orderDialog.value = true }
async function updateStatus(item, status) { await api.patch(`/orders/${item.id}`, { status }); item.status = status }
</script>
