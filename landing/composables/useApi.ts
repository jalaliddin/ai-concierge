export const useApi = () => {
  const config = useRuntimeConfig()

  // SSR: Docker internal network (backend:8000) — no nginx round-trip
  // CSR: /api — nginx routes to backend
  const baseURL = import.meta.server
    ? (config.apiBaseInternal as string)
    : config.public.apiBase

  const fetchTransfers = () => useFetch(`${baseURL}/landing/transfers`, { key: 'transfers' })
  const fetchTransfer = (slug: string) => useFetch(`${baseURL}/landing/transfers/${slug}`, { key: `transfer-${slug}` })
  const fetchServices = (category?: string) => useFetch(`${baseURL}/landing/services`, {
    key: `services-${category || 'all'}`,
    query: category ? { category } : {},
  })
  const fetchService = (slug: string) => useFetch(`${baseURL}/landing/services/${slug}`, { key: `service-${slug}` })
  const fetchPosts = (language?: string) => useFetch(`${baseURL}/landing/posts`, {
    key: `posts-${language || 'all'}`,
    query: language ? { language } : {},
  })
  const fetchPost = (slug: string) => useFetch(`${baseURL}/landing/posts/${slug}`, { key: `post-${slug}` })
  const fetchCatalog = () => useFetch(`${baseURL}/landing/catalog`, { key: 'catalog' })

  // $fetch (client-side mutations) always use public API base
  const placeOrder = (body: object) => $fetch(`${config.public.apiBase}/landing/order`, {
    method: 'POST',
    body,
  })

  const trackOrder = (orderNumber: string) => $fetch(`${config.public.apiBase}/landing/order/${orderNumber}`)

  return {
    fetchTransfers, fetchTransfer, fetchServices, fetchService,
    fetchPosts, fetchPost, fetchCatalog, placeOrder, trackOrder,
  }
}
