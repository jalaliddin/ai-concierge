<template>
  <div>
    <!-- SEO Head -->
    <Head>
      <Title>{{ t('hero.title') }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="t('hero.subtitle')" />
      <Meta property="og:title" :content="`${t('hero.title')} | Khiva Tour Guide`" />
      <Meta property="og:description" :content="t('hero.subtitle')" />
      <Meta property="og:type" content="website" />
      <Meta property="og:url" :content="`${config.public.siteUrl}${localePath('/')}`" />
      <Link rel="alternate" hreflang="en" :href="`${config.public.siteUrl}/en`" />
      <Link rel="alternate" hreflang="ru" :href="`${config.public.siteUrl}/ru`" />
      <Link rel="alternate" hreflang="uz" :href="`${config.public.siteUrl}/uz`" />
      <Link rel="alternate" hreflang="x-default" :href="`${config.public.siteUrl}/en`" />
    </Head>

    <!-- JSON-LD TravelAgency -->
    <script type="application/ld+json" v-html="JSON.stringify(travelAgencySchema)" />

    <!-- Hero -->
    <section class="hero-section">
      <v-container class="py-16">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <div class="text-caption text-accent mb-2 font-weight-medium" style="letter-spacing:3px;text-transform:uppercase">
              Khiva, Uzbekistan
            </div>
            <h1 class="text-h3 text-md-h2 font-weight-black text-white mb-4" style="line-height:1.15">
              {{ t('hero.title') }}
            </h1>
            <p class="text-h6 text-white mb-8" style="opacity:0.85;font-weight:400;max-width:580px;margin:0 auto 2rem">
              {{ t('hero.subtitle') }}
            </p>
            <div class="d-flex gap-4 justify-center flex-wrap">
              <v-btn
                :to="localePath('/checkout')"
                color="cta"
                size="x-large"
                rounded="lg"
                elevation="0"
                class="font-weight-bold px-8"
              >
                {{ t('hero.cta') }}
              </v-btn>
              <v-btn
                :to="localePath('/transfers')"
                variant="outlined"
                size="x-large"
                rounded="lg"
                class="text-white font-weight-bold px-8"
                style="border-color:rgba(255,255,255,0.5)"
              >
                {{ t('hero.cta2') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- Stats bar -->
      <div class="stats-bar">
        <v-container>
          <v-row justify="center">
            <v-col v-for="stat in stats" :key="stat.value" cols="6" sm="3" class="text-center">
              <div class="text-h5 font-weight-black text-accent">{{ stat.value }}</div>
              <div class="text-caption text-white" style="opacity:0.8">{{ stat.label }}</div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </section>

    <!-- Transfers section -->
    <section class="py-14">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-bold text-primary mb-2">{{ t('transfers.title') }}</h2>
          <p class="text-medium-emphasis">{{ t('transfers.subtitle') }}</p>
        </div>

        <v-row v-if="pending">
          <v-col v-for="i in 4" :key="i" cols="12" sm="6" lg="3">
            <v-skeleton-loader type="card" rounded="lg" />
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col
            v-for="transfer in transfers?.slice(0, 4)"
            :key="transfer.id"
            cols="12" sm="6" lg="3"
          >
            <TransferCard :transfer="transfer" />
          </v-col>
        </v-row>

        <div class="text-center mt-8">
          <v-btn :to="localePath('/transfers')" variant="outlined" color="primary" size="large" rounded="lg">
            {{ t('transfers.title') }} →
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Services section -->
    <section class="py-14 bg-surface-variant">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-bold text-primary mb-2">{{ t('services.title') }}</h2>
          <p class="text-medium-emphasis">{{ t('services.subtitle') }}</p>
        </div>

        <v-row v-if="pending">
          <v-col v-for="i in 3" :key="i" cols="12" sm="6" md="4">
            <v-skeleton-loader type="card" rounded="lg" />
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col
            v-for="service in catalog?.services?.slice(0, 3)"
            :key="service.id"
            cols="12" sm="6" md="4"
          >
            <ServiceCard :service="service" />
          </v-col>
        </v-row>

        <div class="text-center mt-8">
          <v-btn :to="localePath('/services')" variant="outlined" color="primary" size="large" rounded="lg">
            {{ t('services.title') }} →
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Why choose us -->
    <section class="py-14">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-bold text-primary mb-2">Nima uchun biz?</h2>
        </div>
        <v-row>
          <v-col v-for="feature in features" :key="feature.icon" cols="12" sm="6" md="3">
            <v-card rounded="xl" variant="flat" class="text-center pa-6 h-100" color="background">
              <v-icon :color="feature.color" size="48" class="mb-4">{{ feature.icon }}</v-icon>
              <h3 class="text-h6 font-weight-bold mb-2">{{ feature.title }}</h3>
              <p class="text-medium-emphasis text-body-2">{{ feature.desc }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Order tracking -->
    <section class="py-14 bg-primary">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="6" class="text-center">
            <h2 class="text-h4 font-weight-bold text-white mb-2">{{ t('track.title') }}</h2>
            <p class="text-white mb-6" style="opacity:0.8">{{ t('track.placeholder') }}</p>
            <div class="d-flex gap-3">
              <v-text-field
                v-model="trackNumber"
                :placeholder="t('track.placeholder')"
                variant="solo"
                rounded="lg"
                hide-details
                bg-color="white"
                @keyup.enter="trackOrder"
              />
              <v-btn color="cta" size="large" rounded="lg" :loading="tracking" @click="trackOrder">
                {{ t('track.btn') }}
              </v-btn>
            </div>
            <v-card v-if="trackResult" class="mt-4 text-left" rounded="lg">
              <v-card-text>
                <div class="d-flex justify-between mb-2">
                  <span class="font-weight-bold">{{ trackResult.order_number }}</span>
                  <v-chip :color="statusColor(trackResult.status)" size="small">{{ trackResult.status }}</v-chip>
                </div>
                <div class="text-body-2 text-medium-emphasis">{{ t('track.total') }}: ${{ trackResult.total_price }}</div>
              </v-card-text>
            </v-card>
            <v-alert v-if="trackError" type="error" class="mt-4" rounded="lg">{{ trackError }}</v-alert>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Blog preview -->
    <section v-if="posts?.length" class="py-14">
      <v-container>
        <div class="text-center mb-10">
          <h2 class="text-h4 font-weight-bold text-primary mb-2">{{ t('blog.title') }}</h2>
          <p class="text-medium-emphasis">{{ t('blog.subtitle') }}</p>
        </div>
        <v-row>
          <v-col v-for="post in posts.slice(0, 3)" :key="post.id" cols="12" md="4">
            <v-card rounded="xl" class="h-100" hover :to="localePath(`/blog/${post.slug}`)">
              <v-card-title class="text-wrap pt-4 px-4 text-body-1 font-weight-bold">{{ post.title }}</v-card-title>
              <v-card-subtitle class="px-4">{{ new Date(post.published_at).toLocaleDateString() }}</v-card-subtitle>
              <v-card-text class="text-medium-emphasis text-body-2">
                {{ post.excerpt?.substring(0, 120) }}...
              </v-card-text>
              <v-card-actions class="px-4 pb-4">
                <v-btn variant="text" color="primary" size="small">{{ t('blog.read_more') }} →</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const api = useApi()

const { data: catalog, pending } = await api.fetchCatalog()
const transfers = computed(() => catalog.value?.transfers)

const { data: postsData } = await api.fetchPosts(locale.value)
const posts = computed(() => postsData.value?.data || postsData.value || [])

const trackNumber = ref('')
const tracking = ref(false)
const trackResult = ref<any>(null)
const trackError = ref('')

async function trackOrder() {
  if (!trackNumber.value.trim()) return
  tracking.value = true
  trackError.value = ''
  trackResult.value = null
  try {
    trackResult.value = await api.trackOrder(trackNumber.value.trim())
  } catch {
    trackError.value = 'Buyurtma topilmadi.'
  } finally {
    tracking.value = false
  }
}

function statusColor(status: string) {
  const map: Record<string, string> = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'error' }
  return map[status] || 'default'
}

const stats = [
  { value: '500+', label: 'Mijozlar' },
  { value: '7', label: 'Transfer yo\'nalishlari' },
  { value: '4+', label: 'Yillik tajriba' },
  { value: '100%', label: 'Mamnunlik' },
]

const features = [
  { icon: 'mdi-car-side', color: 'primary', title: 'Xususiy transfer', desc: 'Qulay va xavfsiz xususiy avtomobil bilan siz uchun.' },
  { icon: 'mdi-shield-check', color: 'success', title: 'Ishonchli', desc: 'To\'lov tasdiqlangandan keyin bron aniq.' },
  { icon: 'mdi-translate', color: 'accent', title: '3 tilda', desc: "O'zbek, rus va ingliz tillarida xizmat." },
  { icon: 'mdi-headset', color: 'cta', title: '24/7 qo\'llab-quvvatlash', desc: 'WhatsApp va Telegram orqali har doim bog\'laning.' },
]

const travelAgencySchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Khiva Tour Guide',
  url: config.public.siteUrl,
  description: t('hero.subtitle'),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Khiva',
    addressCountry: 'UZ',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Uzbek', 'Russian', 'English'],
  },
  sameAs: [
    `https://wa.me/${config.public.whatsapp}`,
    `https://t.me/${config.public.telegram}`,
  ],
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #0D1B2A 0%, #1a3a5c 60%, #0D1B2A 100%);
  padding-top: 40px;
  position: relative;
}
.stats-bar {
  background: rgba(255,255,255,0.05);
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 24px 0;
}
.bg-surface-variant { background: #F1F5F9; }
</style>
