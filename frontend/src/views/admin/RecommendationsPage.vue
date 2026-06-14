<template>
  <div>
    <div class="d-flex align-center mb-6">
      <h1 class="text-h5 font-weight-bold">Tavsiyalar</h1>
      <v-spacer />
      <v-btn color="accent" prepend-icon="mdi-plus" rounded="lg" @click="openDialog()">Yangi</v-btn>
    </div>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.category="{ item }"><v-chip size="small" variant="tonal">{{ item.category }}</v-chip></template>
      <template #item.is_active="{ item }"><v-chip :color="item.is_active ? 'success' : 'error'" size="small">{{ item.is_active ? 'Faol' : 'Nofaol' }}</v-chip></template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" variant="text" color="primary" @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" variant="text" color="error" @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="600">
      <v-card rounded="xl" class="pa-6">
        <v-card-title class="pa-0 mb-4">{{ editItem ? 'Tahrirlash' : 'Yangi tavsiya' }}</v-card-title>
        <v-select v-model="form.guest_house_id" label="Mehmon uyi *" :items="houses" item-title="name" item-value="id" class="mb-3" />
        <v-select v-model="form.category" label="Kategoriya" :items="['restaurant','cafe','attraction','shopping','pharmacy','other']" class="mb-3" />
        <v-text-field v-model="form.name" label="Nomi *" class="mb-3" />
        <v-textarea v-model="form.description" label="Tavsif *" rows="3" class="mb-3" />
        <v-text-field v-model="form.address" label="Manzil" class="mb-3" />
        <v-text-field v-model="form.distance_text" label="Masofa" placeholder="200m" class="mb-3" />
        <v-switch v-model="form.is_active" label="Faol" color="success" inset class="mb-4" />
        <div class="d-flex justify-end gap-2">
          <v-btn @click="dialog = false">Bekor</v-btn>
          <v-btn color="accent" @click="save" :loading="saving">Saqlash</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios'
const items = ref([])
const houses = ref([])
const loading = ref(false)
const dialog = ref(false)
const saving = ref(false)
const editItem = ref(null)
const defaultForm = { guest_house_id: null, category: 'restaurant', name: '', description: '', address: '', distance_text: '', is_active: true }
const form = ref({...defaultForm})
const headers = [
  { title: 'Kategoriya', key: 'category', width: 130 },
  { title: 'Nomi', key: 'name' },
  { title: 'Masofa', key: 'distance_text', width: 100 },
  { title: 'Holat', key: 'is_active', width: 100 },
  { title: 'Amallar', key: 'actions', sortable: false, width: 100 },
]
onMounted(async () => { load(); const {data} = await api.get('/guest-houses'); houses.value = data })
async function load() {
  loading.value = true
  try { const {data} = await api.get('/recommendations'); items.value = data } finally { loading.value = false }
}
function openDialog(item=null) { editItem.value = item; form.value = item ? {...item} : {...defaultForm}; dialog.value = true }
async function save() {
  saving.value = true
  try {
    if (editItem.value) await api.put(`/recommendations/${editItem.value.id}`, form.value)
    else await api.post('/recommendations', form.value)
    dialog.value = false; await load()
  } finally { saving.value = false }
}
async function remove(item) { if (!confirm('O\'chirishni tasdiqlaysizmi?')) return; await api.delete(`/recommendations/${item.id}`); await load() }
</script>
