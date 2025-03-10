import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import ManageStaff from '@/views/ManageStaff.vue'
import Auth from '@/views/Auth.vue'
import { useAuthStore } from '@/stores/counter'
import ManageReader from '@/views/ManageReader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: ManageStaff
        },
        {
          path: '/reader',
          component: ManageReader
        },
      ]
    }, {
      path: "/auth",
      name: "auth",
      component: Auth,
      meta: { requiresAuth: false },
    }
  ],
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Lấy store
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth'); // Nếu chưa đăng nhập -> Chuyển đến trang auth
  } else {
    next(); // Nếu đã đăng nhập thì tiếp tục
  }
});
export default router
