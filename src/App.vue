<template>
  <header>

    <!-- TOP MENU -->
    <el-menu
      ref="mainMenu"
      class="el-menu-header"
      mode="horizontal"
      :ellipsis="false"
      router="true"
    >
      <!-- LOGO -->
      <RouterLink class="logo" :to="isLogged ? '/main' : '/'">
        <div class="logo-container">
          <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="60" height="50" />
          <span class="logo-text">FIT NESS</span>
        </div>
      </RouterLink>
      
      <!-- CONTENT BUTTONS -->
      <div class="content-block">
        <el-menu-item index="/exercises">
          <span>упражнения</span>
          <i class="pi pi-angle-down header-arrow"></i>
        </el-menu-item>

        <el-menu-item index="/diet">
          <span>питание</span>
          <i class="pi pi-angle-down header-arrow"></i>
        </el-menu-item>

        <el-menu-item index="/articles">
          <span>статьи</span>
          <i class="pi pi-angle-down header-arrow"></i>
        </el-menu-item>
      </div>

      <!-- AUTH BUTTONS -->
      <div v-if="!isLogged" class="auth-block">
        <el-menu-item index="/login">
          Вход
        </el-menu-item>
        <el-menu-item class="register-item" index="/register">
          <!-- <el-button type="primary" @click="submitForm('registrationForm')">Регистрация</el-button> -->
          <div class="register-button">
            <span>Регистрация</span>
          </div>
        </el-menu-item>
      </div>
      <div v-else class="user-block">
        <el-menu-item class="username" index="/profile">
          {{ isLogged }}
        </el-menu-item>
        <el-menu-item @click="handleLogout" v-if="isLogged">
            <span>Выйти</span>
        </el-menu-item>
      </div>

    </el-menu>


<!-- <br> -->
  </header>

  <!-- CONTENT -->
  <div class="page">
    <div class="content">
      <RouterView />
    </div>

    <div class="footer">
      <span>
        Хакатон ЛГТУ, 2025
      </span>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted, ref } from 'vue';
import 'primeicons/primeicons.css'

const authStore = useAuthStore();
const router = useRouter();

const mainMenu = ref(null);
const isLogged = ref(false);

// authStore.state.isAuthenticated

onMounted(() => {
  authStore.initializeAuth();
  isLogged.value = authStore.state.isAuthenticated;
});

// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }

const handleLogout = () => {
  authStore.logout();
  isLogged.value = false;

  router.push('/').then(() => {
    window.location.reload(); // Full reload after redirection
  });
}

const routes = [
  '',
  '/',
  '/about',
  '/login',
  '/register',
]

// const handleSelect = (index) => {
//   if (index !== 'logout') {
//     console.log(index, routes[index]);
//     router.push(routes[index]);
//   } else {
//     this.handleLogout();
//   }
// }

</script>

<style scoped>
body {
/*  background-color: #EDEAE5;*/
}

.logo-container {
  display: flex;
  align-items: center;
}


.content-block {
  display: flex;
  align-items: center;
}

.auth-block {
  display: flex;
/*  gap: 1rem;*/
  align-items: center;
}

.user-block {
  display: flex;
  align-items: center;
}

.content-block .el-menu-item {
  padding-right: 3rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  font-color: black;
  margin-left: 0.5rem;
  padding-right: 0.3rem;

  color: #026670;
  font-family: 'Roboto' !important;
}

.logo {
  padding: 2px;
  border-radius: 10px;
}

.logo-container {
  height: 100%;
}

.logo-container:hover {
  filter: brightness(1.2);
  transition: 0.3s ease;
}

.logo:hover {
  background-color: white;
/*  filter: brightness(0.9);*/
}

.logo-text {
  white-space: nowrap;
}

.register-item {
  padding: 0;
}

.register-button {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  height: 70%;
  border-radius: 5px;

  background-color: #026670;

}

.register-button span {
  color: white !important;
}

.register-button:hover {
  background-color: #5EC9B1;
  transition: 0.3s ease;
}

.el-menu-item {
  display: flex;
  align-items: center;
  border-radius: 5px;
}

.el-menu-item > i.header-arrow {

  color: #9FEDD7;
/*  scale: 1.3;*/
/*  width: 0.5rem !important;*/
/*  height: 0.5rem !important;*/
  font-size: 1rem !important;
  margin-left: 0.1rem;
  margin-top: 0.1rem;
}

.el-menu-item span {
  color: #464646;
}

/*@media (min-width: 1024px) */

.footer {
  display: flex;
  width: 100%;
/*  position: absolute;*/
  bottom: 20px;
  justify-content: center;
}

.footer span {
  color: #464646;
}

.username {
  font-weight: bold;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
/*  justify-content: center;*/
  height: 100%;

  min-height: 85vh;
}

.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-menu-header {
  display: flex;
  justify-content: space-between;
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
