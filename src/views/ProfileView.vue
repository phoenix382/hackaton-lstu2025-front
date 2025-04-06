<template>
  <div class="registration-form">
      <h1>Профиль</h1>

      <el-form 
        ref="profileForm" 
        :model="form" 
        :rules="rules" 
        label-width="120px" 
        label-position="top"
        class="form"
      >

        <el-form-item label="Имя" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <div class="form-row">
          <el-form-item label="Возраст" prop="age">
            <el-input v-model="form.age"></el-input>
          </el-form-item>

          <el-form-item label="Рост" prop="height">
            <el-input v-model="form.height"></el-input>
          </el-form-item>

          <el-form-item label="Вес" prop="weight">
            <el-input v-model="form.weight"></el-input>
          </el-form-item>
        </div>

        <div class="form-row">
          <el-form-item label="Цель" prop="goal">
            <el-select
              v-model="form.goal"
              placeholder="Выберите свою цель"
            >
              <el-option value="1" label="Набрать массу"/>
              <el-option value="2" label="Похудеть"/>
              <el-option value="3" label="Набрать мышечную массу"/>
            </el-select>
          </el-form-item>

          <el-form-item label="Пол" prop="gender">
            <el-select
              v-model="form.gender"
              placeholder="Выберите пол"
            >
              <el-option value="1" label="Мужской" />
              <el-option value="0" label="Женский" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button @click="submitForm('profileForm')" class="wide-button">
            Сохранить
          </el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import { ElMessage } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();


const form = ref({
  userrname: '',
  age: '',
  height: '',
  weight: '',
  goal: '',
  gender: '',
});

const rules = {
  username: [
    { required: true, message: 'Пожалуйста, введите имя пользователя', trigger: 'blur' },
    { min: 3, max: 15, message: 'Имя пользователя должно содержать от 3 до 15 символов', trigger: 'blur' }
  ],
  age: [
    { required: true, message: 'Пожалуйста, введите возраст', trigger: 'blur' },
    { type: 'number', message: 'Возраст должен быть числом', trigger: 'blur' },
    { min: 1, max: 100, message: 'Возраст должен быть от 1 до 100', trigger: 'blur' }
  ],
  height: [
    { required: true, message: 'Пожалуйста, введите рост', trigger: 'blur' },
    { type: 'number', message: 'Рост должен быть числом', trigger: 'blur' },
    { min: 100, max: 300, message: 'Рост должен быть от 100 до 300', trigger: 'blur' }
  ],
  weight: [
    { required: true, message: 'Пожалуйста, введите вес', trigger: 'blur' },
    { type: 'number', message: 'Вес должен быть числом', trigger: 'blur' },
    { min: 30, max: 300, message: 'Вес должен быть от 30 до 300', trigger: 'blur' }
  ],
  goal: [
    { required: true, message: 'Пожалуйста, введите цель тренировок', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: 'Пожалуйста, введите пол', trigger: 'blur' },
  ],
};

const profileForm = ref(null);

const submitForm = async (formName) => {
  profileForm.value.validate(async (valid) => {
    if (valid) {
      const success = await authStore.login({
        'email': form.value.email,
        'password': form.value.password,
      });
      if (!success) {
        ElMessage.error('Ошибка при входе.');
      } else {
        ElMessage.success('Добро пожаловать!');
      }
    } else {
      ElMessage.error('Проверьте правильность введенных данных.');
      return false;
    }
  })
};

onMounted(async () => {
  const token = localStorage.getItem('jwt_token');
  console.log(token);

  try {
    const response = await api.post('/api/GetUserInfo', {token: token});
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }


  // form.value.username = authStore.user.username;
  // form.value.age = authStore.user.age;
  // form.value.height = authStore.user.height;
  // form.value.weight = authStore.user.weight;
  // form.value.goal = authStore.user.goal;
  // form.value.gender = authStore.user.gender;
});

</script>

<style scoped>
.registration-form {
  max-width: 600px;
  margin-top: 1em;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.registration-form h1 {
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

.form-row {
  display: flex;
  gap: 20px;
  width: 100%;
}

.form-row .el-form-item {
  width: 100%; 
}
</style>