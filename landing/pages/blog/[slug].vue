<template>
  <div v-if="post">
    <Head>
      <Title>{{ post.meta_title || post.title }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="post.meta_description || post.excerpt" />
      <Meta property="og:title" :content="post.meta_title || post.title" />
      <Meta property="og:description" :content="post.meta_description || post.excerpt" />
      <Meta property="og:type" content="article" />
    </Head>

    <script type="application/ld+json" v-html="JSON.stringify(articleSchema)" />

    <div class="page-hero">
      <v-container class="py-10">
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 mb-4">
          <template #divider><v-icon size="16" color="rgba(255,255,255,0.5)">mdi-chevron-right</v-icon></template>
          <template #title="{ item }">
            <NuxtLink :to="item.href" class="text-white text-decoration-none" style="opacity:0.8">{{ item.title }}</NuxtLink>
          </template>
        </v-breadcrumbs>
        <div class="text-caption text-white mb-2" style="opacity:0.7">
          {{ new Date(post.published_at || post.created_at).toLocaleDateString() }}
        </div>
        <h1 class="text-h3 font-weight-black text-white">{{ post.title }}</h1>
      </v-container>
    </div>

    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card rounded="xl">
            <v-card-text class="pa-8">
              <div class="post-body text-body-1" style="line-height:1.9;white-space:pre-wrap">{{ post.body }}</div>
            </v-card-text>
          </v-card>

          <div class="mt-8">
            <v-btn :to="localePath('/blog')" variant="outlined" color="primary" rounded="lg">
              ← {{ t('blog.title') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <div v-else-if="pending" class="d-flex justify-center align-center" style="min-height:50vh">
    <v-progress-circular indeterminate color="primary" />
  </div>

  <div v-else class="text-center py-20">
    <v-icon size="64" color="grey">mdi-alert-circle</v-icon>
    <p class="text-h6 mt-4">Maqola topilmadi</p>
    <v-btn :to="localePath('/blog')" color="primary" class="mt-4">← Orqaga</v-btn>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()
const api = useApi()

const { data, pending } = await api.fetchPost(route.params.slug as string)
const post = computed(() => (data.value as any)?.data || data.value)

const breadcrumbs = computed(() => [
  { title: 'Home', href: localePath('/') },
  { title: t('blog.title'), href: localePath('/blog') },
  { title: post.value?.title || '', href: '' },
])

const articleSchema = computed(() => post.value ? {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.value.title,
  description: post.value.excerpt,
  datePublished: post.value.published_at || post.value.created_at,
  publisher: {
    '@type': 'Organization',
    name: 'Khiva Tour Guide',
    url: config.public.siteUrl,
  },
} : {})
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #F59E0B, #D97706); }
.post-body { color: rgba(0,0,0,0.8); }
</style>
