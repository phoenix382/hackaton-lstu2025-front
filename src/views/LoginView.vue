<template>
  <div class="login-form">
      <h1>Вход</h1>

      <el-form 
        ref="loginForm" 
        :model="form" 
        :rules="rules" 
        label-width="120px" 
        label-position="top"
        class="form"
      >
        <!-- YANDEX LOGIN -->

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="Пароль" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('loginForm')" class="wide-button">
            Войти
          </el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import { ElMessage } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();


const form = ref({
  email: '',
  password: '',
});

const rules = {
  email: [
    { required: true, message: 'Пожалуйста, введите почту', trigger: 'blur' },
    { type: 'email', message: 'Некорректная почта', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
    { min: 8, message: 'Пароль должен содержать не менее 8 символов', trigger: 'blur' }
  ],
};

const loginForm = ref(null);

const emit = defineEmits(["login-event"]);

const submitForm = async (formName) => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      const success = await authStore.login({
        'email': form.value.email,
        'password': form.value.password,
      });
      if (!success) {
        ElMessage.error('Ошибка при входе.');
      } else {
        ElMessage.success('Добро пожаловать!');
        emit("login-event");
        router.push({ name: 'main' });
      }
    } else {
      ElMessage.error('Проверьте правильность введенных данных.');
      return false;
    }
  })
};

</script>

<style scoped>
.login-form {
  max-width: 600px;
  margin-left: 18em;
  margin-top: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.login-form h1 {
  font-family: 'Inter';
  font-size: 36px;
  font-weight: bold;
}

.form {
  border: 1px solid lightgray;
  min-width: 600px;
  border-radius: 5px;
  padding: 20px;
  padding-left: 5em;
  padding-right: 5em;
}

.wide-button {
  width: 100%;
  background-color: #FCE181;
  border: 1px solid lightgray;
  font-family: 'Roboto';
}

.wide-button:hover {
  background-color: #F4D35E;
  transition: 0.3s;
}
</style>