<template>
  <v-card rounded="xl" class="h-100 service-card" hover>
    <div class="card-image d-flex align-center justify-center">
      <v-icon size="48" color="white" style="opacity:0.7">mdi-map-marker-star</v-icon>
    </div>
    <v-card-text class="pa-4">
      <div class="d-flex align-center mb-2">
        <v-chip size="x-small" color="primary" variant="flat" class="mr-2">{{ service.category || 'Tour' }}</v-chip>
      </div>
      <h3 class="text-body-1 font-weight-bold text-primary mb-2 text-wrap" style="line-height:1.3">
        {{ service.name }}
      </h3>
      <p class="text-body-2 text-medium-emphasis mb-3" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">
        {{ service.description }}
      </p>
      <div class="d-flex align-center justify-space-between">
        <span class="text-h6 font-weight-black text-primary">${{ service.price_usd }}</span>
        <v-btn color="cta" size="small" rounded="lg" @click="addToCart">
          {{ t('cart.add') }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const { t } = useI18n()
const cartStore = useCartStore()

const props = defineProps<{ service: any }>()

function addToCart() {
  cartStore.addItem({
    id: props.service.id,
    type: 'service',
    name: props.service.name,
    price: parseFloat(props.service.price_usd),
    currency: 'USD',
    quantity: 1,
    slug: props.service.slug,
  })
}
</script>

<style scoped>
.service-card { transition: transform 0.2s; }
.service-card:hover { transform: translateY(-4px); }
.card-image {
  height: 120px;
  background: linear-gradient(135deg, #14B8A6, #0D9488);
}
</style>
