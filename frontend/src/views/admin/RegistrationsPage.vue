<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-6">Registratsiyalar</h1>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.guest="{ item }">{{ item.guest?.name }} ({{ item.guest?.email }})</template>
      <template #item.status="{ item }">
        <v-chip :color="statusColor(item.status)" size="small">{{ item.status }}</v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-btn
          v-if="item.status === 'requested'"
          size="small"
          color="accent"
          variant="tonal"
          class="mr-2"
          @click="openUpload(item)"
        >
          <v-icon class="mr-1">mdi-upload</v-icon>Yuklash
        </v-btn>
        <v-btn
          v-if="item.status === 'uploaded'"
          size="small"
          color="success"
          variant="tonal"
          :loading="sending === item.id"
          @click="sendCard(item)"
        >
          <v-icon class="mr-1">mdi-email-send</v-icon>Yuborish
        </v-btn>
        <span v-if="item.status === 'sent'" class="text-success text-body-2">✓ Yuborildi</span>
      </template>
    </v-data-table>

    <!-- Upload dialog -->
    <v-dialog v-model="uploadDialog" max-width="400">
      <v-card rounded="xl" class="pa-6">
        <v-card-title class="pa-0 mb-4">Fayl yuklash</v-card-title>
        <v-file-input
          v-model="uploadFile"
          label="PDF, JPG, PNG (max 10MB)"
          accept=".pdf,.jpg,.jpeg,.png"
          prepend-icon="mdi-paperclip"
          show-size
        />
        <div class="d-flex justify-end gap-2 mt-4">
          <v-btn @click="uploadDialog = false">Bekor</v-btn>
          <v-btn color="accent" @click="upload" :loading="uploading" :disabled="!uploadFile?.length">Yuklash</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
const items = ref([])
const loading = ref(false)
const uploadDialog = ref(false)
const uploadFile = ref([])
const uploading = ref(false)
const sending = ref(null)
const selectedReg = ref(null)
const statusColors = { requested:'warning', uploaded:'info', sent:'success' }
function statusColor(s) { return statusColors[s] || 'default' }
const headers = [
  { title: 'Mehmon', key: 'guest' },
  { title: 'Mehmonxona', key: 'guestHouse.name' },
  { title: 'Izoh', key: 'notes' },
  { title: 'Holat', key: 'status', width: 120 },
  { title: 'Amallar', key: 'actions', sortable: false, width: 220 },
]
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/registrations'); items.value = data.data || data } finally { loading.value = false }
}
function openUpload(item) { selectedReg.value = item; uploadFile.value = []; uploadDialog.value = true }
async function upload() {
  uploading.value = true
  const fd = new FormData()
  fd.append('file', uploadFile.value[0])
  try {
    await api.post(`/registrations/${selectedReg.value.id}/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    uploadDialog.value = false; await load()
  } finally { uploading.value = false }
}
async function sendCard(item) {
  sending.value = item.id
  try { await api.post(`/registrations/${item.id}/send`); await load() } finally { sending.value = null }
}
</script>
