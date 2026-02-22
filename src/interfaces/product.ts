export interface dimensions{
    width: number
    height: number
    depth: number
}

export interface reviews {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export interface meta {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
}

export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    tags: string[]
    brand: string
    sku: string
    weight: string
    dimensions: dimensions
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: reviews[]
    returnPolicy: string
    minimumOrderQuantity: number
    meta: meta
    thumbnail: string
    images: string[]
}

export interface ProductResponse {
    products: Product[],
    total: number
    skip: number
    limit: number
}

export interface Category {
    slug: string
    name: string
    url: string
}