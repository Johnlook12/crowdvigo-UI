<script setup lang="ts">
import { useRoute } from 'vue-router';
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';

const route = useRoute();
</script>

<template>
  <Header v-if="!route.meta.hideLayout" />
  <router-view />
  <Footer v-if="!route.meta.hideLayout" />
</template>

<style scoped>

</style>
