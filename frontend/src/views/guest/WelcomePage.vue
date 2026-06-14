<template>
  <v-app :theme="'light'" :style="{ '--accent': house?.primary_color || '#0D1B2A' }">
    <v-main style="background: #F8FAFC; min-height: 100vh">
      <div class="welcome-wrapper">
        <!-- Loading -->
        <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 100vh">
          <v-progress-circular indeterminate color="primary" size="64" />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="d-flex flex-column justify-center align-center pa-6" style="min-height: 100vh">
          <v-icon size="64" color="error">mdi-alert-circle-outline</v-icon>
          <h2 class="mt-4">QR kod noto'g'ri</h2>
          <p class="text-secondary">Mehmon uyining QR kodini yana skaner qiling.</p>
        </div>

        <!-- Welcome form -->
        <template v-else>
          <!-- Header banner -->
          <div :style="{ background: house.primary_color }" class="welcome-header pa-6 pb-10">
            <div class="d-flex align-center mb-2">
              <v-icon color="white" size="28" class="mr-2">mdi-home-heart</v-icon>
              <span class="text-white font-weight-bold text-h6">{{ house.name }}</span>
            </div>
            <p class="text-white text-opacity-80 text-body-2 ma-0">
              {{ house.description || 'Xush kelibsiz!' }}
            </p>
          </div>

          <!-- Form card -->
          <div class="pa-4" style="margin-top: -24px">
            <v-card rounded="xl" elevation="3" class="pa-6">
              <div class="text-center mb-6">
                <v-avatar :color="house.primary_color" size="56" class="mb-3">
                  <v-icon color="white" size="28">mdi-robot-excited</v-icon>
                </v-avatar>
                <h2 class="text-h6 font-weight-bold">AI Konsyerj</h2>
                <p class="text-body-2 text-medium-emphasis mt-1">
                  Savol bering, transfer bron qiling, xizmatlardan foydalaning
                </p>
              </div>

              <v-form @submit.prevent="startChat" v-model="formValid">
                <v-text-field
                  v-model="form.name"
                  label="Ismingiz *"
                  prepend-inner-icon="mdi-account"
                  :rules="[v => !!v || 'Ism kiritish shart']"
                  class="mb-3"
                />
                <v-text-field
                  v-model="form.email"
                  label="Email *"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  :rules="[v => !!v || 'Email kiritish shart', v => /.+@.+\..+/.test(v) || 'Email noto\'g\'ri']"
                  class="mb-3"
                />
                <v-text-field
                  v-model="form.phone"
                  label="Telefon (ixtiyoriy)"
                  prepend-inner-icon="mdi-phone"
                  class="mb-3"
                />
                <v-text-field
                  v-model="form.room_number"
                  label="Xona raqami (ixtiyoriy)"
                  prepend-inner-icon="mdi-door"
                  class="mb-4"
                />

                <!-- Language -->
                <v-btn-toggle v-model="form.language" mandatory density="compact" class="mb-6 d-flex justify-center" rounded="lg">
                  <v-btn value="uz" small>🇺🇿 O'zbek</v-btn>
                  <v-btn value="ru" small>🇷🇺 Русский</v-btn>
                  <v-btn value="en" small>🇬🇧 English</v-btn>
                </v-btn-toggle>

                <v-btn
                  type="submit"
                  :loading="submitting"
                  :disabled="!formValid"
                  :color="house.primary_color"
                  size="large"
                  block
                  rounded="lg"
                  elevation="2"
                >
                  <v-icon left class="mr-2">mdi-chat-processing</v-icon>
                  Muloqotni boshlash
                </v-btn>
              </v-form>
            </v-card>

            <!-- Quick info -->
            <v-card class="mt-4 pa-4" rounded="lg" variant="tonal" color="teal">
              <div class="d-flex flex-wrap gap-3 justify-center">
                <v-chip v-if="house.wifi_name" size="small" prepend-icon="mdi-wifi">
                  {{ house.wifi_name }}
                </v-chip>
                <v-chip v-if="house.check_in_time" size="small" prepend-icon="mdi-clock-in">
                  In: {{ house.check_in_time }}
                </v-chip>
                <v-chip v-if="house.check_out_time" size="small" prepend-icon="mdi-clock-out">
                  Out: {{ house.check_out_time }}
                </v-chip>
              </div>
            </v-card>
          </div>
        </template>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api/axios'
import { useGuestStore } from '@/stores/guest'

const route = useRoute()
const router = useRouter()
const guestStore = useGuestStore()

const house = ref(null)
const loading = ref(true)
const error = ref(false)
const formValid = ref(false)
const submitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  room_number: '',
  language: 'uz',
})

onMounted(async () => {
  // If already have session, go to chat
  if (guestStore.conversationId) {
    router.replace('/chat')
    return
  }
  try {
    const { data } = await api.get(`/public/resolve/${route.params.token}`)
    house.value = data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})

async function startChat() {
  if (!formValid.value) return
  submitting.value = true
  try {
    const { data } = await api.post('/public/start', {
      token: route.params.token,
      ...form.value,
    })
    guestStore.setSession(data)
    router.push('/chat')
  } catch (err) {
    console.error(err)
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.welcome-wrapper { max-width: 480px; margin: 0 auto; }
.welcome-header { min-height: 120px; border-radius: 0 0 24px 24px; }
.text-opacity-80 { opacity: 0.8; }
</style>
