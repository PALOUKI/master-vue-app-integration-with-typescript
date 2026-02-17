<script setup lang="ts">
import NavBar  from "@/components/NavBar.vue"

</script>

<template>
  <div v-if="$route.name && String($route.name).startsWith('home')">
    <NavBar />
  </div>
  <RouterView />
</template>

<style scoped></style>
