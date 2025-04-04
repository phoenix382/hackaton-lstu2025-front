<script setup>
import TheWelcome from '../components/TheWelcome.vue'

const apiUrl = import.meta.env.VITE_API_URL;
</script>

<template>
  <main>
    {{ apiUrl }}
  </main>
</template>
