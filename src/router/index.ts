import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductView from '@/views/ProductView.vue'
import WelcomeView from '@/views/WelcomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'home-login',
      component: LoginView
    },
    {
      path: '/products',
      name: 'home-products',
      component: ProductView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
      meta: { requiresAuth: true }
    }

  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } 
  else if (to.name === 'home-login' && authStore.isAuthenticated) {
    next({ name: 'welcome' }); 
  }
  else {
    next(); 
  }
});

export default router
