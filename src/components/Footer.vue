<template>
  <el-footer class="footer">
    <div class="footer-container">
      <!-- Bên trái: Bản quyền -->
      <div class="footer-left">
        <div>
          &copy; {{ new Date().getFullYear() }} My Website. All rights reserved.
        </div>
      </div>

      <!-- Ở giữa: Liên kết chính sách -->
      <div class="footer-center">
        <el-space>
          <el-link href="#">Chính sách bảo mật</el-link>
          <el-link href="#">Điều khoản sử dụng</el-link>
          <el-link href="#">Liên hệ</el-link>
        </el-space>
      </div>

      <!-- Bên phải: Icon mạng xã hội -->
      <div class="footer-right">
        <el-space>
          <el-link href="https://facebook.com" target="_blank">
            <el-icon><eleme-filled /></el-icon>
          </el-link>
          <el-link href="https://twitter.com" target="_blank">
            <el-icon><chat-dot-round /></el-icon>
          </el-link>
          <el-link href="https://instagram.com" target="_blank">
            <el-icon><camera-filled /></el-icon>
          </el-link>
        </el-space>
      </div>
    </div>
  </el-footer>
</template>

<script setup>
import {
  ElemeFilled,
  ChatDotRound,
  CameraFilled,
} from "@element-plus/icons-vue";
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 30px 0;
  height: 10px;
  text-align: center;
  margin-left: -50px;
  margin-right: -5px;
  margin-bottom: -8px;
  overflow: hidden;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-left,
.footer-center,
.footer-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.footer-right .el-link {
  font-size: 24px;
  color: white;
}

.footer-right .el-link:hover {
  color: #3498db;
}
</style>
