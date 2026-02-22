import apiClient from '@/services/api'
import type { Product, Category, ProductResponse } from '@/interfaces/product'

export const productService = {

    async getAllProducts(limit?: number, skip?: number, select?: string): Promise<ProductResponse> {
        const queryParts: string[] = [];
        if (limit) queryParts.push(`limit=${limit}`)
        if (skip) queryParts.push(`skip=${skip}`)
        if (select) queryParts.push(`select=${select}`)
        const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
        const url = `products${queryString}`
        const response = await apiClient.get<ProductResponse>(url)
        return response.data
    },

    async getSingleProduct(id: number): Promise<Product>{
        const response = await apiClient.get<Product>(`products/${id}`)
        return response.data
    },
    
    async searchProducts(query: string, limit?:number, skip?: number): Promise<ProductResponse>{
        const queryParts: String[] = []
        if (query) queryParts.push(`q=${encodeURIComponent(query)}`)
        if (skip) queryParts.push(`skip=${skip}`)
        if (limit) queryParts.push(`limit=${limit}`)
        const queryString =queryParts.length > 0 ? `?${queryParts.join('&')}` : ''
        const response = await apiClient.get<ProductResponse>(`products/search${queryString}`)
        return response.data
    },


    async getAllProductsCategories(): Promise<Category[]> {
        const response = await apiClient.get<Category[]>('products/categories')
        return response.data
    },

    async getProductCategoriesList(): Promise<String[]> {
        const response = await apiClient.get<String[]>('products/category-list')
        return response.data
    },

    async addProduct(product: Partial<Product>): Promise<Product> {
        const response = await apiClient.post<Product>('products/add', product)
        return response.data
    },

    async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
        const response = await apiClient.put<Product>(`products/${id}`, product)
        return response.data
    },

    async deleteProduct(id: number): Promise<void> {
        await apiClient.delete<Partial<Product>>(`products/${id}`)
    }

}
