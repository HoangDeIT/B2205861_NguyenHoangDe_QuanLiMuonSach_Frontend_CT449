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
      <el-form-item label="Tên độc giả">
        <el-input
          disabled
          :value="props.docGia.HOLOT + ' ' + props.docGia.TEN"
        />
      </el-form-item>

      <el-form-item label="Chọn sách">
        <el-autocomplete
          v-model="selectedSach"
          :fetch-suggestions="querySearchSach"
          clearable
          class="inline-input w-50"
          placeholder="Nhập tên sách"
          @select="handleSelectSach"
        />
      </el-form-item>

      <el-form-item label="Ngày mượn" prop="NGAYMUON">
        <el-date-picker
          v-model="ruleForm.NGAYMUON"
          type="date"
          placeholder="Chọn ngày mượn"
          format="DD/MM/YYYY"
          value-format="DD/MM/YYYY"
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
import { onMounted, reactive, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import sachService from "@/services/sach.service";
import theoDoiMuonSachService from "@/services/theoDoiMuonSach.service";

const props = defineProps({
  dialogFormVisible: Boolean,
  docGia: { type: Object, default: {} },
});

const emit = defineEmits(["closeDialog", "created", "updated"]);

const ruleFormRef = ref();
const ruleForm = reactive({
  MADOCGIA: "",
  MASACH: "",
  NGAYMUON: new Date(),
});
const sachs = ref([]);
watchEffect(() => {
  ruleForm.MADOCGIA = props.docGia.MADOCGIA;
});
const selectedSach = ref("");
const fetchSach = async () => {
  const res = await sachService.getAllNoPagination();
  console.log(res);
  sachs.value = res;
};
onMounted(fetchSach);

const querySearchSach = (queryString, cb) => {
  const results = sachs.value
    .filter((sach) =>
      sach.TENSACH.toLowerCase().includes(queryString.toLowerCase())
    )
    .map((sach) => ({
      value: sach.TENSACH, // Hiển thị tên sách
      MASACH: sach.MASACH, // Lưu mã sách
    }));
  cb(results);
};

// Khi chọn sách
const handleSelectSach = (item) => {
  ruleForm.MASACH = item.MASACH; // Lưu mã sách
  selectedSach.value = item.value; // Hiển thị tên sách
};
const rules = reactive({
  MASACH: [
    { required: true, message: "Vui lòng nhập Mã Sách", trigger: "blur" },
  ],
  // ... Thêm rule cho ngày mượn/trả nếu cần
});

function handleClose() {
  emit("closeDialog");
}

function submitForm(formEl) {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      console.log(ruleForm);
      try {
        await theoDoiMuonSachService.create(ruleForm);
        fetchSach();
        ElMessage.success("Thêm thành công");

        handleClose();
      } catch (error) {
        ElMessage.error(error.response.data.message || "Lỗi tạo thất bại");
      }
    }
  });
}
</script>
