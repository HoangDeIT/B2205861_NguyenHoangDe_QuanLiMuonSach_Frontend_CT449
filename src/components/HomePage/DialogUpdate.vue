<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Độc Giả"
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

      <el-form-item label="Họ Lót" prop="HOLOT">
        <el-input v-model="ruleForm.HOLOT" />
      </el-form-item>

      <el-form-item label="Tên" prop="TEN">
        <el-input v-model="ruleForm.TEN" />
      </el-form-item>

      <el-form-item label="Ngày Sinh" prop="NGAYSINH">
        <el-date-picker
          v-model="ruleForm.NGAYSINH"
          type="date"
          placeholder="Chọn ngày sinh"
          format="DD/MM/YYYY"
          value-format="DD/MM/YYYY"
        />
      </el-form-item>

      <el-form-item label="Phái" prop="PHAI">
        <el-select v-model="ruleForm.PHAI" placeholder="Chọn phái">
          <el-option label="Nam" value="Nam" />
          <el-option label="Nữ" value="Nữ" />
        </el-select>
      </el-form-item>

      <el-form-item label="Địa chỉ" prop="DIACHI">
        <el-input v-model="ruleForm.DIACHI" />
      </el-form-item>

      <el-form-item label="Điện thoại" prop="DIENTHOAI">
        <el-input v-model="ruleForm.DIENTHOAI" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('closeDialog')">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Updated</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import {
  ElNotification,
  type FormInstance,
  type FormRules,
} from "element-plus";
import docGiaService from "@/services/docGia.service";

const props = defineProps({
  dialogFormVisible: Boolean,
});
const open1 = () => {
  ElNotification({
    title: "Success",
    message: "This is a success message",
    type: "success",
  });
};
const emit = defineEmits(["closeDialog"]);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  _id: "",
  HOLOT: "",
  TEN: "",
  NGAYSINH: "",
  PHAI: "",
  DIACHI: "",
  DIENTHOAI: "",
  MADOCGIA: "",
});
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const fetchData = async () => {
  const res = await docGiaService.getByProfileUser();
  if (res._id) {
    ruleForm._id = res._id ?? "";
    ruleForm.HOLOT = res.HOLOT ?? "";
    ruleForm.TEN = res.TEN ?? "";
    ruleForm.NGAYSINH = res.NGAYSINH ?? "";
    ruleForm.PHAI = res.PHAI ?? "";
    ruleForm.DIACHI = res.DIACHI ?? "";
    ruleForm.DIENTHOAI = res.DIENTHOAI ?? "";
    ruleForm.MADOCGIA = res.MADOCGIA ?? "";
  }
};
watchEffect(() => {
  if (props.dialogFormVisible) {
    fetchData();
  }
});

const rules = reactive<FormRules<typeof ruleForm>>({
  HOLOT: [{ required: true, message: "Vui lòng nhập Họ lót", trigger: "blur" }],
  TEN: [{ required: true, message: "Vui lòng nhập Tên", trigger: "blur" }],
  DIENTHOAI: [{ required: true, message: "Vui lòng nhập ĐT", trigger: "blur" }],
  // ... Thêm các rule khác nếu cần
});

function handleClose() {
  resetForm(ruleFormRef.value);
  emit("closeDialog");
}

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await docGiaService.updateByUser(ruleForm);
        handleClose();
        if (!res.message) {
          open1();
        }
      } catch (error) {
        ElNotification.error({
          title: "Error",
          message: error.response?.data?.message || "An error occurred",
        });
      }
    }
  });
}
</script>

