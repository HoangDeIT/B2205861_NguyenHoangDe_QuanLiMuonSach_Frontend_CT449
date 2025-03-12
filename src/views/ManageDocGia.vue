<template>
  <div class="btn-div">
    <el-button class="btn" plain @click="handleOpenCreate">
      Thêm Độc Giả
    </el-button>
  </div>

  <el-input
    v-model="search"
    placeholder="Tìm kiếm theo Điện Thoại"
    style="max-width: 400px"
  >
    <template #prepend>
      <el-button :icon="Search" />
    </template>
  </el-input>

  <el-table :data="data.value" border style="width: 100%">
    <el-table-column prop="HOLOT" label="Họ Lót" width="120" />
    <el-table-column prop="TEN" label="Tên" width="120" />
    <el-table-column prop="NGAYSINH" label="Ngày Sinh" width="150" />
    <el-table-column prop="PHAI" label="Phái" width="80" />
    <el-table-column prop="DIACHI" label="Địa chỉ" />
    <el-table-column prop="DIENTHOAI" label="ĐT" width="120" />

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
        <el-button
          link
          type="primary"
          size="small"
          @click="handleOpenDialogThemMuon(scope.row)"
        >
          Cho mượn sách
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click="handleOpenDialogXemChiTiet(scope.row)"
        >
          Chi tiết
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

  <DialogDocGia
    :dialogFormVisible="dialogFormVisible"
    :docGia="docGiaUpdate"
    @closeDialog="dialogFormVisible = false"
    @created="handleCreate"
    @updated="handleUpdate"
  />
  <DialogThemMuon
    :dialogFormVisible="dialogFormVisibleThemMuon"
    @closeDialog="dialogFormVisibleThemMuon = false"
    :doc-gia="docGiaSelected.value"
  />
  <DialogChiTietMuon
    :dialog-form-visible="dialogFormVisibleChiTietMuon"
    :id-doc-gia="idDocGiaChiTietMuon"
    @close-dialog="dialogFormVisibleChiTietMuon = false"
  />
</template>

<script  setup>
import { reactive, ref, onMounted, watch } from "vue";
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import DialogDocGia from "@/components/ManageDocGia/DialogDocGia.vue";
import DocGiaService from "@/services/docGia.service";
import DialogThemMuon from "@/components/ManageDocGia/DialogThemMuon.vue";
import DialogChiTietMuon from "@/components/ManageDocGia/DialogChiTietMuon.vue";

const data = reactive({ value: [] });
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const totalPages = ref(0);
const search = ref("");

const dialogFormVisible = ref(false);
const docGiaUpdate = reactive({});
const dialogFormVisibleThemMuon = ref(false);
const dialogFormVisibleChiTietMuon = ref(false);
const idDocGiaChiTietMuon = ref("");
const docGiaSelected = reactive({});
function setPage(page) {
  currentPage.value = page;
  fetchData();
}

watch(search, () => {
  currentPage.value = 1;
  fetchData();
});
const handleOpenDialogXemChiTiet = (row) => {
  dialogFormVisibleChiTietMuon.value = true;
  idDocGiaChiTietMuon.value = row._id;
};
const handleOpenDialogThemMuon = (row) => {
  console.log(row);
  docGiaSelected.value = row;
  dialogFormVisibleThemMuon.value = true;
};
async function fetchData() {
  const res = await DocGiaService.getAll(
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
  Object.keys(docGiaUpdate).forEach((key) => {
    docGiaUpdate[key] = ""; // Hoặc giá trị mặc định bạn muốn
  });
}

function handleOpenUpdate(row) {
  dialogFormVisible.value = true;
  Object.assign(docGiaUpdate, row);
}

async function handleCreate(payload) {
  await DocGiaService.create(payload);
  fetchData();
}

async function handleUpdate(payload) {
  await DocGiaService.update(payload);
  fetchData();
}

async function handleDelete(row) {
  await DocGiaService.delete(row._id);
  fetchData();
}

onMounted(fetchData);
</script>
