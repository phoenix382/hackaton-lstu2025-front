<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" required placeholder="Email">
      <input v-model="password" type="password" required placeholder="Password">
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const success = await authStore.login({
      email: email.value,
      password: password.value
    });

    if (success) {
      router.push('/');
    }
  } catch (err) {
    error.value = 'Login failed. Please check your credentials.';
  }
};
</script>