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
        style="height: 100vh"
      >
        <router-link to="/" class="link">
          <el-menu-item class="el-menu-item">
            <el-icon><setting /></el-icon>
            <span>Quan li nhan vien</span>
          </el-menu-item>
        </router-link>
        <router-link to="/sach" class="link">
          <el-menu-item class="el-menu-item">
            <el-icon><setting /></el-icon>
            <span>Quan li sach</span>
          </el-menu-item>
        </router-link>
        <router-link to="/doc-gia" class="link">
          <el-menu-item class="el-menu-item">
            <el-icon><setting /></el-icon>
            <span>Quan li doc gia</span>
          </el-menu-item>
        </router-link>
        <router-link to="/nxb" class="link">
          <el-menu-item class="el-menu-item">
            <el-icon><setting /></el-icon>
            <span>Quan li nha xuat ban</span>
          </el-menu-item>
        </router-link>
        <router-link to="/theo-doi-muon-sach" class="link">
          <el-menu-item class="el-menu-item">
            <el-icon><setting /></el-icon>
            <span>Quan li theo doi muon sach</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
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
</style>