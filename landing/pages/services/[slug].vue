<template>
  <div v-if="service">
    <Head>
      <Title>{{ service.meta_title || service.name }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="service.meta_description || service.description" />
      <Meta property="og:title" :content="service.meta_title || service.name" />
      <Meta property="og:description" :content="service.meta_description || service.description" />
      <Meta property="og:type" content="product" />
    </Head>

    <script type="application/ld+json" v-html="JSON.stringify(touristTripSchema)" />
    <script type="application/ld+json" v-html="JSON.stringify(breadcrumbSchema)" />

    <div class="page-hero">
      <v-container class="py-10">
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-4">
          <template #divider><v-icon size="16" color="rgba(255,255,255,0.5)">mdi-chevron-right</v-icon></template>
          <template #title="{ item }">
            <NuxtLink :to="item.href" class="text-white text-decoration-none" style="opacity:0.8">{{ item.title }}</NuxtLink>
          </template>
        </v-breadcrumbs>
        <v-chip color="accent" size="small" class="mb-3">{{ service.category }}</v-chip>
        <h1 class="text-h3 font-weight-black text-white mb-2">{{ service.name }}</h1>
      </v-container>
    </div>

    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="8">
          <v-card rounded="xl" class="mb-6">
            <v-card-text class="pa-6">
              <h2 class="text-h6 font-weight-bold mb-3">Tavsif</h2>
              <p class="text-body-1" style="line-height:1.8">{{ service.description }}</p>

              <!-- Gallery -->
              <div v-if="gallery.length" class="mt-6">
                <h3 class="text-body-1 font-weight-bold mb-3">Galereya</h3>
                <v-row dense>
                  <v-col v-for="(img, i) in gallery" :key="i" cols="6" md="4">
                    <v-img :src="img" rounded="lg" aspect-ratio="1" cover class="bg-grey-lighten-3" />
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card rounded="xl" class="sticky-card">
            <v-card-text class="pa-6">
              <div class="text-h4 font-weight-black text-primary mb-1">${{ service.price_usd }}</div>
              <div class="text-caption text-medium-emphasis mb-4">{{ t('transfers.capacity') }}</div>

              <v-text-field
                v-model.number="quantity"
                label="Miqdor"
                type="number"
                min="1"
                variant="outlined"
                rounded="lg"
                density="compact"
                class="mb-4"
                prepend-inner-icon="mdi-counter"
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
    <p class="text-h6 mt-4">Xizmat topilmadi</p>
    <v-btn :to="localePath('/services')" color="primary" class="mt-4">← Orqaga</v-btn>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()
const api = useApi()
const cartStore = useCartStore()

const { data, pending } = await api.fetchService(route.params.slug as string)
const service = computed(() => (data.value as any)?.data || data.value)

const gallery = computed(() => {
  const g = service.value?.gallery
  if (!g) return []
  if (Array.isArray(g)) return g
  try { return JSON.parse(g) } catch { return [] }
})

const snack = ref(false)
const quantity = ref(1)

function addToCart() {
  if (!service.value) return
  cartStore.addItem({
    id: service.value.id,
    type: 'service',
    name: service.value.name,
    price: parseFloat(service.value.price_usd),
    currency: 'USD',
    quantity: quantity.value,
    slug: service.value.slug,
  })
  snack.value = true
}

const breadcrumbs = computed(() => [
  { title: 'Home', href: localePath('/') },
  { title: t('services.title'), href: localePath('/services') },
  { title: service.value?.name || '', href: '' },
])

const touristTripSchema = computed(() => service.value ? {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: service.value.name,
  description: service.value.description,
  offers: {
    '@type': 'Offer',
    price: service.value.price_usd,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  touristType: service.value.category,
} : {})

const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.public.siteUrl}${localePath('/')}` },
    { '@type': 'ListItem', position: 2, name: t('services.title'), item: `${config.public.siteUrl}${localePath('/services')}` },
    { '@type': 'ListItem', position: 3, name: service.value?.name || '' },
  ],
}))
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #14B8A6, #0D9488); }
.sticky-card { position: sticky; top: 80px; }
</style>
