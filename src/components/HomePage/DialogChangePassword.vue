<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    @close="emit('closeDialog')"
    title="Đổi mật khẩu"
    width="500"
  >
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item
        label="Mật khẩu cũ"
        :label-width="formLabelWidth"
        prop="oldPassword"
      >
        <el-input
          v-model="form.oldPassword"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="Mật khẩu mới"
        :label-width="formLabelWidth"
        prop="newPassword"
      >
        <el-input
          v-model="form.newPassword"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="Xác nhận mật khẩu"
        :label-width="formLabelWidth"
        prop="confirmPassword"
      >
        <el-input
          v-model="form.confirmPassword"
          type="password"
          show-password
          autocomplete="off"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('closeDialog')">Hủy</el-button>
        <el-button type="primary" @click="submitForm">Xác nhận</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import docGiaService from "@/services/docGia.service";

const formLabelWidth = "140px";
const ruleFormRef = ref(null);
const props = defineProps({
  dialogFormVisible: Boolean,
});
const form = reactive({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const emit = defineEmits(["closeDialog"]);

// ✅ Định nghĩa validation rules
const rules = {
  oldPassword: [
    { required: true, message: "Vui lòng nhập mật khẩu cũ", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "Vui lòng nhập mật khẩu mới", trigger: "blur" },
    { min: 8, message: "Mật khẩu phải ít nhất 8 ký tự", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "Vui lòng xác nhận mật khẩu", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.newPassword) {
          callback(new Error("Mật khẩu xác nhận không khớp!"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
const resetForm = () => {
  form.oldPassword = "";
  form.newPassword = "";
  form.confirmPassword = "";
  ruleFormRef.value?.resetFields();
};
// ✅ Xử lý khi nhấn nút "Xác nhận"
const submitForm = async () => {
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await docGiaService.changePassword(form);
        if (!res.message) {
          ElMessage.success("Đổi mật khẩu thành công!");
          // Đóng dialog sau khi đổi mật khẩu thành công
          resetForm();
          emit("closeDialog");
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        ElMessage.error(error.response.data.message);
      }
    } else {
      ElMessage.error("Vui lòng kiểm tra lại thông tin!");
    }
  });
};
</script>
