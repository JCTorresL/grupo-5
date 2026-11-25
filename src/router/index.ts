
import { createRouter, createWebHistory } from 'vue-router'
import { sessionIsActive } from '../features/auth/useAuth.ts'

import DashboardLayout from '../layouts/DashboardLayout.vue'
import LoginView from '../views/auth/LoginView.vue'
import ConversationView from '../views/dashboard/ConversationView.vue'
import OrderView from '../views/dashboard/OrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/conversation',
          name: 'conversation',
          component: ConversationView,
        },
        {
          path: '/order',
          name: 'order',
          component: OrderView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'login' },
    },
  ],

  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach(async (to) => {

  const isAuthenticated = await sessionIsActive()

  if (to.meta.requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true

})

export default router
