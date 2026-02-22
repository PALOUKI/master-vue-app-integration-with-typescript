export interface CartProduct {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    discountPercentage: number
    discountedPrice: number
    thumbnail: string
}

export interface Cart {
    id: number
    products: CartProduct[]
    total: number
    discountedTotal: number
    userId: number
    totalProducts: number
    totalQuantity: number
}

export interface CartResponse {
    carts: Cart[]
    total: number
    skip: number
    limit: number
}

export interface AddCartRequest {
    userId: number
    products: { id: number, quantity: number}[]
}

export interface UpdateCartRequest {
    merge: true,
    products: { id: number, quantity: number}[]
}
