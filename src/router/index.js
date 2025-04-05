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
      path: '/profile',
      name: 'profile',
      
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    // далее требуется заполненный профиль
    {
      path: '/main',
      name: 'main',
      
      component: () => import('../views/MainView.vue'),
      meta: { requiresAuth: true, requiresFilledProfile: true }
    },
    {
      path: '/plans',
      name: 'plans',

      component: () => import('../views/PlansView.vue'),
      meta: { requiresAuth: true, requiresFilledProfile: true }
    },
    // тут и просмотр и редактирование
    {
      path: '/plan/:id',
      name: 'plan',

      component: () => import('../views/PlanView.vue'),
    },

    // авторизация
    {
      path: '/login',
      name: 'login',
      
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      
      component: () => import('../views/RegisterView.vue'),
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
