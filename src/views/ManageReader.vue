<template>
  <div class="btn-div">
    <el-button class="btn" plain @click="handleOpenCreate">
      Add Staff
    </el-button>
  </div>
  <div>
    <el-input
      v-model="search"
      style="max-width: 600px"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
  <el-table :data="data.value" border style="width: 100%">
    <el-table-column prop="HoTenNV" label="Date" width="180" />
    <el-table-column prop="ChucVu" label="Name" width="180" />
    <el-table-column prop="DiaChi" label="Address" />
    <el-table-column prop="SoDienThoai" label="Address" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-popconfirm
          title="Are you sure to delete this?"
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
  <DialogStaff
    @close-dialog="dialogFormVisible = false"
    :dialogFormVisible="dialogFormVisible"
    :staff="staffUpdate.value"
    @nhan-vien-created="handleCreate"
    @nhan-vien-updated="handleUpdate"
  />
</template>

<script setup>
import DialogStaff from "@/components/ManageStaff/DialogStaff.vue";
import staffService from "@/services/staff.service";
import { Delete, Edit, Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, watch } from "vue";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const data = reactive({});
const staffUpdate = reactive({});
const total = ref(0);
const totalPages = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const search = ref("");
const setPage = (page) => {
  currentPage.value = page;
  fetchData();
};

const setSearch = (query) => {
  console.log(query);
  search.value = query;
  currentPage.value = 1; // Reset về trang đầu khi tìm kiếm
  fetchData();
};
watch(() => search.value, setSearch);
const fetchData = async () => {
  const res = await staffService.getAll(
    currentPage.value,
    pageSize.value,
    search.value
  );
  data.value = res.data;
  total.value = res.total;
  totalPages.value = res.totalPages;
  console.log(data.value);
};
const handleOpenCreate = () => {
  dialogFormVisible.value = true;
  staffUpdate.value = {};
};
const handleOpenUpdate = (data) => {
  console.log(staffUpdate);
  dialogFormVisible.value = true;
  staffUpdate.value = data;
};
onMounted(() => {
  fetchData();
});
const handleCreate = async (data) => {
  await staffService.create(data);
  fetchData();
};
const handleUpdate = async (data) => {
  await staffService.update(data);
  fetchData();
};
const handleDelete = async (data) => {
  await staffService.delete(data._id);
  fetchData();
};
</script>
<style scoped>
.btn-div {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
