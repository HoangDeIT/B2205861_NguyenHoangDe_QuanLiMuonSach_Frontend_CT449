import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layout/DefaultLayout.vue'
import ManageStaff from '@/views/ManageStaff.vue'
import Auth from '@/views/Auth.vue'
import { useAuthStore } from '@/stores/counter'
import ManageReader from '@/views/ManageDocGia.vue'
import ManageNhaXuatBan from '@/views/ManageNhaXuatBan.vue'
import ManageSach from '@/views/ManageSach.vue'
import ManageTheoDoiMuonSach from '@/views/ManageTheoDoiMuonSach.vue'
import HomePage from '@/views/HomePage.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'home',
      component: DefaultLayout,
      meta: { requiresAuth: true, role: ['admin'] },
      children: [
        {
          path: '',
          component: ManageStaff
        },
        {
          path: 'doc-gia',
          component: ManageReader
        },
        {
          path: 'nxb',
          component: ManageNhaXuatBan
        },
        {
          path: 'sach',
          component: ManageSach
        },
        {
          path: 'theo-doi-muon-sach',
          component: ManageTheoDoiMuonSach
        },
      ]
    }, {
      path: "/auth",
      name: "auth",
      component: Auth,
      meta: { requiresAuth: false, role: [] },
    },
    {
      path: "/",
      name: "homepage",
      component: HomePage,
      meta: { requiresAuth: false, role: [] },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { requiresAuth: false, role: [] },
    }
  ],
})
router.beforeEach((to, from, next) => {
  const { isAuthenticated, getRole } = useAuthStore(); // Lấy store
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth'); // Nếu chưa đăng nhập -> Chuyển đến trang auth
  } else if (to.meta.role.length > 0 && !to.meta.role.includes(getRole)) {
    next('/'); // Nếu role không đúng -> Chuyển đến trang chủ
  } else {
    next(); // Nếu đã đăng nhập thì tiếp tục
  }
});
export default router

