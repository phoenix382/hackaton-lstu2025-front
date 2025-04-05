import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      
      component: () => import('../views/LoginView.vue'),
    },

  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Initialize auth state on first load
  if (!authStore.state.token) {
    authStore.initializeAuth();
  }

  if (to.meta.requiresAuth && !authStore.state.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && authStore.state.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router
