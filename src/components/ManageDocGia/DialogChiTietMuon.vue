<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Chi Tiết Sách Mượn"
    width="500"
    @close="emit('closeDialog')"
  >
    <el-table :data="data.value" style="width: 100%">
      <el-table-column prop="NGAYMUON" label="Tên Sách" width="180" />
      <el-table-column prop="TENSACH" label="Tác Giả" width="180" />
      <el-table-column prop="TENDOCGIA" label="Ngày Mượn" width="150" />
      <el-table-column prop="returnDate" label="Ngày Trả" width="150" />
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
