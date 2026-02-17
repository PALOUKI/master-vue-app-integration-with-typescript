<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
            <div v-if="authStore.error" class="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft" role="alert">
                <span class="font-medium">{{ authStore.error }}</span>
            </div>
            
            <form @submit.prevent="login">
                <h5 class="text-xl font-semibold text-heading mb-6">Sign in to our platform</h5>
                
                <BaseInput 
                    v-model="form.username"
                    label="Your username"
                    id="username"
                    placeholder="your-username"
                    required
                />

                <BaseInput 
                    v-model="form.password"
                    label="Your password"
                    id="password"
                    type="password"
                    placeholder="•••••••••"
                    required
                />

                <div class="flex items-start my-6">
                    </div>
                
                <button type="submit" :disabled="authStore.loading" :class="[authStore.loading ? 'bg-gray-400' : 'hover:bg-brand-strong bg-brand']" class="text-white box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3">
                    {{ authStore.loading ? 'Loading...' : 'Login to your account' }}
                </button>
                <div class="text-sm font-medium text-body">Not registered? <a href="#" class="text-fg-brand hover:underline">Create account</a></div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue' 
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import type { LoginRequest } from '@/interfaces/auth'

const authStore = useAuthStore()
const router = useRouter()
const form = reactive<LoginRequest>({
    username: '',
    password: ''
})

const login = async () => {
    if(form.username.trim().length > 0 && form.password.trim().length > 0 ){
        await authStore.login(form)
        if (authStore.user) router.push('/welcome')
    }

    form.username = ''
    form.password = ''
}
</script>