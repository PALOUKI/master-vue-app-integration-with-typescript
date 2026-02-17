<template>
  <div class="mb-4">
    <label :for="id" class="block mb-2.5 text-sm font-medium text-heading">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :required="required"
      class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body outline-none"
    />
  </div>
</template>

<script setup lang="ts">
// defineModel permet une liaison bidirectionnelle automatique avec le v-model du parent
const model = defineModel<string>()

interface Props {
  label: string
  id: string
  type?: string
  placeholder?: string
  required?: boolean
}

// On définit des valeurs par défaut
withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false
})
</script>