<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Chi Tiết Sách Mượn"
    width="500"
    @close="emit('closeDialog')"
  >
    <el-table :data="data.value" style="width: 100%">
      <el-table-column prop="TENSACH" label="Tên Sách" width="180" />
      <el-table-column prop="NGAYTRA" label="Ngày Trả" width="150">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.NGAYTRA"
            >Đã trả vao {{ scope.row.NGAYTRA }}</el-tag
          >
          <el-tag type="warning" v-else>Chưa</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Tra sach" prop="NGAYTRA">
        <template #default="scope">
          <el-popconfirm
            @confirm="handleTraSach(scope.row)"
            title="Are you sure to delete this?"
          >
            <template #reference>
              <el-button type="primary" round v-if="!scope.row.NGAYTRA"
                >Tra sach</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script setup>
import TheoDoiMuonSachService from "@/services/theoDoiMuonSach.service";
import { reactive, ref, watchEffect } from "vue";
const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  dialogFormVisible: Boolean,
  idDocGia: Number,
});
const data = reactive({});
const fetchData = async () => {
  const res = await TheoDoiMuonSachService.getDocGiaById(props.idDocGia);
  data.value = res;
};
const handleTraSach = async (id) => {
  await TheoDoiMuonSachService.postTraSach(id._id);
  fetchData();
};
watchEffect(() => {
  if (props.idDocGia) {
    fetchData();
  }
  if (props.dialogFormVisible) {
    //pass
  }
});

const handleClose = () => {
  // Handle dialog close event
};
</script>
