<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Nhân viên"
    width="500"
    @close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="Họ Tên" prop="HoTenNV">
        <el-input v-model="ruleForm.HoTenNV" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="Password">
        <el-input
          v-model="ruleForm.Password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="Chức vụ" prop="ChucVu">
        <el-select v-model="ruleForm.ChucVu" placeholder="Chọn chức vụ">
          <el-option label="Quản lý" value="QuanLy" />
          <el-option label="Nhân viên" value="NhanVien" />
        </el-select>
      </el-form-item>
      <el-form-item label="Địa chỉ" prop="DiaChi">
        <el-input v-model="ruleForm.DiaChi" />
      </el-form-item>
      <el-form-item label="Số điện thoại" prop="SoDienThoai">
        <el-input v-model="ruleForm.SoDienThoai" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Lưu
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
const props = defineProps({
  dialogFormVisible: {
    type: Boolean,
    default: false,
  },
  staff: {
    type: Object,
    default: "",
  },
});
import { reactive, ref, watch, watchEffect } from "vue";
import type { FormInstance, FormRules } from "element-plus";
const emit = defineEmits(["closeDialog", "nhanVienCreated", "nhanVienUpdated"]);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  _id: "",
  HoTenNV: "",
  Password: "",
  ChucVu: "",
  DiaChi: "",
  SoDienThoai: "",
});

let rules;
const validatePhone = (rule, value, callback) => {
  const phoneRegex = /^0\d{9}$/;
  if (!value) {
    callback(new Error("Vui lòng nhập số điện thoại"));
  } else if (!phoneRegex.test(value)) {
    callback(new Error("Số điện thoại không hợp lệ!"));
  } else {
    callback();
  }
};
watchEffect(() => {
  if (props.staff) {
    ruleForm._id = props.staff._id || "";
    ruleForm.HoTenNV = props.staff.HoTenNV || "";
    ruleForm.Password = "";
    ruleForm.ChucVu = props.staff.ChucVu || "";
    ruleForm.DiaChi = props.staff.DiaChi || "";
    ruleForm.SoDienThoai = props.staff.SoDienThoai || "";
  }
  if (props.dialogFormVisible) {
    //pass
    // rules;
  }
  rules = reactive<FormRules<typeof ruleForm>>({
    HoTenNV: [
      { required: true, message: "Vui lòng nhập họ tên", trigger: "blur" },
    ],
    Password: [
      {
        required: ruleForm._id === "",
        message: "Vui lòng nhập mật khẩu",
        trigger: "blur",
      },
    ],
    ChucVu: [
      { required: true, message: "Vui lòng chọn chức vụ", trigger: "change" },
    ],
    DiaChi: [
      { required: true, message: "Vui lòng nhập địa chỉ", trigger: "blur" },
    ],
    SoDienThoai: [{ validator: validatePhone, trigger: "blur" }],
  });
  console.log(">>>", ruleForm);
});

const handleClose = () => {
  emit("closeDialog");
  resetForm(ruleFormRef.value);
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm._id !== "");
      if (ruleForm._id === "") emit("nhanVienCreated", ruleForm);
      else emit("nhanVienUpdated", ruleForm);
      handleClose();
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>