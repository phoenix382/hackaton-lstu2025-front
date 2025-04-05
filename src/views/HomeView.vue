<template>
  <div class="home-content">
    <div class="home-presentation">
      <img src="@/assets/main-presentation.png" height="400px" />

      <div class="home-presentation-text">
        <h1>Достигайте своих целей вместе с нами!</h1>
        <span>Создайте идеальное тело и улучшите своё здоровье с помощью нашего фитнес-приложения. Персонализированные тренировки, полезные советы по питанию и поддержка сообщества — всё, что нужно для вашего успеха!</span>
      </div>
    </div>

    <div class="home-app">
      <img src="@/assets/screenshot.jpeg" width="40%" />
      <img src="@/assets/screenshot.jpeg" width="40%" />
    </div>
  </div>
</template>

<script setup>
import TheWelcome from '../components/TheWelcome.vue'

const apiUrl = import.meta.env.VITE_API_URL;
</script>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3em;
  max-width: 1000px;
}

.home-presentation {
  display: flex; 
  gap: 3em;
}

.home-presentation-text {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  gap: 1em;
/*  height: max-content;*/
}

.home-presentation-text h1 {
  text-align: center;
  font-size: 3em;
  font-weight: bold;
/*  font-family: 'Lato';*/
  font-family: 'Inter';
}

.home-presentation-text span {
  text-align: center;
  color: #888;
  font-size: 1.2em;
}

.home-app {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  gap: 4em;
}
</style>