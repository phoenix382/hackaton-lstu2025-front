<template>
  <div class="registration-form">
    <el-form ref="registrationForm" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="Имя" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="Подтверждение" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registrationForm')">Регистрация</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

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
    { required: true, message: 'Пожалуйста, введите имя пользователя', trigger: 'blur' },
    { min: 3, max: 15, message: 'Имя пользователя должно содержать от 3 до 15 символов', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Некорректная почта', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
    { min: 8, message: 'Пароль должен содержать не менее 8 символов', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Пожалуйста, повторите пароль', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('Пароли не совпадают'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

const registrationForm = ref(null);

const submitForm = async (formName) => {
  registrationForm.value.validate(async (valid) => {
    if (valid) {


      const success = await authStore.register({
        'email': form.value.email,
        'password': form.value.password,
      });

      if (!success) {
        ElMessage.error('Ошибка при регистрации.');
      } else {
        ElMessage.success('Регистрация прошла успещно!');
      }
    } else {
      ElMessage.error('Проверьте правильность введенных данных.');
      return false;
    }
  });
};

// const resetForm = (formName) => {
//   registrationForm.value.resetFields();
// };

</script>

<style scoped>
.registration-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>