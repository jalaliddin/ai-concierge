<template>
  <div>
    <Head>
      <Title>{{ t('transfers.title') }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="t('transfers.subtitle')" />
      <Meta property="og:title" :content="`${t('transfers.title')} | Khiva Tour Guide`" />
      <Meta property="og:description" :content="t('transfers.subtitle')" />
    </Head>

    <!-- Breadcrumb JSON-LD -->
    <script type="application/ld+json" v-html="JSON.stringify(breadcrumbSchema)" />

    <!-- Page hero -->
    <div class="page-hero">
      <v-container class="py-12">
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-4">
          <template #divider><v-icon size="16" color="rgba(255,255,255,0.5)">mdi-chevron-right</v-icon></template>
          <template #title="{ item }">
            <NuxtLink :to="item.href" class="text-white text-decoration-none" style="opacity:0.8">{{ item.title }}</NuxtLink>
          </template>
        </v-breadcrumbs>
        <h1 class="text-h3 font-weight-black text-white mb-2">{{ t('transfers.title') }}</h1>
        <p class="text-white" style="opacity:0.8">{{ t('transfers.subtitle') }}</p>
      </v-container>
    </div>

    <v-container class="py-12">
      <v-row v-if="pending">
        <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="4">
          <v-skeleton-loader type="card" rounded="xl" />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="transfer in transfers"
          :key="transfer.id"
          cols="12" sm="6" md="4"
        >
          <v-card rounded="xl" class="h-100" hover :to="localePath(`/transfers/${transfer.slug}`)">
            <div class="card-img d-flex align-center justify-center">
              <v-icon size="56" color="white" style="opacity:0.7">mdi-car-side</v-icon>
            </div>
            <v-card-text class="pa-4">
              <h2 class="text-body-1 font-weight-bold text-primary mb-1">{{ transfer.name }}</h2>
              <div class="text-caption text-medium-emphasis mb-1">
                <v-icon size="14">mdi-map-marker-right</v-icon>
                {{ transfer.from_location }} → {{ transfer.to_location }}
              </div>
              <div class="d-flex gap-3 text-caption text-medium-emphasis mb-3">
                <span><v-icon size="14">mdi-account-group</v-icon> {{ transfer.capacity }} {{ t('transfers.passengers') }}</span>
                <span v-if="transfer.duration_hours"><v-icon size="14">mdi-clock</v-icon> {{ transfer.duration_hours }}h</span>
              </div>
              <div class="d-flex align-center justify-space-between">
                <span class="text-h6 font-weight-black text-primary">${{ transfer.price_usd }}</span>
                <v-btn color="cta" size="small" rounded="lg" @click.prevent="addToCart(transfer)">
                  {{ t('cart.add') }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Snackbar -->
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

const { data, pending } = await api.fetchTransfers()
const transfers = computed(() => (data.value as any)?.data || data.value || [])

const snack = ref(false)

function addToCart(transfer: any) {
  cartStore.addItem({
    id: transfer.id,
    type: 'transfer',
    name: transfer.name,
    price: parseFloat(transfer.price_usd),
    currency: 'USD',
    quantity: 1,
    slug: transfer.slug,
  })
  snack.value = true
}

const breadcrumbs = [
  { title: 'Home', href: localePath('/') },
  { title: t('transfers.title'), href: localePath('/transfers') },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.title,
    item: `${config.public.siteUrl}${b.href}`,
  })),
}
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #0D1B2A, #1a3a5c); }
.card-img { height: 140px; background: linear-gradient(135deg, #0D1B2A, #1a3a5c); }
</style>
