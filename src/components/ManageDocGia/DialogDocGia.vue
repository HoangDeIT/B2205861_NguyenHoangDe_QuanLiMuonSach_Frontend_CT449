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

      <el-form-item label="Mật khẩu" prop="Password">
        <el-input
          v-model="ruleForm.Password"
          type="password"
          autocomplete="off"
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

<script  setup>
import { reactive, ref, watchEffect } from "vue";

const props = defineProps({
  dialogFormVisible: Boolean,
  docGia: { type: Object, default: {} },
});

const emit = defineEmits(["closeDialog", "created", "updated"]);

const ruleFormRef = ref();
const ruleForm = reactive({
  _id: "",
  HOLOT: "",
  TEN: "",
  NGAYSINH: "",
  PHAI: "",
  DIACHI: "",
  DIENTHOAI: "",
  Password: "",
  MADOCGIA: "",
});
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
const rules = reactive({
  HOLOT: [{ required: true, message: "Vui lòng nhập Họ lót", trigger: "blur" }],
  TEN: [{ required: true, message: "Vui lòng nhập Tên", trigger: "blur" }],
  DIENTHOAI: [{ required: true, message: "Vui lòng nhập ĐT", trigger: "blur" }],
  // ... Thêm các rule khác nếu cần
});

watchEffect(() => {
  if (props.docGia) {
    console.log(props.docGia);
    ruleForm._id = props.docGia._id ?? "";
    ruleForm.HOLOT = props.docGia.HOLOT ?? "";
    ruleForm.TEN = props.docGia.TEN ?? "";
    ruleForm.NGAYSINH = props.docGia.NGAYSINH ?? "";
    ruleForm.PHAI = props.docGia.PHAI ?? "";
    ruleForm.DIACHI = props.docGia.DIACHI ?? "";
    ruleForm.DIENTHOAI = props.docGia.DIENTHOAI ?? "";
    ruleForm.MADOCGIA = props.docGia.MADOCGIA ?? "";
    ruleForm.Password = "";
  }
  if (props.dialogFormVisible) {
    rules.Password = [
      {
        required: ruleForm._id === "",
        message: "Vui nhập mật khẩu",
        trigger: "blur",
      },
    ];
  }
});

function handleClose() {
  resetForm(ruleFormRef.value);
  emit("closeDialog");
}

function submitForm(formEl) {
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

