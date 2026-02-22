<style>
/* From Uiverse.io by mrpumps31232 */
</style>
<template>
    <div v-if="productStore.loading" class="flex place-content-center place-items-center min-h-screen">
        <LoadingWave />
    </div>

    <div v-else>
        <div class="bg-white place-content-center ml-3 mr-3 place-items-center p-6 rounded-base border border-default shadow-sm mb-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div class="space-y-2">
                    <label class="text-sm font-bold text-heading">Search</label>
                    <input v-model="searchQuery" type="text" placeholder="Title, brand..."
                        class="w-full p-2 border border-default-medium rounded-base text-sm focus:ring-blue-500">
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-bold text-heading">Max Price: {{ maxPrice }}$</label>
                    <input v-model="maxPrice" type="range" min="0" max="2000" step="10"
                        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600">
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-bold text-heading">Minimum Rating: {{ minRating }}⭐</label>
                    <select v-model="minRating" class="w-full p-2 border border-default-medium rounded-base text-sm">
                        <option :value="0">All ratings</option>
                        <option v-for="n in 5" :key="n" :value="n">{{ n }} Stars & up</option>
                    </select>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-bold text-heading">Categories</label>
                    <div class="max-h-32 overflow-y-auto border border-default-medium p-2 rounded-base space-y-1">
                        <div v-for="cat in productStore.categories" :key="String(cat)" class="flex items-center">
                            <input :id="String(cat)" type="checkbox" :value="cat" v-model="selectedCategories"
                                class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500">
                            <label :for="String(cat)" class="ms-2 text-xs text-body capitalize cursor-pointer">{{ cat
                                }}</label>
                        </div>
                    </div>
                </div>

            </div>

            <div class="mt-4 flex justify-end">
                <button @click="resetFilters" class="text-xs text-blue-600 hover:underline">Clear all filters</button>
            </div>
        </div>
        <div
            class="grid grid-cols-1 place-content-center place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div v-for="product in filteredProducts" :key="product.id">
                <ProductTile :product="product" />
            </div>
        </div>
        <nav aria-label="Page navigation" class="flex flex-wrap items-center justify-center gap-4 mt-8 pb-10">
            <ul class="flex -space-x-px text-sm">
                <li>
                    <button @click="currentPage--" :disabled="currentPage === 1"
                        class="flex items-center justify-center px-3 h-9 text-body bg-neutral-secondary-medium border border-default-medium rounded-s-base disabled:opacity-50">
                        Previous
                    </button>
                </li>

                <li v-for="page in visiblePages" :key="page">
                    <button @click="currentPage = page" :class="[
                        'flex items-center justify-center w-9 h-9 border border-default-medium transition-all',
                        currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md' // Style BLEU actif
                            : 'bg-neutral-secondary-medium text-body hover:bg-neutral-tertiary-medium'
                    ]">
                        {{ page }}
                    </button>
                </li>

                <li>
                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                        class="flex items-center justify-center px-3 h-9 text-body bg-neutral-secondary-medium border border-default-medium rounded-e-base disabled:opacity-50">
                        Next
                    </button>
                </li>
            </ul>

            <form @submit.prevent="goToPage" class="flex items-center space-x-2">
                <input v-model="inputPage" type="number" id="jump-page"
                    class="bg-white w-12 border border-default-medium text-heading text-center text-sm rounded-base focus:ring-blue-500 focus:border-blue-500 block py-1.5 shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    :placeholder="currentPage.toString()" />
                <span class="text-sm font-medium text-body">/ {{ totalPages }}</span>
            </form>
        </nav>
    </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductTile from '@/components/ProductTile.vue'
import  LoadingWave  from '@/components/LoadingWave.vue'
import type { Product, Category } from '@/interfaces/product'

const productStore = useProductStore()
const currentPage = ref(1)
const itemsPerPage = 20
const inputPage = ref(currentPage.value)
const searchQuery = ref('')
const maxPrice = ref(2000)
const minRating = ref(0)
const selectedCategories = ref<string[]>([])
let searchTimer: ReturnType<typeof setTimeout>


const loadPage = () => {
    const skip = (currentPage.value - 1) * itemsPerPage
    productStore.fetchProducts(itemsPerPage, skip, searchQuery.value);
}

onMounted(() => {
    loadPage()
    productStore.getAllProductsCategories()
})

onUnmounted(() => {
    clearTimeout(searchTimer)
})

watch(searchQuery, (newValue) => {
    currentPage.value = 1
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
        loadPage()
    }, 300)

})

watch(currentPage, (newValue) => {
    inputPage.value = newValue
    loadPage()
})

/****
 * Filters
 * * */

const filteredProducts = computed<Product[]>(() => {
    return productStore.products.filter((p) => {
        const matchesCategory = selectedCategories.value.length === 0 || selectedCategories.value.includes(p.category)
        const matchesPricies = p.price <= maxPrice.value
        const matchesRating = p.rating > minRating.value
        return matchesCategory && matchesPricies && matchesRating
    })
})

const resetFilters = () => {
    searchQuery.value = ''
    selectedCategories.value = []
    maxPrice.value = 2000
    minRating.value = 0
    currentPage.value = 1
}

/****
 * Pagination
 * **/
const totalPages = computed(() => {
    return Math.ceil(productStore.total / itemsPerPage)
})

// Calcul des pages à afficher : [Précédente, Actuelle, Suivante]
const visiblePages = computed(() => {
    const pages = []

    if (currentPage.value > 1) {
        pages.push(currentPage.value - 1)
    }

    pages.push(currentPage.value)
    if (currentPage.value < totalPages.value) {
        pages.push(currentPage.value + 1)
    }
    return pages
})


const goToPage = () => {
    const page = Number(inputPage.value)
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    } else {
        inputPage.value = currentPage.value
    }
}

</script>
