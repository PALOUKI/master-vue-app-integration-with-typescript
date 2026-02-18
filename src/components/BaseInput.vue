<script setup lang="ts">
interface Props {
  label: string
  id: string
  type?: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  required?: boolean
  error?: string | null 
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  error: null
})

const model = defineModel<string>()
</script>

<template>
  <div class="mb-4 text-left">
    <label :for="id" class="block mb-2 text-sm font-medium" 
           :class="[error ? 'text-fg-danger-strong' : 'text-heading']">
      {{ label }}
    </label>
    
    <input
      :id="id"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      class="block w-full px-3 py-2.5 text-sm rounded-base outline-none transition-all border shadow-xs"
      :class="[
        error 
          ? 'border-danger bg-danger-soft text-fg-danger-strong focus:ring-danger focus:border-danger' 
          : 'bg-neutral-secondary-medium border-default-medium text-heading focus:ring-brand focus:border-brand'
      ]"
    />
    
    <p v-if="error" class="mt-1.5 text-xs font-medium text-fg-danger-strong italic">
      {{ error }}
    </p>
  </div>
</template>