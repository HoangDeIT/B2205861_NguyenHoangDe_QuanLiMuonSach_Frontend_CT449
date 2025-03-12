<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Nhà Xuất Bản"
    width="500"
    @close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <!-- Ẩn _id nếu có -->
      <el-form-item label="id" prop="_id" v-show="false">
        <el-input v-model="ruleForm._id" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Tên NXB" prop="TENNXB">
        <el-input v-model="ruleForm.TENNXB" />
      </el-form-item>

      <el-form-item label="Địa chỉ" prop="DIACHI">
        <el-input v-model="ruleForm.DIACHI" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps({
  dialogFormVisible: Boolean,
  nxb: { type: Object, default: {} },
});

const emit = defineEmits(["closeDialog", "created", "updated"]);

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  _id: "",
  TENNXB: "",
  DIACHI: "",
});

// Gán dữ liệu khi mở Dialog để sửa
watchEffect(() => {
  if (props.nxb) {
    ruleForm._id = props.nxb._id || "";
    ruleForm.TENNXB = props.nxb.TENNXB || "";
    ruleForm.DIACHI = props.nxb.DIACHI || "";
  }
  if (props.dialogFormVisible) {
    //pass
  }
});

const rules = reactive<FormRules<typeof ruleForm>>({
  TENNXB: [
    { required: true, message: "Vui lòng nhập Tên NXB", trigger: "blur" },
  ],
  DIACHI: [
    { required: true, message: "Vui lòng nhập Địa chỉ", trigger: "blur" },
  ],
});

function handleClose() {
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
      if (ruleForm._id) {
        emit("updated", { ...ruleForm });
      } else {
        emit("created", { ...ruleForm });
      }
      handleClose();
    }
  });
}
</script>
