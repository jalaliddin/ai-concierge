<template>
  <v-app>
    <v-main style="background: #0D1B2A; min-height: 100vh" class="d-flex align-center justify-center">
      <v-card class="login-card pa-8" rounded="xl" elevation="10">
        <div class="text-center mb-8">
          <v-icon size="48" color="accent" class="mb-3">mdi-compass-rose</v-icon>
          <h1 class="text-h5 font-weight-bold">Khiva Tour Guide</h1>
          <p class="text-body-2 text-medium-emphasis mt-1">Admin Panel</p>
        </div>

        <v-form @submit.prevent="login" v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email"
            :rules="[v => !!v || 'Email kiritish shart']"
            class="mb-3"
          />
          <v-text-field
            v-model="password"
            label="Parol"
            :type="showPass ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPass = !showPass"
            :rules="[v => !!v || 'Parol kiritish shart']"
            class="mb-6"
          />
          <v-btn
            type="submit"
            :loading="loading"
            :disabled="!valid"
            color="accent"
            size="large"
            block
            rounded="lg"
          >
            Kirish
          </v-btn>
          <p v-if="error" class="text-error text-center text-body-2 mt-4">{{ error }}</p>
        </v-form>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const valid = ref(false)
const loading = ref(false)
const error = ref('')
const showPass = ref(false)

async function login() {
  if (!valid.value) return
  loading.value = true
  error.value = ''
  try {
    await authStore.login(email.value, password.value)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.response?.data?.message || 'Kirish xatosi. Qayta urinib ko\'ring.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-card { width: 100%; max-width: 420px; }
</style>
