<template>
  <el-row class="tac">
    <el-col :span="20">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#rgba(0, 0, 0, 0)"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#black"
        @open="handleOpen"
        @close="handleClose"
        style="min-height: 85vh"
      >
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="link"
        >
          <el-menu-item :class="{ active: currentPath === item.path }">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const menuItems = [
  { path: "/admin", label: "Quản lý nhân viên", icon: Setting },
  { path: "/admin/sach", label: "Quản lý sách", icon: Setting },
  { path: "/admin/doc-gia", label: "Quản lý độc giả", icon: Setting },
  { path: "/admin/nxb", label: "Quản lý nhà xuất bản", icon: Setting },
  {
    path: "/admin/theo-doi-muon-sach",
    label: "Theo dõi mượn sách",
    icon: Setting,
  },
];
import { ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const route = useRoute();
const currentPath = ref(route.path);
watchEffect(() => {
  currentPath.value = route.path;
});

const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>
<style scoped>
.el-menu-item {
  border: 1px solid #9ea2ac;
  margin: 15px;
  border-radius: 10px;

  color: black;
  text-decoration-line: none;
}
.link {
  text-decoration: none !important;
}
.active {
  background-color: thistle;
}
</style>