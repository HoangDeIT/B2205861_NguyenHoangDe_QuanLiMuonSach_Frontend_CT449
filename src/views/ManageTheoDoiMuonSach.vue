<template>
  <el-radio-group v-model="radio1" size="large">
    <el-radio-button label="Chưa trả" :value="false" />
    <el-radio-button label="Trả rồi" :value="true" />
  </el-radio-group>
  <el-table :data="data" border style="width: 100%">
    <el-table-column prop="NGAYMUON" label="Ngày mượn" />
    <el-table-column prop="NGAYTRA" label="Ngày trả">
      <template v-slot="scope">
        <el-tag type="success" v-if="scope.row.NGAYTRA"
          >Đã trả vao {{ scope.row.NGAYTRA }}</el-tag
        >
        <el-tag type="warning" v-else>Chưa</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="HoTenDocGia" label="Ho ten doc gia" />
    <el-table-column prop="TenSach" label="Ten Sach" />

    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-popconfirm
          title="Bạn chắc chắn muốn xóa?"
          @confirm="handleDelete(scope.row)"
        >
          <template #reference>
            <el-button link type="danger" size="small" v-if="scope.row.NGAYTRA">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-popconfirm>

        <el-popconfirm
          @confirm="handleTraSach(scope.row)"
          title="Trả sách cho user này?"
        >
          <template #reference>
            <el-button type="primary" round v-if="!scope.row.NGAYTRA"
              >Trả sách</el-button
            >
          </template>
        </el-popconfirm>
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
import { reactive, ref, onMounted, watch, watchEffect } from "vue";
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import DialogTheoDoiMuonSach from "@/components/ManageTheoDoiMuonSach/DialogTheoDoiMuonSach.vue";
import TheoDoiMuonSachService from "@/services/theoDoiMuonSach.service";
import { ElMessage } from "element-plus";

const data = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(0);

const dialogFormVisible = ref(false);
const muonUpdate = reactive({});
//filter
const radio1 = ref(false);
function setPage(page) {
  currentPage.value = page;
  fetchData();
}

watch(radio1, () => {
  currentPage.value = 1;
  fetchData();
});

async function fetchData() {
  const res = await TheoDoiMuonSachService.getAll(
    currentPage.value,
    pageSize.value,
    radio1.value
  );
  console.log(res);
  data.value = res.data;
  total.value = res.total;
  totalPages.value = res.totalPages;
}

// function handleOpenCreate() {
//   dialogFormVisible.value = true;
//   Object.keys(muonUpdate).forEach((key) => {
//     muonUpdate[key] = ""; // Hoặc giá trị mặc định bạn muốn
//   });
// }
const handleTraSach = async (id) => {
  try {
    await TheoDoiMuonSachService.postTraSach(id._id);
    ElMessage.success("Trả sách thành công");
    await fetchData();
  } catch (error) {
    ElMessage.error(error.response.data.message || "Lỗi trả sách thất bại");
  }
};

function handleOpenUpdate(row) {
  dialogFormVisible.value = true;
  Object.assign(muonUpdate, row);
}

async function handleCreate(payload) {
  try {
    await TheoDoiMuonSachService.create(payload);
    ElMessage.success("Tạo thành công");
    fetchData();
  } catch (error) {
    ElMessage.error(error.response.data.message || "Lỗi tạo thất bại");
  }
}

async function handleUpdate(payload) {
  try {
    await TheoDoiMuonSachService.update(payload);
    ElMessage.success("Cập nhật thành công");
    fetchData();
  } catch (error) {
    ElMessage.error(error.response.data.message || "Lỗi cập nhật thất bại");
  }
}

async function handleDelete(row) {
  try {
    await TheoDoiMuonSachService.delete(row._id);
    ElMessage.success("Xóa thành công");
    fetchData();
  } catch (error) {
    ElMessage.error(error.response.data.message || "Lỗi xóa thất bại");
  }
}

onMounted(fetchData);
</script>

