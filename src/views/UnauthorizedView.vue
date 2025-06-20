<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-code">403</h1>
      <p class="error-message">Acceso denegado. No tienes permiso para ver esta página.</p>
      <button @click="goHome" class="btn-back">Volver al inicio</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

/**
 * Navega a la página de inicio
 */
function goHome() {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9fafb;
}

.error-content {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: #ef4444;
}

.error-message {
  margin: 1rem 0;
  font-size: 1.25rem;
  color: #374151;
}

.btn-back {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #001136;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-back:hover {
  background-color: #2563eb;
}
</style>
