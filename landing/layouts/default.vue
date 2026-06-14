<template>
  <v-app>
    <!-- Navigation -->
    <v-app-bar color="primary" elevation="1" :height="64">
      <div class="d-flex align-center w-100 px-4">
        <NuxtLink :to="localePath('/')" class="text-decoration-none d-flex align-center">
          <v-icon color="accent" size="28" class="mr-2">mdi-compass-rose</v-icon>
          <span class="text-white font-weight-bold text-body-1 d-none d-sm-block">Khiva Tour Guide</span>
        </NuxtLink>

        <v-spacer />

        <!-- Desktop nav -->
        <div class="d-none d-md-flex align-center gap-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="localePath(item.to)"
            class="text-white text-decoration-none text-body-2 px-3 py-2 nav-link"
          >
            {{ t(item.label) }}
          </NuxtLink>
        </div>

        <!-- Cart button -->
        <v-btn icon class="ml-2" @click="cartDrawer = !cartDrawer">
          <v-badge :content="cartStore.items.length" :model-value="cartStore.items.length > 0" color="cta">
            <v-icon color="white">mdi-cart</v-icon>
          </v-badge>
        </v-btn>

        <!-- Language switcher -->
        <v-menu>
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" size="small" class="ml-1">
              <span class="text-white text-caption">{{ currentLocale?.toUpperCase() }}</span>
              <v-icon color="white" size="16">mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list density="compact" rounded="lg">
            <v-list-item
              v-for="loc in availableLocales"
              :key="loc.code"
              @click="switchLocalePath(loc.code)"
              :title="loc.name"
              :value="loc.code"
            />
          </v-list>
        </v-menu>

        <!-- Mobile nav drawer toggle -->
        <v-btn icon class="d-md-none ml-1" @click="mobileDrawer = !mobileDrawer">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <!-- Mobile drawer -->
    <v-navigation-drawer v-model="mobileDrawer" location="right" temporary color="primary">
      <v-list density="compact" nav class="mt-4">
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="localePath(item.to)"
          :title="t(item.label)"
          :prepend-icon="item.icon"
          active-color="accent"
          rounded="lg"
          @click="mobileDrawer = false"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Cart drawer -->
    <v-navigation-drawer v-model="cartDrawer" location="right" width="360" temporary>
      <div class="pa-4">
        <div class="d-flex align-center mb-4">
          <h3 class="text-h6 font-weight-bold">{{ t('cart.title') }}</h3>
          <v-spacer />
          <v-btn icon size="small" @click="cartDrawer = false"><v-icon>mdi-close</v-icon></v-btn>
        </div>

        <div v-if="cartStore.items.length === 0" class="text-center py-12">
          <v-icon size="48" color="grey-lighten-2">mdi-cart-outline</v-icon>
          <p class="text-medium-emphasis mt-2">{{ t('cart.empty') }}</p>
        </div>

        <div v-else>
          <v-card
            v-for="item in cartStore.items"
            :key="`${item.type}-${item.id}`"
            class="mb-3"
            rounded="lg"
            variant="outlined"
          >
            <v-card-text class="pa-3">
              <div class="d-flex justify-between align-start">
                <div class="flex-grow-1 mr-2">
                  <div class="text-body-2 font-weight-medium">{{ item.name }}</div>
                  <div class="text-caption text-medium-emphasis">${{ item.price }} × {{ item.quantity }}</div>
                </div>
                <div class="text-right">
                  <div class="text-body-2 font-weight-bold">${{ (item.price * item.quantity).toFixed(2) }}</div>
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    color="error"
                    @click="cartStore.removeItem(item.id, item.type)"
                  >
                    <v-icon size="16">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <v-divider class="my-3" />
          <div class="d-flex justify-between text-h6 font-weight-bold mb-4">
            <span>{{ t('cart.total') }}</span>
            <span>${{ cartStore.total.toFixed(2) }}</span>
          </div>

          <v-btn
            :to="localePath('/checkout')"
            color="cta"
            block
            size="large"
            rounded="lg"
            @click="cartDrawer = false"
          >
            {{ t('cart.checkout') }}
          </v-btn>
          <v-btn variant="text" color="error" size="small" block class="mt-2" @click="cartStore.clearCart()">
            {{ t('cart.clear') }}
          </v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>

    <!-- Footer -->
    <v-footer color="primary" class="pa-0 mt-12">
      <div class="w-100 pa-8">
        <v-row>
          <v-col cols="12" md="4">
            <div class="d-flex align-center mb-3">
              <v-icon color="accent" class="mr-2">mdi-compass-rose</v-icon>
              <span class="text-white font-weight-bold text-h6">Khiva Tour Guide</span>
            </div>
            <p class="text-white text-body-2" style="opacity:0.7">{{ t('footer.description') }}</p>
          </v-col>
          <v-col cols="12" md="4">
            <h4 class="text-white font-weight-bold mb-3">{{ t('footer.contact') }}</h4>
            <div class="d-flex flex-column gap-2">
              <a :href="`https://wa.me/${config.public.whatsapp}`" target="_blank" class="text-white text-decoration-none text-body-2 d-flex align-center">
                <v-icon size="18" class="mr-2" color="success">mdi-whatsapp</v-icon>
                WhatsApp
              </a>
              <a :href="`https://t.me/${config.public.telegram}`" target="_blank" class="text-white text-decoration-none text-body-2 d-flex align-center">
                <v-icon size="18" class="mr-2" color="info">mdi-send</v-icon>
                Telegram
              </a>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <h4 class="text-white font-weight-bold mb-3">Menu</h4>
            <div class="d-flex flex-column gap-1">
              <NuxtLink v-for="item in navItems" :key="item.to" :to="localePath(item.to)"
                class="text-white text-decoration-none text-body-2" style="opacity:0.8">
                {{ t(item.label) }}
              </NuxtLink>
            </div>
          </v-col>
        </v-row>
        <v-divider color="rgba(255,255,255,0.1)" class="my-4" />
        <p class="text-center text-white text-caption" style="opacity:0.5">
          © {{ new Date().getFullYear() }} Khiva Tour Guide. {{ t('footer.rights') }}.
        </p>
      </div>
    </v-footer>

    <!-- Floating WhatsApp/Telegram buttons -->
    <div class="floating-contacts">
      <a :href="`https://wa.me/${config.public.whatsapp}`" target="_blank" class="floating-btn whatsapp-btn">
        <v-icon color="white">mdi-whatsapp</v-icon>
      </a>
      <a :href="`https://t.me/${config.public.telegram}`" target="_blank" class="floating-btn telegram-btn">
        <v-icon color="white">mdi-send</v-icon>
      </a>
    </div>
  </v-app>
</template>

<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const cartStore = useCartStore()
const config = useRuntimeConfig()

const cartDrawer = ref(false)
const mobileDrawer = ref(false)

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)

const navItems = [
  { to: '/', label: 'nav.home', icon: 'mdi-home' },
  { to: '/transfers', label: 'nav.transfers', icon: 'mdi-car' },
  { to: '/services', label: 'nav.tours', icon: 'mdi-map-marker-star' },
  { to: '/blog', label: 'nav.blog', icon: 'mdi-post' },
]
</script>

<style scoped>
.nav-link { border-radius: 8px; transition: background 0.2s; }
.nav-link:hover { background: rgba(255,255,255,0.1); }
.floating-contacts { position: fixed; bottom: 24px; right: 24px; z-index: 1000; display: flex; flex-direction: column; gap: 12px; }
.floating-btn {
  display: flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: 50%;
  text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}
.floating-btn:hover { transform: scale(1.1); }
.whatsapp-btn { background: #25D366; }
.telegram-btn { background: #2AABEE; }
</style>
