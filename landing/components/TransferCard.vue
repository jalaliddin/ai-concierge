<template>
  <v-card rounded="xl" class="h-100 transfer-card" hover>
    <div class="card-image d-flex align-center justify-center">
      <v-icon size="48" color="white" style="opacity:0.7">mdi-car-side</v-icon>
    </div>
    <v-card-text class="pa-4">
      <div class="d-flex align-center mb-2">
        <v-chip size="x-small" color="accent" variant="flat" class="mr-2">Transfer</v-chip>
        <span class="text-caption text-medium-emphasis">
          <v-icon size="14">mdi-account-group</v-icon> {{ transfer.capacity }} {{ t('transfers.passengers') }}
        </span>
      </div>
      <h3 class="text-body-1 font-weight-bold text-primary mb-1 text-wrap" style="line-height:1.3">
        {{ transfer.name }}
      </h3>
      <div class="text-caption text-medium-emphasis mb-1">
        <v-icon size="14">mdi-map-marker-right</v-icon>
        {{ transfer.from_location }} → {{ transfer.to_location }}
      </div>
      <div v-if="transfer.duration_hours" class="text-caption text-medium-emphasis mb-3">
        <v-icon size="14">mdi-clock-outline</v-icon>
        {{ transfer.duration_hours }}h
      </div>
      <div class="d-flex align-center justify-space-between">
        <div>
          <span class="text-h6 font-weight-black text-primary">${{ transfer.price_usd }}</span>
          <span class="text-caption text-medium-emphasis ml-1">/{{ t('transfers.capacity') }}</span>
        </div>
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

const props = defineProps<{ transfer: any }>()

const snackbar = inject<(msg: string) => void>('snackbar', () => {})

function addToCart() {
  cartStore.addItem({
    id: props.transfer.id,
    type: 'transfer',
    name: props.transfer.name,
    price: parseFloat(props.transfer.price_usd),
    currency: 'USD',
    quantity: 1,
    slug: props.transfer.slug,
  })
}
</script>

<style scoped>
.transfer-card { transition: transform 0.2s; }
.transfer-card:hover { transform: translateY(-4px); }
.card-image {
  height: 120px;
  background: linear-gradient(135deg, #0D1B2A, #1a3a5c);
}
</style>
