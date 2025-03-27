import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, useStorage } from '@vueuse/core'
import router from '@/router'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


export const useAuthStore = defineStore('auth', () => {
  // State
  const access_token = useStorage('access_token', null);
  const role = useStorage('role', null);
  // Getter
  const isAuthenticated = computed(() => !!access_token.value);
  const getRole = computed(() => role.value);
  // Actions
  const login = (newToken, role1 = "user") => {
    // console.log("Login with token:", newToken);
    access_token.value = newToken; // Cập nhật token trong useStorage
    role.value = role1
    if (role1 == "user") {
      router.push('/');

    } else {
      router.push("/admin")
    }
  };

  const logout = () => {
    access_token.value = null;  // Xóa token
    role.value = null
    router.push('/auth');
  };

  return { access_token, isAuthenticated, login, logout, getRole };
});