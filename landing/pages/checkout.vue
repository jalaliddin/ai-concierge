<template>
  <div>
    <Head>
      <Title>{{ t('checkout.title') }} | Khiva Tour Guide</Title>
    </Head>

    <div class="page-hero">
      <v-container class="py-10">
        <h1 class="text-h3 font-weight-black text-white">{{ t('checkout.title') }}</h1>
      </v-container>
    </div>

    <v-container class="py-12">
      <!-- Empty cart -->
      <div v-if="cartStore.items.length === 0 && !orderResult" class="text-center py-20">
        <v-icon size="80" color="grey-lighten-2">mdi-cart-off</v-icon>
        <p class="text-h6 text-medium-emphasis mt-4">{{ t('cart.empty') }}</p>
        <v-btn :to="localePath('/transfers')" color="primary" class="mt-4" rounded="lg">
          {{ t('transfers.title') }}
        </v-btn>
      </div>

      <!-- Order success -->
      <div v-else-if="orderResult" class="text-center py-16">
        <v-icon size="80" color="success" class="mb-4">mdi-check-circle</v-icon>
        <h2 class="text-h4 font-weight-bold mb-2">{{ t('checkout.success') }}</h2>
        <p class="text-medium-emphasis mb-6">{{ t('checkout.success_msg') }}</p>
        <v-chip color="primary" size="large" class="mb-6">
          {{ t('checkout.order_number') }}: {{ orderResult.order_number }}
        </v-chip>
        <br />
        <v-btn :to="localePath('/')" color="cta" size="large" rounded="lg" class="mt-4">
          Bosh sahifaga qaytish
        </v-btn>
      </div>

      <!-- Checkout form -->
      <v-row v-else>
        <v-col cols="12" md="8">
          <v-card rounded="xl" class="mb-6">
            <v-card-title class="pa-6 pb-0 text-h6 font-weight-bold">Ma'lumotlaringiz</v-card-title>
            <v-card-text class="pa-6">
              <v-form ref="formRef" v-model="formValid" @submit.prevent="submitOrder">
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.customer_name"
                      :label="t('checkout.name')"
                      :rules="[required]"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.customer_email"
                      :label="t('checkout.email')"
                      :rules="[required, emailRule]"
                      type="email"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.customer_phone"
                      :label="t('checkout.phone')"
                      :rules="[required]"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model.number="form.passengers"
                      :label="t('checkout.passengers')"
                      type="number"
                      min="1"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.scheduled_at"
                      :label="t('checkout.date')"
                      type="datetime-local"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.notes"
                      :label="t('checkout.notes')"
                      variant="outlined"
                      rounded="lg"
                      density="compact"
                      rows="3"
                      auto-grow
                    />
                  </v-col>
                </v-row>

                <!-- Honeypot (hidden from real users) -->
                <div style="position:absolute;left:-9999px;opacity:0;pointer-events:none" aria-hidden="true">
                  <input v-model="honeypot" tabindex="-1" autocomplete="off" />
                </div>

                <v-alert v-if="submitError" type="error" class="mb-4" rounded="lg">{{ submitError }}</v-alert>

                <v-btn
                  type="submit"
                  color="cta"
                  size="large"
                  block
                  rounded="lg"
                  :loading="submitting"
                  :disabled="!formValid"
                >
                  {{ t('checkout.submit') }}
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card rounded="xl" class="sticky-card">
            <v-card-title class="pa-5 pb-0 text-body-1 font-weight-bold">{{ t('cart.title') }}</v-card-title>
            <v-card-text class="pa-5">
              <div
                v-for="item in cartStore.items"
                :key="`${item.type}-${item.id}`"
                class="d-flex justify-space-between align-center py-2 border-b"
              >
                <div>
                  <div class="text-body-2 font-weight-medium">{{ item.name }}</div>
                  <div class="text-caption text-medium-emphasis">× {{ item.quantity }}</div>
                </div>
                <span class="text-body-2 font-weight-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>

              <v-divider class="my-3" />
              <div class="d-flex justify-space-between text-h6 font-weight-bold">
                <span>{{ t('cart.total') }}</span>
                <span>${{ cartStore.total.toFixed(2) }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const cartStore = useCartStore()
const api = useApi()

const formRef = ref()
const formValid = ref(false)
const submitting = ref(false)
const submitError = ref('')
const orderResult = ref<any>(null)
const honeypot = ref('')

const form = reactive({
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  passengers: 1,
  scheduled_at: '',
  notes: '',
})

const required = (v: string) => !!v || 'Majburiy maydon'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'To\'g\'ri email kiriting'

async function submitOrder() {
  if (honeypot.value) return
  if (!formValid.value) return

  submitting.value = true
  submitError.value = ''
  try {
    const payload = {
      ...form,
      items: cartStore.items.map(i => ({
        itemable_type: i.type === 'transfer' ? 'App\\Models\\Transfer' : 'App\\Models\\Service',
        itemable_id: i.id,
        quantity: i.quantity,
      })),
    }
    orderResult.value = await api.placeOrder(payload)
    cartStore.clearCart()
  } catch (err: any) {
    submitError.value = err?.data?.message || 'Xato yuz berdi. Qayta urinib ko\'ring.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #0D1B2A, #1a3a5c); }
.sticky-card { position: sticky; top: 80px; }
.border-b { border-bottom: 1px solid rgba(0,0,0,0.08); }
</style>
