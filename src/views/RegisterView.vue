<template>
  <div class="registration-block">
    <div class="registration-form">
      <h1>Регистрация</h1>

      <img class="back-image" src="@/assets/register.png"/>

      <el-form 
        ref="registrationForm" 
        :model="form" 
        :rules="rules" 
        label-width="120px" 
        label-position="top"
        class="form"
      >
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

        <el-form-item prop="agreement">
          <el-checkbox v-model="form.agreement" name="type">
            Согласен с условиями
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button @click="submitForm('registrationForm')" class="wide-button">
            Регистрация
          </el-button>
        </el-form-item>
      </el-form>
    </div>

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
  confirmPassword: '',
  goal: '',
  gender: '',
  agreement: '',
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
  ],
  goal: [
    { required: true, message: 'Пожалуйста, выберите цель', trigger: 'change' },
  ],
  gender: [
    { required: true, message: 'Пожалуйста, выберите пол', trigger: 'change' },
  ],
  agreement: [
    { required: true, message: 'Невозможно продолжить без согласия', trigger: 'change' },
  ]
};

const registrationForm = ref(null);

const submitForm = async (formName) => {
  registrationForm.value.validate(async (valid) => {
    if (valid) {


      const success = await authStore.register({
        'email': form.value.email,
        'password': form.value.password,
        'name': form.value.username,
        'gender': form.value.gender,
        'goal': form.value.goal
      });

      if (!success) {
        ElMessage.error('Ошибка при регистрации.');
      } else {
        ElMessage.success('Регистрация прошла успещно!');
        router.push('/main');
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
  margin-left: 18em;
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

.registration-block {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;


  position: relative;
}

.back-image {
  position: absolute;
  top: 0;
  left: 0%;

  height: 90%;
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

.form {
  border: 1px solid lightgray;
  min-width: 600px;
  border-radius: 5px;
  padding: 20px;
  padding-left: 5em;
  padding-right: 5em;
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