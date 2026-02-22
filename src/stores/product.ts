import { defineStore } from 'pinia'
import type { Product, ProductResponse } from '@/interfaces/product'
import { productService } from '@/services/product.service'

interface ProductState {
    products: Product[],
    currentProduct: Product | null
    categories: String []
    total: number
    loading: boolean,
    error: string | null
}

export const useProductStore = defineStore('products', {
    state: () : ProductState => ({
        products: [] as Product[],
        currentProduct: null,
        categories: [],
        total: 0,
        loading: false,
        error: null
    }),
    getters: {

    },
    actions: {

        async fetchProducts(limit?: number, skip?: number, query?: string, select?: string) {
            try {
                this.loading = true
                this.error = null
                let data: ProductResponse

                if (query?.trim()) {
                    data = await productService.searchProducts(query, limit, skip)
                } else {
                    data = await productService.getAllProducts(limit, skip, select)
                }

                this.products = data.products
                this.total = data.total
            } catch (err) {
                console.error("Erreur lors du chargement des produits: " + err)
                this.error = "Erreur lors du chargement des produits"
                throw err
            } finally {
                this.loading = false
            }
        },

        async getAllProductsCategories() {
            try {
                this.loading = true
                this.error = null
                const data = await productService.getProductCategoriesList()
                this.categories = data
            } catch(err) {
                this.error = "Erreur lors du chargement de la liste des categories"
                console.error("Erreur lors du chargement de la liste des categories")
                throw err
            } finally {
                this.loading = false
            }
        },

        async getSingleProduct(id: number) {
            try {
                this.loading = true
                this.error = null
                const data = await productService.getSingleProduct(id)
                this.currentProduct = data
            } catch (err) {
                this.error = "Erreur lors de la récupération du produit unique"
                console.error("Erreur lors de la récupération du produit avec son id" + err)
                throw err
            } finally {
                this.loading = false
            }
        }

    }
})