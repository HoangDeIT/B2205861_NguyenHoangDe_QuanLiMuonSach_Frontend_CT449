<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Sách"
    width="500"
    @close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="id" prop="_id" v-show="false">
        <el-input v-model="ruleForm._id" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Tên sách" prop="TENSACH">
        <el-input v-model="ruleForm.TENSACH" />
      </el-form-item>

      <el-form-item label="Đơn giá" prop="DONGIA">
        <el-input v-model="ruleForm.DONGIA" />
      </el-form-item>

      <el-form-item label="Số quyển" prop="SOQUYEN">
        <el-input v-model="ruleForm.SOQUYEN" />
      </el-form-item>

      <el-form-item label="Năm XB" prop="NAMXUATBAN">
        <el-input v-model="ruleForm.NAMXUATBAN" />
      </el-form-item>

      <el-form-item label="Nguồn gốc/Tác giả" prop="NGUONGOC_TACGIA">
        <el-input v-model="ruleForm.NGUONGOC_TACGIA" />
      </el-form-item>
      <el-form-item label="Nhà xuat ban">
        <el-autocomplete
          v-model="selectedNXB"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          placeholder="Please Input"
          @select="handleSelect"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Confirm</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watchEffect } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import nhaXuatBanService from "@/services/nhaXuatBan.service";
import { da } from "element-plus/es/locale";

const props = defineProps({
  dialogFormVisible: Boolean,
  sach: { type: Object, default: {} },
});

const emit = defineEmits(["closeDialog", "created", "updated"]);
const selectedNXB = ref(""); // Hiển thị tên NXB
const danhSachNXB = ref([]); // Lưu danh sách NXB
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  _id: "",
  TENSACH: "",
  DONGIA: "",
  SOQUYEN: "",
  NAMXUATBAN: "",
  MANXB: "",
  NGUONGOC_TACGIA: "",
});
const fetchNXB = async () => {
  const res = await nhaXuatBanService.getAll();
  danhSachNXB.value = res.data;
};
onMounted(fetchNXB);
watchEffect(() => {
  if (props?.sach?._id) {
    selectedNXB.value =
      danhSachNXB.value.find((nxb) => nxb._id === props.sach.MANXB)?.TENNXB ||
      "";
  } else {
    selectedNXB.value = "";
  }
  if (props.sach) {
    ruleForm._id = props.sach._id || "";
    ruleForm.TENSACH = props.sach.TENSACH || "";
    ruleForm.DONGIA = props.sach.DONGIA || "";
    ruleForm.SOQUYEN = props.sach.SOQUYEN || "";
    ruleForm.NAMXUATBAN = props.sach.NAMXUATBAN || "";
    ruleForm.MANXB = props.sach.MANXB || "";
    ruleForm.NGUONGOC_TACGIA = props.sach.NGUONGOC_TACGIA || "";

    // Kiểm tra khi props.dialogFormVisible thay đổi
    if (props.dialogFormVisible) {
      // Nếu dialogFormVisible thay đổi, bạn có thể thực hiện các hành động khác ở đây nếu cần.
      console.log("Dialog Form Visible changed: ", props.dialogFormVisible);
    }
  }
});

const handleSelect = (item) => {
  ruleForm.MANXB = item.MANXB;
  selectedNXB.value = item.value;
};

const querySearch = (queryString, cb) => {
  const results = danhSachNXB.value
    .filter((nxb) =>
      nxb.TENNXB.toLowerCase().includes(queryString.toLowerCase())
    )
    .map((nxb) => ({
      value: nxb.TENNXB, // Hiển thị tên NXB
      MANXB: nxb._id, // Lưu mã NXB
    }));
  cb(results);
};
const rules = reactive<FormRules<typeof ruleForm>>({
  TENSACH: [
    { required: true, message: "Vui lòng nhập Tên sách", trigger: "blur" },
  ],
  // ... Các rule khác nếu cần
});

function handleClose() {
  selectedNXB.value = "";
  resetForm(ruleFormRef.value);
  emit("closeDialog");
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (ruleForm._id) emit("updated", { ...ruleForm });
      else emit("created", { ...ruleForm });
      handleClose();
    }
  });
}
</script>
