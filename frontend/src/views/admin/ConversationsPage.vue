<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Suhbatlar</h1>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.guest="{ item }">{{ item.guest?.name }} ({{ item.guest?.email }})</template>
      <template #item.guest_house="{ item }">{{ item.guest_house?.name }}</template>
      <template #item.status="{ item }">
        <v-chip :color="item.status === 'active' ? 'success' : 'default'" size="small">{{ item.status }}</v-chip>
      </template>
      <template #item.updated_at="{ item }">{{ new Date(item.updated_at).toLocaleString('uz') }}</template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" variant="text" color="primary" @click="viewConv(item)"><v-icon>mdi-eye</v-icon></v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="convDialog" max-width="700" scrollable>
      <v-card rounded="xl" v-if="selectedConv">
        <v-card-title class="pa-6 pb-0">
          Suhbat — {{ selectedConv.guest?.name }}
        </v-card-title>
        <v-card-text class="pa-6" style="max-height: 500px; overflow-y: auto">
          <div v-for="msg in selectedConv.messages" :key="msg.id" class="mb-3">
            <div :class="msg.role === 'user' ? 'text-right' : ''">
              <v-chip size="small" :color="msg.role === 'assistant' ? 'accent' : 'primary'" class="mb-1">
                {{ msg.role }}
              </v-chip>
              <div class="text-body-2 mt-1" style="white-space: pre-line">{{ msg.content }}</div>
              <div class="text-caption text-medium-emphasis">{{ new Date(msg.created_at).toLocaleString() }}</div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer /><v-btn @click="convDialog = false">Yopish</v-btn>
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
const convDialog = ref(false)
const selectedConv = ref(null)
const headers = [
  { title: 'Mehmon', key: 'guest' },
  { title: 'Mehmonxona', key: 'guest_house' },
  { title: 'Holat', key: 'status', width: 100 },
  { title: 'Oxirgi faollik', key: 'updated_at' },
  { title: 'Amallar', key: 'actions', sortable: false, width: 80 },
]
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/conversations'); items.value = data.data || data } finally { loading.value = false }
}
async function viewConv(item) {
  const {data} = await api.get(`/conversations/${item.id}`)
  selectedConv.value = data
  convDialog.value = true
}
</script>
