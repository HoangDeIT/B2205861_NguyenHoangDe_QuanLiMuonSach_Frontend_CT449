<template>
  <div class="btn-div">
    <el-button class="btn" plain @click="handleOpenCreate">Thêm Sách</el-button>
  </div>

  <el-input
    v-model="search"
    placeholder="Tìm kiếm theo Tên sách"
    style="max-width: 400px"
  >
    <template #prepend>
      <el-button :icon="Search" />
    </template>
  </el-input>

  <el-table :data="data.value" border style="width: 100%">
    <el-table-column prop="MASACH" label="Mã sách" width="90" />
    <el-table-column prop="TENSACH" label="Tên sách" width="180" />
    <el-table-column prop="DONGIA" label="Đơn giá" width="100" />
    <el-table-column prop="SOQUYEN" label="Số quyển" width="100" />
    <el-table-column prop="NAMXUATBAN" label="Năm XB" width="100" />
    <el-table-column label="Mã NXB" width="120">
      <template #default="{ row }">
        {{
          danhSachNXB.find((nxb) => nxb.MANXB === row.MANXB)?.TENNXB ||
          "Không xác định"
        }}
      </template>
    </el-table-column>
    <el-table-column prop="NGUONGOC_TACGIA" label="Tác giả/Nguồn gốc" />

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

  <div class="example-pagination-block">
    <el-pagination
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="setPage"
    />
  </div>

  <DialogSach
    :dialogFormVisible="dialogFormVisible"
    :sach="sachUpdate"
    @closeDialog="dialogFormVisible = false"
    @created="handleCreate"
    @updated="handleUpdate"
  />
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import DialogSach from "@/components/ManageSach/DialogSach.vue";
import SachService from "@/services/sach.service";
import nhaXuatBanService from "@/services/nhaXuatBan.service";
import { ElMessage } from "element-plus";

const data = reactive({ value: [] });
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(0);
const search = ref("");
const danhSachNXB = ref([]); // Lưu danh sách NXB

const dialogFormVisible = ref(false);
const sachUpdate = reactive({});

function setPage(page) {
  currentPage.value = page;
  fetchData();
}
const fetchNXB = async () => {
  const res = await nhaXuatBanService.getAll();
  danhSachNXB.value = res.data;
};
onMounted(fetchNXB);
watch(search, () => {
  currentPage.value = 1;
  fetchData();
});

async function fetchData() {
  const res = await SachService.getAll(
    currentPage.value,
    pageSize.value,
    search.value
  );
  data.value = res.data;
  total.value = res.total;
  totalPages.value = res.totalPages;
}

function handleOpenCreate() {
  Object.keys(sachUpdate).forEach((key) => {
    sachUpdate[key] = ""; // Hoặc giá trị mặc định bạn muốn
  });
  dialogFormVisible.value = true;
}

function handleOpenUpdate(row) {
  Object.assign(sachUpdate, row);
  dialogFormVisible.value = true;
}

async function handleCreate(payload) {
  try {
    await SachService.create(payload);
    fetchData();
    ElMessage.success("Tạo thành công");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "Tạo thất bại");
  }
}

async function handleUpdate(payload) {
  try {
    await SachService.update(payload);
    fetchData();
    ElMessage.success("Cập nhật thành công");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "Cập nhật thất bại");
  }
}

async function handleDelete(row) {
  try {
    await SachService.delete(row._id);
    fetchData();
    ElMessage.success("Xóa thành công");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "xóa thất bại");
  }
}

onMounted(fetchData);
</script>
