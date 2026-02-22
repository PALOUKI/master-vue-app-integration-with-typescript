<template>
    <div class="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
        <router-link :to="{ name: routes.productDetail, params: { id: product.id } }">
            <img class="rounded-base mb-6 cursor-pointer" :src="product.images[0]" alt="product image" />
        </router-link>
        <div>
            <div class="flex items-center space-x-3 mb-6">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg v-for="n in 5" :key="n" 
                        :class="['w-5 h-5', n <= Math.round(product.rating) ? 'text-fg-yellow' : 'text-gray-300']"
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                </div>
                <span v-for="tag in product.tags" :key="tag"
                    class="inline-flex ml-2 items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
                    <svg class="w-3 h-3 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z" />
                    </svg>
                    {{ tag }}
                </span>
            </div>
            <router-link :to="{ name: routes.productDetail, params: { id: product.id } }">
                <h5 class="text-xl text-heading font-semibold tracking-tight"> {{ product.title }}</h5>
            </router-link>
            <div class="flex items-center justify-between mt-6">
                <div class="flex items-center gap-2">
                    <span class="text-3xl font-extrabold text-heading">${{ product.price }}</span>
                    <span v-if="product.discountPercentage" class="text-sm font-bold text-green-600">
                        -{{ product.discountPercentage }}%
                    </span>
                </div>
                
                <button type="button"
                    class="inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none">
                    <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                    </svg>
                    Add
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/interfaces/product'
import { routes } from '@/router/index.ts'

interface Props {
    product: Product
}

const props = defineProps<Props>()
</script>