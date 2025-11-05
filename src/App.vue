<template>
  <div class="min-h-screen bg-slate-50">
    <Header />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
</script>
