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
    </el-table>
  </el-dialog>
</template>
<script setup>
import TheoDoiMuonSachService from "@/services/theoDoiMuonSach.service";
import { reactive, ref, watchEffect } from "vue";
const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  dialogFormVisible: Boolean,
});
const data = reactive({});
const fetchData = async () => {
  const res = await TheoDoiMuonSachService.chiTietMuonSachByUser();
  data.value = res;
};
watchEffect(() => {
  if (props.dialogFormVisible) {
    fetchData();
  }
});
</script>
