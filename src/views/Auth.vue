<template>
  <div class="container">
    <div class="form">
      <h2>Login {{ ruleForm.type }}</h2>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          :label="ruleForm.type === 'user' ? 'Số điện thoại' : 'MANV'"
          prop="age"
        >
          <el-input v-model="ruleForm.MANV" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Loại tài khoản">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="user">User</el-radio>
            <el-radio label="admin">Admin</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="ruleForm.type === 'user'">
          Chưa có tài khoản?
          <router-link to="/register"
            ><span style="color: blue">Đăng kí ngay</span></router-link
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Submit
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
import { useAuthStore } from "@/stores/counter";
import { ca } from "element-plus/es/locale";

const ruleFormRef = ref<FormInstance>();

const { login, access_token } = useAuthStore();
const open1 = () => {
  ElNotification({
    title: "Success",
    message: "This is a success message",
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
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.pass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass");
    }
    callback();
  }
};

const ruleForm = reactive({
  pass: "",
  MANV: "",
  type: "user",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  MANV: [{ required: true, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      let res;
      if (ruleForm.type === "user") {
        try {
          res = await AuthService.loginWithUser({
            phone: ruleForm.MANV,
            password: ruleForm.pass,
          });
          login(res.access_token, "user");
        } catch (error) {
          open4(error?.response?.data?.message ?? "Something went wrong");
        }
      } else {
        try {
          res = await AuthService.login({
            MANV: ruleForm.MANV,
            password: ruleForm.pass,
          });
          login(res.access_token, "admin");
        } catch (error) {
          open4(error?.response?.data?.message ?? "Something went wrong");
        }
      }
      if (res.access_token) {
        open1();
      } else {
        open4(res.message);
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
