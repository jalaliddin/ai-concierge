<template>
  <div>
    <div class="d-flex align-center mb-6">
      <h1 class="text-h5 font-weight-bold">Xizmatlar / Day Trips</h1>
      <v-spacer />
      <v-btn color="accent" prepend-icon="mdi-plus" rounded="lg" @click="openDialog()">Yangi</v-btn>
    </div>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.price="{ item }">{{ item.price }} {{ item.currency }}</template>
      <template #item.category="{ item }">
        <v-chip size="small" :color="categoryColor(item.category)">{{ item.category }}</v-chip>
      </template>
      <template #item.is_active="{ item }">
        <v-chip :color="item.is_active ? 'success' : 'error'" size="small">{{ item.is_active ? 'Faol' : 'Nofaol' }}</v-chip>
      </template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" variant="text" color="primary" @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" variant="text" color="error" @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="700" scrollable>
      <v-card rounded="xl">
        <v-card-title class="pa-6 pb-0">{{ editItem ? 'Tahrirlash' : 'Yangi xizmat' }}</v-card-title>
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="6">
              <v-select v-model="form.category" label="Kategoriya" :items="['tour','guide','excursion','activity','other']" />
            </v-col>
            <v-col cols="6"><v-text-field v-model="form.name" label="Nomi *" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.price" label="Narx (USD)" type="number" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.duration_text" label="Davomiyligi" placeholder="Full day (8h)" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.short_description" label="Qisqa tavsif" /></v-col>
            <v-col cols="12"><v-textarea v-model="form.description" label="To'liq tavsif *" rows="4" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.slug" label="Slug" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.meta_title" label="Meta title" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.meta_description" label="Meta description" /></v-col>
            <v-col cols="4"><v-text-field v-model="form.sort_order" label="Tartib" type="number" /></v-col>
            <v-col cols="4"><v-switch v-model="form.show_on_landing" label="Landingda" color="success" inset /></v-col>
            <v-col cols="4"><v-switch v-model="form.is_active" label="Faol" color="success" inset /></v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer /><v-btn @click="dialog = false">Bekor</v-btn>
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
const defaultForm = { category:'tour', name:'', price:0, currency:'USD', duration_text:'', short_description:'', description:'', slug:'', meta_title:'', meta_description:'', sort_order:0, show_on_landing:true, is_active:true }
const form = ref({...defaultForm})
const headers = [
  { title: 'Kategoriya', key: 'category', width: 120 },
  { title: 'Nomi', key: 'name' },
  { title: 'Narx', key: 'price', width: 120 },
  { title: 'Davomiylik', key: 'duration_text' },
  { title: 'Holat', key: 'is_active', width: 100 },
  { title: 'Amallar', key: 'actions', sortable: false, width: 100 },
]
const categoryColors = { tour:'primary', guide:'success', excursion:'accent', activity:'warning', other:'default' }
function categoryColor(c) { return categoryColors[c] || 'default' }
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/services'); items.value = data } finally { loading.value = false }
}
function openDialog(item=null) { editItem.value = item; form.value = item ? {...item} : {...defaultForm}; dialog.value = true }
async function save() {
  saving.value = true
  try {
    if (editItem.value) await api.put(`/services/${editItem.value.id}`, form.value)
    else await api.post('/services', form.value)
    dialog.value = false; await load()
  } finally { saving.value = false }
}
async function remove(item) { if (!confirm('O\'chirishni tasdiqlaysizmi?')) return; await api.delete(`/services/${item.id}`); await load() }
</script>
