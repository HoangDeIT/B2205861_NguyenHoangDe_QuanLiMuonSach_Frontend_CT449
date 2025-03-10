
<template>
  <div class="container">
    <div class="form">
      <h2>Login</h2>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="Phone number" prop="age">
          <el-input v-model="ruleForm.phoneNumber" />
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
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
import type { FormInstance, FormRules } from "element-plus";
import AuthService from "../services/auth.service";
import { useAuthStore } from "@/stores/counter";

const ruleFormRef = ref<FormInstance>();
const { login, access_token } = useAuthStore();
const checkPhoneNumber = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the phone number"));
  }

  setTimeout(() => {
    // Kiểm tra nếu value là chuỗi và chứa đúng các chữ số
    const phoneNumberPattern = /^[0-9]{8}$/; // Kiểm tra số điện thoại gồm 8 chữ số

    if (!phoneNumberPattern.test(value)) {
      callback(new Error("Please input a valid phone number (8 digits)"));
    } else {
      callback(); // Nếu hợp lệ, không có lỗi
    }
  }, 1000);
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
  phoneNumber: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  phoneNumber: [{ validator: checkPhoneNumber, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await AuthService.login({
        phone: ruleForm.phoneNumber,
        password: ruleForm.pass,
      });
      console.log("hello");
      login(res.access_token);
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