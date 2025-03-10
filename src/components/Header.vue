<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img style="width: 100px" src="/src/assets/logo.svg" alt="Element logo" />
    </el-menu-item>
    <el-menu-item index="0">
      <h1>Welcome</h1>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <div>
          Hello Admin
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
      </template>
      <el-menu-item index="1-1" @click="logout">Logout</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/counter";
import { ref } from "vue";
const {logout}=useAuthStore();
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script>

<style scoped>
.el-menu--horizontal {
  display: flex;
  justify-content: space-between;
}
</style>