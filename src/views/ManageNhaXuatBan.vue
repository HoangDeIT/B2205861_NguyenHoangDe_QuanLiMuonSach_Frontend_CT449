<template>
  <div class="btn-div">
    <el-button class="btn" plain @click="handleOpenCreate">Thêm NXB</el-button>
  </div>

  <div>
    <el-input
      v-model="search"
      placeholder="Tìm kiếm theo Tên NXB"
      style="max-width: 400px"
      class="input-with-select"
    >
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>

  <el-table :data="data.value" border style="width: 100%">
    <el-table-column prop="MANXB" label="Mã NXB" width="80" />

    <el-table-column prop="TENNXB" label="Tên NXB" width="180" />
    <el-table-column prop="DIACHI" label="Địa Chỉ" />

    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-popconfirm
          title="Bạn chắc chắn muốn xóa?"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button link type="danger" size="small">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-popconfirm>

        <el-button
          link
          type="primary"
          size="small"
          @click="handleOpenUpdate(scope.row)"
        >
          <el-icon><Edit /></el-icon>
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- Phân trang -->
  <div class="example-pagination-block">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="setPage"
    />
  </div>

  <!-- Dialog NXB -->
  <DialogNhaXuatBan
    :dialogFormVisible="dialogFormVisible"
    :nxb="nxbUpdate"
    @closeDialog="dialogFormVisible = false"
    @created="handleCreate"
    @updated="handleUpdate"
  />
</template>

<script  setup>
import { reactive, ref, onMounted, watch } from "vue";
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import DialogNhaXuatBan from "@/components/ManageNhaXuatBan/DialogNhaXuatBan.vue";
import NhaXuatBanService from "@/services/nhaXuatBan.service";
import { ElMessage } from "element-plus";

const data = reactive({ value: [] });
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(0);
const search = ref("");

const dialogFormVisible = ref(false);
const nxbUpdate = reactive({});

function setPage(page) {
  currentPage.value = page;
  fetchData();
}

watch(search, () => {
  currentPage.value = 1; // Reset về trang 1 khi tìm kiếm
  fetchData();
});

async function fetchData() {
  const res = await NhaXuatBanService.getAll(
    currentPage.value,
    pageSize.value,
    search.value
  );
  data.value = res.data;
  total.value = res.total;
  totalPages.value = res.totalPages;
}

function handleOpenCreate() {
  dialogFormVisible.value = true;
  Object.keys(nxbUpdate).forEach((key) => {
    nxbUpdate[key] = ""; // Hoặc giá trị mặc định bạn muốn
  });
}

function handleOpenUpdate(row) {
  dialogFormVisible.value = true;
  Object.assign(nxbUpdate, row); // Gán dữ liệu cần sửa
}

async function handleCreate(payload) {
  try {
    await NhaXuatBanService.create(payload);
    fetchData();
    ElMessage.success("Tạo thành công");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "Thêm thất bại");
  }
}

async function handleUpdate(payload) {
  try {
    await NhaXuatBanService.update(payload);
    fetchData();
    ElMessage.success("Cập nhật thành công");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "Cập nhật thất bại");
  }
}

async function handleDelete(row) {
  try {
    await NhaXuatBanService.delete(row._id);
    fetchData();
    ElMessage.success("Xóa thành công");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "Xóa thất bại");
  }
}

onMounted(fetchData);
</script>

<style scoped>
.btn-div {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
