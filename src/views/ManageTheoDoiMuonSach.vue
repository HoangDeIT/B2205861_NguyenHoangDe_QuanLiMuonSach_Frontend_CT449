<template>
  <div class="btn-div">
    <el-button class="btn" plain @click="handleOpenCreate">
      Thêm Lịch Mượn
    </el-button>
  </div>

  <el-input
    v-model="search"
    placeholder="Tìm kiếm theo Mã Sách (hoặc tùy bạn)"
    style="max-width: 400px"
  >
    <template #prepend>
      <el-button :icon="Search" />
    </template>
  </el-input>

  <el-table :data="data.value" border style="width: 100%">
    <el-table-column prop="NGAYMUON" label="Ngày mượn" />
    <el-table-column prop="NGAYTRA" label="Ngày trả" />
    <el-table-column prop="HoTenDocGia" label="Ho ten doc gia" />
    <el-table-column prop="TenSach" label="Ten Sach" />

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

  <DialogTheoDoiMuonSach
    :dialogFormVisible="dialogFormVisible"
    :muon="muonUpdate"
    @closeDialog="dialogFormVisible = false"
    @created="handleCreate"
    @updated="handleUpdate"
  />
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import DialogTheoDoiMuonSach from "@/components/ManageTheoDoiMuonSach/DialogTheoDoiMuonSach.vue";
import TheoDoiMuonSachService from "@/services/theoDoiMuonSach.service";

const data = reactive({ value: [] });
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(0);
const search = ref("");

const dialogFormVisible = ref(false);
const muonUpdate = reactive({});

function setPage(page) {
  currentPage.value = page;
  fetchData();
}

watch(search, () => {
  currentPage.value = 1;
  fetchData();
});

async function fetchData() {
  const res = await TheoDoiMuonSachService.getAll(
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
  Object.keys(muonUpdate).forEach((key) => {
    sachUpdate[key] = ""; // Hoặc giá trị mặc định bạn muốn
  });
}

function handleOpenUpdate(row) {
  dialogFormVisible.value = true;
  Object.assign(muonUpdate, row);
}

async function handleCreate(payload) {
  await TheoDoiMuonSachService.create(payload);
  fetchData();
}

async function handleUpdate(payload) {
  await TheoDoiMuonSachService.update(payload);
  fetchData();
}

async function handleDelete(row) {
  await TheoDoiMuonSachService.delete(row._id);
  fetchData();
}

onMounted(fetchData);
</script>
