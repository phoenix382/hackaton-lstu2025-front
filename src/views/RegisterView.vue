<template>
  <div class="registration-form">
    <el-form ref="registrationForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registrationForm')">Register</el-button>
        <el-button @click="resetForm('registrationForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// const email = ref('');
// const password = ref('');
// const error = ref('');
// const router = useRouter();
// const authStore = useAuthStore();

// const handleLogin = async () => {
//   try {
//     const success = await authStore.login({
//       email: email.value,
//       password: password.value
//     });

//     if (success) {
//       router.push('/');
//     }
//   } catch (err) {
//     error.value = 'Login failed. Please check your credentials.';
//   }
// };
// import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

const rules = {
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input email address', trigger: 'blur' },
    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password should be at least 6 characters', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm password', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('Passwords do not match'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const registrationForm = ref(null);

const submitForm = (formName) => {
  registrationForm.value.validate((valid) => {
    if (valid) {
      ElMessage.success('Registration successful!');
      // Here you can add your registration logic, e.g., sending data to the server
    } else {
      ElMessage.error('Please fill in the form correctly.');
      return false;
    }
  });
};

const resetForm = (formName) => {
  registrationForm.value.resetFields();
};

</script>

<style scoped>
.registration-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>