<template>
  <div v-if="transfer">
    <Head>
      <Title>{{ transfer.meta_title || transfer.name }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="transfer.meta_description || transfer.description" />
      <Meta property="og:title" :content="transfer.meta_title || transfer.name" />
      <Meta property="og:description" :content="transfer.meta_description || transfer.description" />
      <Meta property="og:type" content="product" />
    </Head>

    <!-- JSON-LD Product+Offer -->
    <script type="application/ld+json" v-html="JSON.stringify(productSchema)" />
    <script type="application/ld+json" v-html="JSON.stringify(breadcrumbSchema)" />

    <div class="page-hero">
      <v-container class="py-10">
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-4">
          <template #divider><v-icon size="16" color="rgba(255,255,255,0.5)">mdi-chevron-right</v-icon></template>
          <template #title="{ item }">
            <NuxtLink :to="item.href" class="text-white text-decoration-none" style="opacity:0.8">{{ item.title }}</NuxtLink>
          </template>
        </v-breadcrumbs>
        <v-chip color="accent" size="small" class="mb-3">Transfer</v-chip>
        <h1 class="text-h3 font-weight-black text-white mb-2">{{ transfer.name }}</h1>
        <div class="d-flex gap-4 flex-wrap">
          <span class="text-white" style="opacity:0.8"><v-icon size="18">mdi-map-marker-right</v-icon> {{ transfer.from_location }} → {{ transfer.to_location }}</span>
          <span class="text-white" style="opacity:0.8"><v-icon size="18">mdi-account-group</v-icon> {{ transfer.capacity }} {{ t('transfers.passengers') }}</span>
          <span v-if="transfer.duration_hours" class="text-white" style="opacity:0.8">
            <v-icon size="18">mdi-clock</v-icon> {{ transfer.duration_hours }}h
          </span>
        </div>
      </v-container>
    </div>

    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="8">
          <v-card rounded="xl" class="mb-6">
            <v-card-text class="pa-6">
              <h2 class="text-h6 font-weight-bold mb-3">Tavsif</h2>
              <p class="text-body-1" style="line-height:1.8">{{ transfer.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card rounded="xl" class="sticky-card">
            <v-card-text class="pa-6">
              <div class="text-h4 font-weight-black text-primary mb-1">${{ transfer.price_usd }}</div>
              <div class="text-caption text-medium-emphasis mb-4">{{ t('transfers.capacity') }}</div>

              <!-- Booking form -->
              <v-text-field
                v-model="form.pickup_location"
                label="Kutib olinish joyi"
                variant="outlined"
                rounded="lg"
                density="compact"
                class="mb-3"
                prepend-inner-icon="mdi-map-marker"
              />
              <v-text-field
                v-model="form.scheduled_at"
                label="Sana va vaqt"
                type="datetime-local"
                variant="outlined"
                rounded="lg"
                density="compact"
                class="mb-3"
                prepend-inner-icon="mdi-calendar"
              />
              <v-text-field
                v-model.number="form.quantity"
                label="Yo'lovchilar soni"
                type="number"
                min="1"
                :max="transfer.capacity"
                variant="outlined"
                rounded="lg"
                density="compact"
                class="mb-4"
                prepend-inner-icon="mdi-account-group"
              />

              <v-btn color="cta" block size="large" rounded="lg" @click="addToCart">
                {{ t('cart.add') }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snack" color="success" timeout="2000" location="bottom right" rounded="lg">
      {{ t('cart.added') }}
    </v-snackbar>
  </div>

  <div v-else-if="pending" class="d-flex justify-center align-center" style="min-height:50vh">
    <v-progress-circular indeterminate color="primary" />
  </div>

  <div v-else class="text-center py-20">
    <v-icon size="64" color="grey">mdi-alert-circle</v-icon>
    <p class="text-h6 mt-4">Transfer topilmadi</p>
    <v-btn :to="localePath('/transfers')" color="primary" class="mt-4">← Orqaga</v-btn>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()
const api = useApi()
const cartStore = useCartStore()

const { data, pending } = await api.fetchTransfer(route.params.slug as string)
const transfer = computed(() => (data.value as any)?.data || data.value)

const snack = ref(false)
const form = reactive({ pickup_location: '', scheduled_at: '', quantity: 1 })

function addToCart() {
  if (!transfer.value) return
  cartStore.addItem({
    id: transfer.value.id,
    type: 'transfer',
    name: transfer.value.name,
    price: parseFloat(transfer.value.price_usd),
    currency: 'USD',
    quantity: form.quantity,
    slug: transfer.value.slug,
    pickup_location: form.pickup_location,
    scheduled_at: form.scheduled_at,
  })
  snack.value = true
}

const breadcrumbs = computed(() => [
  { title: 'Home', href: localePath('/') },
  { title: t('transfers.title'), href: localePath('/transfers') },
  { title: transfer.value?.name || '', href: '' },
])

const productSchema = computed(() => transfer.value ? {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: transfer.value.name,
  description: transfer.value.description,
  offers: {
    '@type': 'Offer',
    price: transfer.value.price_usd,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${config.public.siteUrl}${localePath(`/transfers/${transfer.value.slug}`)}`,
  },
} : {})

const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.public.siteUrl}${localePath('/')}` },
    { '@type': 'ListItem', position: 2, name: t('transfers.title'), item: `${config.public.siteUrl}${localePath('/transfers')}` },
    { '@type': 'ListItem', position: 3, name: transfer.value?.name || '' },
  ],
}))
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #0D1B2A, #1a3a5c); }
.sticky-card { position: sticky; top: 80px; }
</style>
