<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter italic">
      My Cart
    </h1>

    <div v-if="!cartStore.currentCart?.products.length" class="text-center py-16 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
      <p class="text-gray-400 font-bold text-lg mb-6">Your cart is currently empty.</p>
      <router-link to="/" class="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
        Back to Shop
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <div class="lg:col-span-8 space-y-4">
        <div v-for="item in cartStore.currentCart.products" :key="item.id" 
          class="flex items-center gap-6 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          
          <img :src="item.thumbnail" :alt="item.title" class="w-20 h-20 object-contain bg-gray-50 rounded-2xl" />

          <div class="flex-1">
            <h3 class="font-bold text-gray-900 leading-tight uppercase text-sm tracking-wide">
              {{ item.title }}
            </h3>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-blue-600 font-black">${{ item.price }}</span>
              <span class="text-xs text-gray-400 font-bold uppercase">x {{ item.quantity }}</span>
            </div>
          </div>

          <div class="text-right">
            <p class="font-black text-xl text-gray-900">${{ item.total.toFixed(2) }}</p>
            <p class="text-[10px] text-green-600 font-bold uppercase">
              Savings: ${{ (item.total - (item.discountedPrice * item.quantity)).toFixed(2) }}
            </p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4">
        <div class="bg-gray-900 rounded-[2.5rem] p-8 text-white sticky top-10 shadow-2xl">
          <h2 class="text-xl font-bold mb-6 border-b border-gray-800 pb-4 uppercase">Order Summary</h2>
          
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-400 font-medium">
              <span>Items ({{ cartStore.currentCart.totalQuantity }})</span>
              <span>${{ cartStore.currentCart.total.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-green-400 font-bold">
              <span>Total Savings</span>
              <span>-${{ (cartStore.currentCart.total - cartStore.currentCart.discountedTotal).toFixed(2) }}</span>
            </div>
          </div>

          <div class="flex justify-between items-center mb-8 pt-4 border-t border-gray-800">
            <span class="text-sm font-bold text-gray-400 uppercase">Total Net</span>
            <span class="text-4xl font-black text-white">
              ${{ cartStore.currentCart.discountedTotal.toFixed(2) }}
            </span>
          </div>

          <button class="w-full bg-blue-600 py-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/40 uppercase">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>