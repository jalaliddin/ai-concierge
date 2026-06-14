<template>
  <div>
    <div class="d-flex align-center mb-6">
      <h1 class="text-h5 font-weight-bold">Mehmon Uylari</h1>
      <v-spacer />
      <v-btn color="accent" prepend-icon="mdi-plus" rounded="lg" @click="openDialog()">
        Yangi
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      rounded="lg"
      elevation="1"
    >
      <template #item.is_active="{ item }">
        <v-chip :color="item.is_active ? 'success' : 'error'" size="small">
          {{ item.is_active ? 'Faol' : 'Nofaol' }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" variant="text" @click="downloadQr(item)">
          <v-icon>mdi-qrcode</v-icon>
        </v-btn>
        <v-btn icon size="small" variant="text" color="primary" @click="openDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="600" scrollable>
      <v-card rounded="xl">
        <v-card-title class="pa-6 pb-0">
          {{ editItem ? 'Tahrirlash' : 'Yangi mehmon uyi' }}
        </v-card-title>
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="12"><v-text-field v-model="form.name" label="Nomi *" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.address" label="Manzil *" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.phone" label="Telefon" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.primary_color" label="Asosiy rang" type="color" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.wifi_name" label="Wi-Fi nomi" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.wifi_password" label="Wi-Fi paroli" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.check_in_time" label="Check-in" placeholder="14:00" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.check_out_time" label="Check-out" placeholder="12:00" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.telegram_chat_id" label="Telegram Chat ID" /></v-col>
            <v-col cols="12"><v-textarea v-model="form.description" label="Tavsif" rows="3" /></v-col>
            <v-col cols="12">
              <v-switch v-model="form.is_active" label="Faol" color="success" inset />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn @click="dialog = false">Bekor qilish</v-btn>
          <v-btn color="accent" @click="save" :loading="saving">Saqlash</v-btn>
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
const dialog = ref(false)
const saving = ref(false)
const editItem = ref(null)

const defaultForm = {
  name: '', address: '', phone: '', description: '',
  wifi_name: '', wifi_password: '', check_in_time: '', check_out_time: '',
  primary_color: '#0D1B2A', telegram_chat_id: '', is_active: true,
}
const form = ref({ ...defaultForm })

const headers = [
  { title: 'Nomi', key: 'name', sortable: true },
  { title: 'Manzil', key: 'address' },
  { title: 'Telefon', key: 'phone' },
  { title: 'Holat', key: 'is_active', width: 100 },
  { title: 'Amallar', key: 'actions', sortable: false, width: 120 },
]

onMounted(load)

async function load() {
  loading.value = true
  try { const { data } = await api.get('/guest-houses'); items.value = data } finally { loading.value = false }
}

function openDialog(item = null) {
  editItem.value = item
  form.value = item ? { ...item } : { ...defaultForm }
  dialog.value = true
}

async function save() {
  saving.value = true
  try {
    if (editItem.value) {
      await api.put(`/guest-houses/${editItem.value.id}`, form.value)
    } else {
      await api.post('/guest-houses', form.value)
    }
    dialog.value = false
    await load()
  } finally { saving.value = false }
}

async function downloadQr(item) {
  const response = await api.get(`/guest-houses/${item.id}/qr`, { responseType: 'blob' })
  const url = URL.createObjectURL(response.data)
  const a = document.createElement('a')
  a.href = url
  a.download = `qr-${item.slug || item.id}.png`
  a.click()
  URL.revokeObjectURL(url)
}
</script>
