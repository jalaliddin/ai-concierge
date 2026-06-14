<template>
  <div>
    <Head>
      <Title>{{ t('blog.title') }} | Khiva Tour Guide</Title>
      <Meta name="description" :content="t('blog.subtitle')" />
    </Head>

    <div class="page-hero">
      <v-container class="py-12">
        <h1 class="text-h3 font-weight-black text-white mb-2">{{ t('blog.title') }}</h1>
        <p class="text-white" style="opacity:0.8">{{ t('blog.subtitle') }}</p>
      </v-container>
    </div>

    <v-container class="py-12">
      <v-row v-if="pending">
        <v-col v-for="i in 6" :key="i" cols="12" sm="6" md="4">
          <v-skeleton-loader type="article" rounded="xl" />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="post in posts"
          :key="post.id"
          cols="12" sm="6" md="4"
        >
          <v-card rounded="xl" class="h-100" hover :to="localePath(`/blog/${post.slug}`)">
            <div class="card-img d-flex align-center justify-center">
              <v-icon size="48" color="white" style="opacity:0.6">mdi-post-outline</v-icon>
            </div>
            <v-card-text class="pa-4">
              <div class="text-caption text-medium-emphasis mb-2">
                <v-icon size="14">mdi-calendar</v-icon>
                {{ new Date(post.published_at || post.created_at).toLocaleDateString() }}
              </div>
              <h2 class="text-body-1 font-weight-bold text-primary mb-2 text-wrap" style="line-height:1.4">
                {{ post.title }}
              </h2>
              <p class="text-body-2 text-medium-emphasis mb-4" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden">
                {{ post.excerpt }}
              </p>
              <v-btn variant="text" color="primary" size="small" class="pa-0">
                {{ t('blog.read_more') }} →
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="!posts.length" cols="12" class="text-center py-16">
          <v-icon size="64" color="grey-lighten-2">mdi-post-outline</v-icon>
          <p class="text-medium-emphasis mt-4">Hozircha maqolalar yo'q</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const api = useApi()

const { data, pending } = await api.fetchPosts(locale.value)
const posts = computed(() => (data.value as any)?.data || data.value || [])
</script>

<style scoped>
.page-hero { background: linear-gradient(135deg, #F59E0B, #D97706); }
.card-img { height: 140px; background: linear-gradient(135deg, #F59E0B, #D97706); }
</style>
