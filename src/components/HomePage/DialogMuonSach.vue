<template>
  <el-dialog
    @close="$emit('closeDialog')"
    v-model="props.dialogVisible"
    title="Tips"
    width="500"
  >
    <div style="text-align: center; margin-bottom: 20px">
      <h2 style="margin-bottom: 10px">
        Bạn có muốn mượn sách: <em>{{ sach.TENSACH }}</em
        >?
      </h2>
      <img
        width="300"
        height="400"
        :src="`http://localhost:3000/images/${sach.IMAGEURL}`"
        :alt="sach.TENSACH"
        style="
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        "
      />
      <div style="font-size: 16px; color: #555">
        <p><strong>Giá tiền:</strong> {{ sach.DONGIA }} VND</p>
        <p><strong>Năm xuất bản:</strong> {{ sach.NAMXUATBAN }}</p>
        <p><strong>Số quyển còn lại:</strong> {{ sach.SOQUYEN }}</p>
        <p><strong>Tác giả:</strong> {{ sach.NGUONGOC_TACGIA }}</p>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script  setup>
import theoDoiMuonSachService from "@/services/theoDoiMuonSach.service";
import { ElNotification } from "element-plus";
const props = defineProps({
  dialogVisible: Boolean,
  sach: { type: Object, default: {} },
});
const emit = defineEmits(["closeDialog"]);

const handleSubmit = async () => {
  try {
    const res = await theoDoiMuonSachService.MuonSachByUser(props.sach.MASACH);
    ElNotification.success({
      title: "Success",
      message: "Mượn thành công",
    });
    emit("closeDialog");
  } catch (error) {
    ElNotification.error({
      title: "Error",
      message: error.response?.data?.message || "An error occurred",
    });
  }
};
</script>
