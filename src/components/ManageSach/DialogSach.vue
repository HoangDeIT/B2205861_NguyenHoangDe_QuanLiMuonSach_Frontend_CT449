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
        <el-input type="number" v-model="ruleForm.SOQUYEN" />
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
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3000/api/v1/uploads/sach"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="image"
    >
      <img
        v-if="imageUrl"
        :src="`http://localhost:3000/images/${imageUrl}`"
        class="avatar"
        @click="removeImage"
      />

      <el-icon v-else class="avatar-uploader-icon"
        ><Plus /> Upload image</el-icon
      >
    </el-upload>
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
import { onMounted, reactive, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import nhaXuatBanService from "@/services/nhaXuatBan.service";

import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
  dialogFormVisible: Boolean,
  sach: { type: Object, default: {} },
});

const emit = defineEmits(["closeDialog", "created", "updated"]);
const selectedNXB = ref(""); // Hiển thị tên NXB
const danhSachNXB = ref([]); // Lưu danh sách NXB
const ruleFormRef = ref();
const imageUrl = ref("");

const ruleForm = reactive({
  _id: "",
  TENSACH: "",
  DONGIA: "",
  SOQUYEN: 1,
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
    selectedNXB.value =
      danhSachNXB.value[
        danhSachNXB.value.findIndex((d) => d.MANXB === props.sach.MANXB)
      ]?.TENNXB;
    danhSachNXB.value.map((d) => console.log(d.MANXB));
    if (props?.sach?.IMAGEURL && props.sach.IMAGEURL.length > 0)
      imageUrl.value = props?.sach?.IMAGEURL || "";
    else imageUrl.value = null;
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
      MANXB: nxb.MANXB, // Lưu mã NXB
    }));
  cb(results);
};
const rules = reactive({
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

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
function submitForm(formEl) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (ruleForm._id)
        emit("updated", { ...ruleForm, IMAGEURL: imageUrl.value });
      else emit("created", { ...ruleForm, IMAGEURL: imageUrl.value });
      handleClose();
    }
  });
}

//img
const handleAvatarSuccess = (response, uploadFile) => {
  imageUrl.value = response.imageUrl;
};
const removeImage = () => {
  imageUrl.value = "";
};
const beforeAvatarUpload = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/jpg" &&
    rawFile.type !== "image/png"
  ) {
    ElMessage.error("Avatar picture must be JPG or PNG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
</script>
<style scoped>
.avatar-uploader {
  display: flex;
  justify-content: center;
  border: 1px solid #9ea2ac;
  padding: 5px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

