<template>
  <div>
    <Head>
      <Title>{{ t('services.title') }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="t('services.subtitle')" />
    </Head>
    <script type="application/ld+json" v-html="JSON.stringify(breadcrumbSchema)" />

    <div class="page-hero">
      <v-container class="py-12">
        <h1 class="text-h3 font-weight-black text-white mb-2">{{ t('services.title') }}</h1>
        <p class="text-white" style="opacity:0.8">{{ t('services.subtitle') }}</p>
      </v-container>
    </div>

    <v-container class="py-12">
      <!-- Category filter -->
      <div class="d-flex gap-2 flex-wrap mb-8">
        <v-chip
          v-for="cat in categories"
          :key="cat.value"
          :color="activeCategory === cat.value ? 'primary' : 'default'"
          :variant="activeCategory === cat.value ? 'flat' : 'outlined'"
          @click="activeCategory = cat.value"
          class="cursor-pointer"
        >
          {{ cat.label }}
        </v-chip>
      </div>

      <v-row v-if="pending">
        <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="4">
          <v-skeleton-loader type="card" rounded="xl" />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="service in filteredServices"
          :key="service.id"
          cols="12" sm="6" md="4"
        >
          <v-card rounded="xl" class="h-100" hover :to="localePath(`/services/${service.slug}`)">
            <div class="card-img d-flex align-center justify-center">
              <v-icon size="56" color="white" style="opacity:0.7">mdi-map-marker-star</v-icon>
            </div>
            <v-card-text class="pa-4">
              <v-chip size="x-small" color="accent" variant="flat" class="mb-2">{{ service.category }}</v-chip>
              <h2 class="text-body-1 font-weight-bold text-primary mb-2 text-wrap">{{ service.name }}</h2>
              <p class="text-caption text-medium-emphasis mb-3" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
                {{ service.description }}
              </p>
              <div class="d-flex align-center justify-space-between">
                <span class="text-h6 font-weight-black text-primary">${{ service.price_usd }}</span>
                <v-btn color="cta" size="small" rounded="lg" @click.prevent="addToCart(service)">
                  {{ t('cart.add') }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="snack" color="success" timeout="2000" location="bottom right" rounded="lg">
      {{ t('cart.added') }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const api = useApi()
const cartStore = useCartStore()

const { data, pending } = await api.fetchServices()
const services = computed(() => (data.value as any)?.data || data.value || [])

const activeCategory = ref('')
const snack = ref(false)

const categories = computed(() => {
  const cats = new Set<string>()
  services.value.forEach((s: any) => { if (s.category) cats.add(s.category) })
  return [
    { value: '', label: t('services.all') },
    ...[...cats].map(c => ({ value: c, label: c })),
  ]
})

const filteredServices = computed(() =>
  activeCategory.value
    ? services.value.filter((s: any) => s.category === activeCategory.value)
    : services.value
)

function addToCart(service: any) {
  cartStore.addItem({
    id: service.id,
    type: 'service',
    name: service.name,
    price: parseFloat(service.price_usd),
    currency: 'USD',
    quantity: 1,
    slug: service.slug,
  })
  snack.value = true
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${config.public.siteUrl}${localePath('/')}` },
    { '@type': 'ListItem', position: 2, name: t('services.title'), item: `${config.public.siteUrl}${localePath('/services')}` },
  ],
}
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #14B8A6, #0D9488); }
.card-img { height: 140px; background: linear-gradient(135deg, #14B8A6, #0D9488); }
</style>
