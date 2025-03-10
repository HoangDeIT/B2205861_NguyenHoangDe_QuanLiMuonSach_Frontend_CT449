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

  // Getter
  const isAuthenticated = computed(() => !!access_token.value);

  // Actions
  const login = (newToken) => {
    // console.log("Login with token:", newToken);
    access_token.value = newToken; // Cập nhật token trong useStorage
    router.push('/');
  };

  const logout = () => {
    access_token.value = null;  // Xóa token
    router.push('/auth');
  };

  return { access_token, isAuthenticated, login, logout };
});