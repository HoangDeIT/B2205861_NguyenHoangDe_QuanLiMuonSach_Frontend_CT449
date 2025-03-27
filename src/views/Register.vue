<template>
  <div class="container">
    <div class="form">
      <h2>Register User</h2>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
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
            <el-option label="Nam" value="male" />
            <el-option label="Nữ" value="female" />
          </el-select>
        </el-form-item>
        <el-form-item label="Địa chỉ" prop="DIACHI">
          <el-input v-model="ruleForm.DIACHI" />
        </el-form-item>
        <el-form-item label="Điện thoại" prop="DIENTHOAI">
          <el-input v-model="ruleForm.DIENTHOAI" />
        </el-form-item>
        <el-form-item label="Password" prop="Password">
          <el-input
            v-model="ruleForm.Password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Confirm Password" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          Already have an account?
          <router-link to="/auth"
            ><span style="color: blue">Login now</span></router-link
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="registerUser(ruleFormRef)">
            Register
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import {
  ElNotification,
  type FormInstance,
  type FormRules,
} from "element-plus";
import AuthService from "../services/auth.service";
import { useLocalStorage } from "@vueuse/core";
import router from "@/router";

const ruleFormRef = ref<FormInstance>();

const open1 = (data = "Success") => {
  ElNotification({
    title: "Success",
    message: data,
    type: "success",
  });
};
const open4 = (data = "Something went wrong") => {
  ElNotification({
    title: "Error",
    message: data,
    type: "error",
  });
};

const ruleForm = reactive({
  HOLOT: "",
  TEN: "",
  NGAYSINH: "",
  PHAI: "",
  DIACHI: "",
  DIENTHOAI: "",
  Password: "",
  checkPass: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  HOLOT: [{ required: true, message: "Vui lòng nhập Họ lót", trigger: "blur" }],
  TEN: [{ required: true, message: "Vui lòng nhập Tên", trigger: "blur" }],
  NGAYSINH: [
    {
      validator: (rule, value) => {
        if (new Date(value).getTime() > new Date().getTime()) {
          return false;
        }
        return true;
      },
      message: "Ngày Sinh không được lớn hơn ngày hôm nay",
      trigger: "blur",
    },
  ],
  PHAI: [{ required: true, message: "Vui lòng chọn Phái", trigger: "change" }],
  DIACHI: [
    { required: true, message: "Vui lòng nhập Địa chỉ", trigger: "blur" },
  ],
  DIENTHOAI: [
    { required: true, message: "Vui lòng nhập Điện thoại", trigger: "blur" },
  ],
  Password: [
    { required: true, message: "Vui lòng nhập Password", trigger: "blur" },
  ],
  checkPass: [
    { required: true, message: "Vui lòng nhập lại Password", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.Password) {
          callback(new Error("Mật khẩu không khớp"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const registerUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        const res = await AuthService.register({
          HOLOT: ruleForm.HOLOT,
          TEN: ruleForm.TEN,
          NGAYSINH: ruleForm.NGAYSINH,
          PHAI: ruleForm.PHAI,
          DIACHI: ruleForm.DIACHI,
          DIENTHOAI: ruleForm.DIENTHOAI,
          Password: ruleForm.Password,
        });
        console.log(res);
        open1("Đăng ký tạo tài khoản thành công");
        router.push("/auth");
      } catch (error) {
        open4(error.response.data.message);
      }
    } else {
      console.log("error submit!");
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aliceblue;
}
.form {
  border: 1px solid #9ea2ac;
  padding: 100px;
  background: white;
  border-radius: 20px;
}
</style>

