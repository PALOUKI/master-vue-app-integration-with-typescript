<script setup lang="ts">

interface Props {
  loading?: boolean
  type?: 'submit' | 'button'
}

withDefaults(defineProps<Props>(), {
  loading: false,
  type: 'submit'
})
</script>

<template>
  <button 
    :type="type" 
    :disabled="loading"
    class="text-white box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none w-full mb-3 transition-colors flex justify-center items-center"
    :class="[loading ? 'bg-neutral-tertiary cursor-not-allowed' : 'bg-brand hover:bg-brand-strong']"
  >
    <template v-if="!loading">
      <slot /> </template>
    <template v-else>
      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </template>
  </button>
</template>