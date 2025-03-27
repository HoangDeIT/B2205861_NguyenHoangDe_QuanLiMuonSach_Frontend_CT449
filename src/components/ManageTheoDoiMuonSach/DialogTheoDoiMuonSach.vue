<template>
  <el-dialog
    v-model="props.dialogFormVisible"
    title="Theo Dõi Mượn Sách"
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
        <el-input v-model="ruleForm._id" />
      </el-form-item>

      <el-form-item label="Mã Độc Giả" prop="MADOCGIA">
        <el-input v-model="ruleForm.MADOCGIA" />
      </el-form-item>

      <el-form-item label="Mã Sách" prop="MASACH">
        <el-input v-model="ruleForm.MASACH" />
      </el-form-item>

      <el-form-item label="Ngày mượn" prop="NGAYMUON">
        <el-date-picker
          v-model="ruleForm.NGAYMUON"
          type="date"
          placeholder="Chọn ngày mượn"
        />
      </el-form-item>

      <el-form-item label="Ngày trả" prop="NGAYTRA">
        <el-date-picker
          v-model="ruleForm.NGAYTRA"
          type="date"
          placeholder="Chọn ngày trả"
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

<script setup>
import { reactive, ref, watchEffect } from "vue";

const props = defineProps({
  dialogFormVisible: Boolean,
  muon: { type: Object, default: {} },
});

const emit = defineEmits(["closeDialog", "created", "updated"]);

const ruleFormRef = ref();
const ruleForm = reactive({
  _id: "",
  MADOCGIA: "",
  MASACH: "",
  NGAYMUON: "",
  NGAYTRA: "",
});

watchEffect(() => {
  if (props.muon) {
    ruleForm._id = props.muon._id || "";
    ruleForm.MADOCGIA = props.muon.MADOCGIA || "";
    ruleForm.MASACH = props.muon.MASACH || "";
    ruleForm.NGAYMUON = props.muon.NGAYMUON || "";
    ruleForm.NGAYTRA = props.muon.NGAYTRA || "";
  }
});

const rules = reactive({
  MADOCGIA: [
    {
      required: true,
      message: "Vui lòng nhập Mã Độc Giả",
      trigger: "blur",
    },
  ],
  MASACH: [
    { required: true, message: "Vui lòng nhập Mã Sách", trigger: "blur" },
  ],
  NGAYMUON: [
    { required: true, message: "Vui lòng chọn Ngày mượn", trigger: "change" },
  ],
  NGAYTRA: [
    { required: true, message: "Vui lòng chọn Ngày trả", trigger: "change" },
  ],
});

function handleClose() {
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
