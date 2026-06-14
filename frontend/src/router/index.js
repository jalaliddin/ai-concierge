import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // ─── Mehmon QR ilovasi ────────────────────────────────────────
  { path: '/h/:token', component: () => import('@/views/guest/WelcomePage.vue'), name: 'welcome' },
  { path: '/chat', component: () => import('@/views/guest/ChatPage.vue'), name: 'chat' },

  // ─── Admin panel ──────────────────────────────────────────────
  { path: '/admin/login', component: () => import('@/views/admin/LoginPage.vue'), name: 'login' },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', component: () => import('@/views/admin/DashboardPage.vue'), name: 'dashboard' },
      { path: 'guest-houses', component: () => import('@/views/admin/GuestHousesPage.vue'), name: 'guest-houses' },
      { path: 'transfers', component: () => import('@/views/admin/TransfersPage.vue'), name: 'transfers' },
      { path: 'services', component: () => import('@/views/admin/ServicesPage.vue'), name: 'services' },
      { path: 'bookings', component: () => import('@/views/admin/BookingsPage.vue'), name: 'bookings' },
      { path: 'orders', component: () => import('@/views/admin/OrdersPage.vue'), name: 'orders' },
      { path: 'requests', component: () => import('@/views/admin/RequestsPage.vue'), name: 'requests' },
      { path: 'registrations', component: () => import('@/views/admin/RegistrationsPage.vue'), name: 'registrations' },
      { path: 'house-rules', component: () => import('@/views/admin/HouseRulesPage.vue'), name: 'house-rules' },
      { path: 'knowledge-base', component: () => import('@/views/admin/KnowledgeBasePage.vue'), name: 'knowledge-base' },
      { path: 'recommendations', component: () => import('@/views/admin/RecommendationsPage.vue'), name: 'recommendations' },
      { path: 'posts', component: () => import('@/views/admin/PostsPage.vue'), name: 'posts' },
      { path: 'conversations', component: () => import('@/views/admin/ConversationsPage.vue'), name: 'conversations' },
    ],
  },

  { path: '/', redirect: '/admin' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('admin_token')
    if (!token) return { name: 'login' }
  }
})

export default router
