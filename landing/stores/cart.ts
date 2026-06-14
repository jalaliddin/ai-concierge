export interface CartItem {
  id: number
  type: 'transfer' | 'service'
  name: string
  price: number
  currency: string
  quantity: number
  slug?: string
  pickup_location?: string
  scheduled_at?: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const total = computed(() => items.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

  function addItem(item: CartItem) {
    const existing = items.value.find(i => i.id === item.id && i.type === item.type)
    if (existing) {
      existing.quantity += item.quantity
    } else {
      items.value.push({ ...item })
    }
  }

  function removeItem(id: number, type: string) {
    items.value = items.value.filter(i => !(i.id === id && i.type === type))
  }

  function clearCart() {
    items.value = []
  }

  return { items, total, addItem, removeItem, clearCart }
}, {
  persist: true,
})
