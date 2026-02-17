<template>
    <div class="welcome-container">
        <h1>{{ 'Welcome ' + authStore.user?.username }} </h1>
    </div>
</template>
<script setup lang='ts'>
import { useAuthStore } from '@/stores/auth'


const authStore = useAuthStore();

</script>