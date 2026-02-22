import apiClient from '@/services/api'
import type { CartResponse, Cart, AddCartRequest, UpdateCartRequest } from '@/interfaces/cart'


export const cartService = {

    async getAllCarts(skip?: number, limit?:number): Promise<CartResponse> {
        const queryParts: String[] = []
        if (skip) queryParts.push(`skip=${skip}`)
        if (limit) queryParts.push(`limit=${limit}`)
        const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}`: ''
        const response = await apiClient.get<CartResponse>(`carts${queryString}`)
        return response.data
    },

    async getSingleCart(id: number) : Promise<Cart> {
        const response = await apiClient.get<Cart>(`carts/${id}`)
        return response.data
    },

    async getCartsByUser(id: number) : Promise<CartResponse> {
        const response = await apiClient.get<CartResponse>(`carts/user/${id}`)
        return response.data
    }, 

    async addCart(request: AddCartRequest) : Promise<Cart> {
        const response = await apiClient.post<Cart>(`carts/add`, request)
        return response.data
    },

    async updateCart(id: number, request: UpdateCartRequest) : Promise<Cart> {
        const response = await apiClient.put<Cart>(`carts/${id}`, request)
        return response.data
    },

    async deleteCart(id: number) :Promise<void> {
        await apiClient.delete<void>(`carts/${id}`)
    }

}