import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import LoginView from '@/views/LoginView.vue'
import ProductView from '@/views/ProductView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'

export const routes = {
  "home": "home",
  "homeLogin": "home-login",
  "homeProducts": "home-products",
  "welcome": "welcome",
  "productDetail" : "productDetail",
  "cart": "home-cart"
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: routes.home,
      component: HomeView
    },
    {
      path: '/login',
      name: routes.homeLogin,
      component: LoginView
    },
     {
      path: '/cart',
      name: routes.cart,
      component: CartView,
      meta: { requiresAuth: true }
    },
    {
      path: '/products',
      name: routes.homeProducts,
      component: ProductView,
    },
    {
      path: '/product/:id',
      name: routes.productDetail,
      component: ProductDetailView,
    },
    {
      path: '/welcome',
      name: routes.welcome,
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
