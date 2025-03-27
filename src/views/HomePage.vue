<script setup lang="ts">
import DialogMuonSach from "@/components/HomePage/DialogMuonSach.vue";
import DialogChiTietMuonSach from "@/components/HomePage/DialogChiTietMuonSach.vue";
import DialogChangePassword from "@/components/HomePage/DialogChangePassword.vue";
import DialogUpdate from "@/components/HomePage/DialogUpdate.vue";
import Footer from "@/components/Footer.vue";
import nhaXuatBanService from "@/services/nhaXuatBan.service";
import sachService from "@/services/sach.service";
import { useAuthStore } from "@/stores/counter";
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";
import router from "@/router";

const { logout, getRole } = useAuthStore();

const search = ref("");
const MANXB = ref([]);
const sort = ref("asc");
const page = ref(1);
const limit = ref(10);

const data = ref([]);
const loading = ref(false);
const total = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const danhSachNXB = ref([]);
//logic muon sach
const dialogMuon = ref(false);
const selectedSach = ref({});
const handleMuonSach = (item) => {
  dialogMuon.value = true;
  selectedSach.value = item;
};
const { isAuthenticated } = useAuthStore();
//Logic chi tiết muon sach
const dialogChiTietMuon = ref(false);
const dialogChangePassword = ref(false);
const dialogUpdate = ref(false);
const fetchNXB = async () => {
  try {
    const res = await nhaXuatBanService.getAllNoPagination();
    danhSachNXB.value = res;
  } catch (er) {
    console.error(er);
  }
};
onMounted(() => {
  fetchNXB();
  fetchData();
});
watch([currentPage, sort, search, MANXB], () => {
  fetchData();
});
const fetchData = async () => {
  loading.value = true; // Bắt đầu tải dữ liệu
  try {
    const res = await sachService.getAll(
      currentPage.value,
      10,
      search.value,
      MANXB.value,
      sort.value
    );
    data.value = res.data;
    total.value = res.total;
    totalPages.value = res.totalPages;
    currentPage.value = res.currentPage;
    console.log(data.value);
  } catch (er) {}
};
function setPage(page) {
  currentPage.value = page;
  // fetchData();
}
</script>

<template>
  <header>
    <div class="logo">
      <img src="/src/assets/ctu.png" alt="" width="80" />
      <h1>THUÊ SÁCH CTU</h1>
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
    <div v-if="isAuthenticated">
      <el-dropdown style="border: none">
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          Hello friend
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">Đăng xuất</el-dropdown-item>
            <el-dropdown-item
              v-if="getRole !== 'admin'"
              @click="dialogChangePassword = true"
              >Thay đổi mật khẩu</el-dropdown-item
            >
            <el-dropdown-item
              v-if="getRole !== 'admin'"
              @click="dialogChiTietMuon = true"
              >Xem chi tiết mượn</el-dropdown-item
            >
            <el-dropdown-item
              v-if="getRole !== 'admin'"
              @click="dialogUpdate = true"
              >Cập nhật thông tin</el-dropdown-item
            >
            <el-dropdown-item
              v-if="getRole == 'admin'"
              @click="router.push('/admin')"
              >Admin page</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div v-else>
      <el-button type="primary" @click="router.push('/auth')">Login</el-button>
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
        <h1 style="margin-left: 20px">Nhà xuất bản</h1>
        <el-checkbox-group v-model="MANXB" size="large" class="check-box-group">
          <el-checkbox-button
            class="filter-item"
            v-for="item in danhSachNXB"
            :key="item._id"
            :value="item.MANXB"
          >
            {{ item.TENNXB }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div>
        <div style="display: flex; justify-content: end; margin: 10px 20px">
          <el-select
            v-model="sort"
            placeholder="Select"
            size="large"
            style="width: 240px"
          >
            <el-option label="Tăng dần" value="asc" />
            <el-option label="Giảm dần" value="desc" />
          </el-select>
        </div>

        <div class="grid-layout">
          <el-card
            style="max-width: 480px"
            v-for="item in data"
            :key="item._id"
            @click="handleMuonSach(item)"
            :class="item.SOQUYEN == 0 || getRole == 'admin' ? 'disabled' : ''"
          >
            <template #header>{{ item.TENSACH }}</template>
            <div style="display: flex; justify-content: space-between">
              <div>
                <p>Số quyển: {{ item.SOQUYEN }}</p>
                <p>Năm xuất bản: {{ item.NAMXUATBAN }}</p>
                <p>Gía tiền : {{ item.DONGIA }}</p>
                <p>Tác giả : {{ item.NGUONGOC_TACGIA }}</p>
              </div>
              <img
                :src="`http://localhost:3000/images/${item.IMAGEURL}`"
                style="width: 70px"
              />
            </div>
          </el-card>
        </div>
      </div>
    </el-container>
    <div style="display: flex; justify-content: center">
      <el-pagination
        background
        layout="prev, pager, next"
        page-size="10"
        :current-page="currentPage"
        :total="total"
        @current-change="setPage"
      />
    </div>
  </main>
  <DialogMuonSach
    @close-dialog="dialogMuon = false"
    :dialogVisible="dialogMuon"
    :sach="selectedSach"
    v-if="isAuthenticated"
  />

  <DialogChiTietMuonSach
    @close-dialog="dialogChiTietMuon = false"
    :dialogFormVisible="dialogChiTietMuon"
  />

  <DialogUpdate
    @close-dialog="dialogUpdate = false"
    :dialogFormVisible="dialogUpdate"
  />
  <DialogChangePassword
    @close-dialog="dialogChangePassword = false"
    :dialogFormVisible="dialogChangePassword"
  />
  <Footer></Footer>
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
  min-height: 80vh;
  width: 100%;
  padding-top: 50px;
}
.container {
  max-width: 1300px;
  /* border: 2px solid red; */
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

.check-box-group {
  display: flex;
  flex-direction: column;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
<style>
.filter-item span {
  width: 100% !important;
}
</style>