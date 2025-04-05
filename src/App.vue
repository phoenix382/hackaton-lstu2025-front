<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="80" height="80" /> -->

    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About(restricted)</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
    </div> -->


    <el-menu
      default-active="1"
      ref="mainMenu"
      class="el-menu-header"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >

      <el-menu-item index="0">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" width="80" height="80" />
      </el-menu-item>

      <el-menu-item index="1">
        <RouterLink to="/">Home</RouterLink>
      </el-menu-item>
      <el-menu-item index="2">
        <RouterLink to="/about">About</RouterLink>
      </el-menu-item>
      <el-menu-item index="3">
        <RouterLink to="/login">Login</RouterLink>
      </el-menu-item>
      <el-menu-item index="4">
        <RouterLink to="/register">Register</RouterLink>
      </el-menu-item>
      <el-menu-item @click="handleLogout" v-if="isLogged">
        <template #title>
          <span>Logout</span>
        </template>
      </el-menu-item>
    </el-menu>

    <!-- <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item> -->

<br>
  </header>

  <div class=content>
    <RouterView />
  </div>

</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted, ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const mainMenu = ref(null);
const isLogged = ref(false);

// authStore.state.isAuthenticated

onMounted(() => {
  authStore.initializeAuth();
  isLogged.value = authStore.state.isAuthenticated;
  console.log(isLogged.value)
});

// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }

const handleLogout = () => {
  console.log(1)
  authStore.logout();
  console.log(2)
  router.push('/');
  console.log(3)
  console.log(mainMenu.value)
  mainMenu.value.select(1);
  isLogged.value = false;
}

const routes = [
  '',
  '/',
  '/about',
  '/login',
  '/register',
]

const handleSelect = (index) => {
  if (index !== 'logout') {
    console.log(index, routes[index]);
    router.push(routes[index]);
  } else {
    this.handleLogout();
  }
}

</script>

<style scoped>
body {
  background-color: white;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.el-menu-header {
  display: flex;
  justify-content: space-between;
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
