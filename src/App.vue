<script setup lang="ts">
import NavBar  from "@/components/NavBar.vue"
import { Toaster } from 'vue-sonner'

</script>

<template>
  <Toaster 
    position="top-right" 
    richColors 
    expand 
    closeButton 
  />

  <div v-if="$route.name && String($route.name).startsWith('home')">
    <NavBar />
  </div>
  <RouterView />
</template>

<style scoped></style>
