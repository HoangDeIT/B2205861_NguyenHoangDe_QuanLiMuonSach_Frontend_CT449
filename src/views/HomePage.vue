<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
const search = ref("");
</script>

<template>
  <header>
    <div class="logo">
      <img src="/src/assets/ctu.png" alt="" width="80" />
      <h1>WEB BAN SACH</h1>
    </div>
    <div class="search">
      <div>
        <el-input
          v-model="search"
          placeholder="Tìm kiếm theo Tên NXB"
          class="input-with-select"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
    <div>
      <div>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </div>
    </div>
  </header>
  <main>
    <el-carousel
      height="200px"
      style="
        border: 1px solid #ccc;
        max-width: 1300px;
        margin: auto;
        margin-bottom: 50px;
      "
    >
      <el-carousel-item>
        <img
          src="/src/assets/book/book1.jpg"
          width="100%"
          height="200"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="/src/assets/book/book2.jpg"
          width="100%"
          height="200"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          src="/src/assets/book/book3.jpg"
          width="100%"
          height="200"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>

    <el-container class="container">
      <div class="filter">
        <h1 style="margin-left: 20px">Nha xuat ban</h1>
        <div class="filter-item">sad</div>
      </div>
      <div class="grid-layout">
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
        <el-card style="max-width: 480px">
          <template #header>Yummy hamburger</template>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 100%"
          />
        </el-card>
      </div>
    </el-container>
  </main>
</template>
<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
header .logo {
  display: flex;
  align-items: center;
  font-size: 8px;
}
header .search {
  margin-right: 200px;
}
main {
  background-color: rgb(245, 245, 250);
  min-height: 100vh;
  width: 100%;
  padding-top: 50px;
}
.container {
  max-width: 1300px;
  border: 2px solid red;
  margin: auto;
  display: grid;
  grid-template-columns: 3fr 10fr;
}
.input-with-select {
  width: 800px;
  height: 50px;
}
.grid-layout {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
}
.filter-item {
  background-color: white;
  margin: 10px 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: large;
}
</style>