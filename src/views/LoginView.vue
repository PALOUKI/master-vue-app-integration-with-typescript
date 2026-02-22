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
                    :error="errors.username"
                    @input="errors.username = ''"
                />

                <BaseInput 
                    v-model="form.password"
                    label="Your password"
                    id="password"
                    type="password"
                    placeholder="•••••••••"
                    :error="errors.password"
                    @input="errors.password = ''"
                />
                
                <PrimaryButton :loading="authStore.loading">
                    Login to your account
                </PrimaryButton>
                <div class="text-sm font-medium text-body">Not registered? <a href="#" class="text-fg-brand hover:underline">Create account</a></div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue' 
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { reactive } from 'vue'
import type { LoginRequest } from '@/interfaces/auth'

const authStore = useAuthStore()
const router = useRouter()
const form = reactive<LoginRequest>({
    username: '',
    password: ''
})
const errors = reactive({
    username: '',
    password: ''
})

const validate = () => {
    let isValid = true
    errors.username = ''
    errors.password = ''
    if(!form.username.trim()){
        errors.username = "The username is required"
        isValid = false
    }
    if(!form.password.trim()){
        errors.password = "The password is required"
        isValid = false
    } else if (form.password.trim().length < 6) {
        errors.password = "Le mot de passe doit faire au moins 6 caractères"
        isValid = false
    }
    return isValid
}

const login = async () => {
    if(!validate()) return

    await authStore.login(form)
    if (authStore.user) {
        router.push('/welcome')
        toast.success("Bienvenue !", {
            description: `Ravi de vous voir de nouveau ${authStore.user.username}`,
            duration: 4000,
        })
    }
    form.username = ''
    form.password = ''
}
</script>