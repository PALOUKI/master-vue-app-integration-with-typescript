<template>
    <div class="max-w-7xl mx-auto p-6">
        <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
            <LoadingWave />
        </div>

        <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div class="space-y-4">
                <div class="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                    <img :src="mainImage" :alt="product.title" class="w-full h-full object-contain p-4" />
                </div>
                <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    <button v-for="(img, index) in product.images" :key="index" @click="mainImage = img"
                        class="w-20 h-20 border rounded-lg overflow-hidden flex-shrink-0 transition-all"
                        :class="mainImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-blue-400'">
                        <img :src="img" class="w-full h-full object-cover" />
                    </button>
                </div>
            </div>

            <div class="flex flex-col">
                <button @click="$router.back()"
                    class="flex items-center text-blue-600 text-sm font-medium mb-6 hover:underline">
                    ← Back to products
                </button>

                <nav class="text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">
                    {{ product.category }} / {{ product.brand }}
                </nav>

                <h1 class="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{{ product.title }}</h1>

                <div class="flex items-center gap-4 mb-6">
                    <span
                        class="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
                        ★ {{ product.rating }}
                    </span>
                    <span class="text-sm text-gray-500 font-medium">{{ product.reviews.length }} reviews</span>
                    <span :class="[
                        'text-sm font-bold bg-opacity-10 px-3 py-1 rounded-full',
                        product.stock > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    ]">
                        {{ product.availabilityStatus }}
                    </span>
                </div>

                <div class="mb-8 p-4 bg-gray-50 rounded-2xl inline-flex items-baseline gap-3 w-fit">
                    <span class="text-5xl font-black text-gray-900">{{ product.price }}$</span>
                    <span v-if="product.discountPercentage" class="text-xl text-green-600 font-bold">
                        -{{ product.discountPercentage }}%
                    </span>
                </div>

                <p class="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-blue-600 pl-4">
                    {{ product.description }}
                </p>

                <div
                    class="grid grid-cols-2 gap-y-4 gap-x-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm mb-8 text-sm">
                    <div class="flex flex-col"><span class="text-gray-400 uppercase text-[10px] font-bold">SKU</span>
                        <span class="font-semibold text-gray-800">{{ product.sku }}</span>
                    </div>
                    <div class="flex flex-col"><span class="text-gray-400 uppercase text-[10px] font-bold">Weight</span>
                        <span class="font-semibold text-gray-800">{{ product.weight }}g</span>
                    </div>
                    <div class="flex flex-col"><span
                            class="text-gray-400 uppercase text-[10px] font-bold">Warranty</span> <span
                            class="font-semibold text-gray-800">{{ product.warrantyInformation }}</span></div>
                    <div class="flex flex-col"><span
                            class="text-gray-400 uppercase text-[10px] font-bold">Dimensions</span> <span
                            class="font-semibold text-gray-800">{{ product.dimensions.width }}x{{
                                product.dimensions.height }}cm</span></div>
                </div>
                <!-- Increment and decrement section -->
                <div class="mb-6">
                    <label class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 block">Quantity</label>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                            <button @click="decrement" :disabled="quantity <= product.minimumOrderQuantity"
                                class="px-4 py-2 hover:bg-gray-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-xl font-bold">
                                −
                            </button>
                            <span class="px-6 py-2 font-black text-lg min-w-[3rem] text-center">
                                {{ quantity }}
                            </span>
                            <button @click="increment" :disabled="quantity >= product.stock"
                                class="px-4 py-2 hover:bg-gray-200 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors text-xl font-bold">
                                +
                            </button>
                        </div>

                        <span v-if="product.minimumOrderQuantity > 1" class="text-xs text-blue-500 font-medium italic">
                            * Minimum: {{ product.minimumOrderQuantity }} units
                        </span>
                    </div>
                </div>
                <!-- add to card button-->
                <button @click="handleAddToCart" :disabled="cartStore.loading"
                    class="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transform active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center">
                    <span v-if="cartStore.loading" class="animate-pulse">ADDING TO CART...</span>
                    <span v-else>ADD TO CART</span>
                </button>
            </div>
        </div>

        <div v-if="product" class="mt-20 border-t border-gray-100 pt-12">
            <h2 class="text-3xl font-black text-gray-900 mb-10 text-center uppercase tracking-widest">Customer Reviews
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-for="(review, index) in product.reviews" :key="index"
                    class="bg-gray-50 p-8 rounded-3xl border border-transparent hover:border-blue-100 transition-colors">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <div class="font-black text-gray-900 text-lg">{{ review.reviewerName }}</div>
                            <div class="text-xs text-gray-400">{{ new Date(review.date).toLocaleDateString() }}</div>
                        </div>
                        <div class="flex text-yellow-400 font-bold bg-white px-3 py-1 rounded-full shadow-sm">
                            ★ {{ review.rating }}
                        </div>
                    </div>
                    <p class="text-gray-700 leading-relaxed italic">"{{ review.comment }}"</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { routes } from '@/router/index'
import LoadingWave from '@/components/LoadingWave.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const { currentProduct: product, loading: loading } = storeToRefs(productStore)
const mainImage = ref('')
const quantity = ref(1)

const handleAddToCart = async () => {
    if (authStore.isAuthenticated) {
        if (product.value) {
            await cartStore.addProductToCart(product.value, quantity.value)
            toast.success("Ajouté !", {
                description: `${quantity.value} x ${product.value.title}`,
                duration: 6000
            })
        }
    } else {
        router.push({name: routes.homeLogin})
        toast.info("Connexion requise", {
            description: "Veuillez vous connecter pour ajouter des articles au panier",
            duration: 6000
        })
    }

}

const decrement = () => {
    if (product.value && quantity.value > Number(product.value.minimumOrderQuantity)) {
        quantity.value--
    } 
}

const increment = () => {
    if (product.value && quantity.value < product.value.stock) {
        quantity.value++
    } 
}

const loadProduct = async () => {
    const id = Number(route.params.id)
    await productStore.getSingleProduct(id)
    if (product.value) {
        mainImage.value = product.value.thumbnail
        quantity.value = product.value.minimumOrderQuantity
    }
}

onMounted(() => {
    loadProduct()
})

</script>

<style scoped></style>