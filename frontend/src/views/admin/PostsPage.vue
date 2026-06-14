<template>
  <div>
    <div class="d-flex align-center mb-6">
      <h1 class="text-h5 font-weight-bold">Blog Maqolalar</h1>
      <v-spacer />
      <v-btn color="accent" prepend-icon="mdi-plus" rounded="lg" @click="openDialog()">Yangi</v-btn>
    </div>
    <v-data-table :headers="headers" :items="items" :loading="loading" rounded="lg" elevation="1">
      <template #item.language="{ item }"><v-chip size="small">{{ item.language }}</v-chip></template>
      <template #item.is_published="{ item }">
        <v-chip :color="item.is_published ? 'success' : 'warning'" size="small">{{ item.is_published ? 'Chop etilgan' : 'Qoralama' }}</v-chip>
      </template>
      <template #item.published_at="{ item }">{{ item.published_at ? new Date(item.published_at).toLocaleDateString('uz') : '—' }}</template>
      <template #item.actions="{ item }">
        <v-btn icon size="small" variant="text" color="primary" @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon size="small" variant="text" color="error" @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="800" scrollable>
      <v-card rounded="xl">
        <v-card-title class="pa-6 pb-0">{{ editItem ? 'Tahrirlash' : 'Yangi maqola' }}</v-card-title>
        <v-card-text class="pa-6">
          <v-row>
            <v-col cols="8"><v-text-field v-model="form.title" label="Sarlavha *" /></v-col>
            <v-col cols="4"><v-select v-model="form.language" label="Til" :items="['uz','ru','en']" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.slug" label="Slug" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.excerpt" label="Qisqa mazmun" /></v-col>
            <v-col cols="12"><v-textarea v-model="form.body" label="Mazmun (Markdown) *" rows="10" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.meta_title" label="Meta title" /></v-col>
            <v-col cols="12"><v-text-field v-model="form.meta_description" label="Meta description" /></v-col>
            <v-col cols="6"><v-text-field v-model="form.published_at" label="Nashr sanasi" type="datetime-local" /></v-col>
            <v-col cols="6"><v-switch v-model="form.is_published" label="Chop etish" color="success" inset /></v-col>
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
const defaultForm = { title:'', slug:'', excerpt:'', body:'', meta_title:'', meta_description:'', language:'en', published_at:'', is_published:false }
const form = ref({...defaultForm})
const headers = [
  { title: 'Sarlavha', key: 'title' },
  { title: 'Til', key: 'language', width: 80 },
  { title: 'Holat', key: 'is_published', width: 130 },
  { title: 'Nashr sanasi', key: 'published_at', width: 130 },
  { title: 'Amallar', key: 'actions', sortable: false, width: 100 },
]
onMounted(load)
async function load() {
  loading.value = true
  try { const {data} = await api.get('/posts'); items.value = data } finally { loading.value = false }
}
function openDialog(item=null) { editItem.value = item; form.value = item ? {...item} : {...defaultForm}; dialog.value = true }
async function save() {
  saving.value = true
  try {
    if (editItem.value) await api.put(`/posts/${editItem.value.id}`, form.value)
    else await api.post('/posts', form.value)
    dialog.value = false; await load()
  } finally { saving.value = false }
}
async function remove(item) { if (!confirm('O\'chirishni tasdiqlaysizmi?')) return; await api.delete(`/posts/${item.id}`); await load() }
</script>
