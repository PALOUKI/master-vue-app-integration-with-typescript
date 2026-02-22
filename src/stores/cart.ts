import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";
import type {
    Cart,
    AddCartRequest,
    UpdateCartRequest,
} from "@/interfaces/cart";
import type { Product } from "@/interfaces/product";
import { cartService } from "@/services/cart.service";

interface CartState {
    carts: Cart[];
    currentCart: Cart | null;
    loading: boolean;
    error: string | null;
}

export const useCartStore = defineStore("carts", {
    state: (): CartState => ({
        carts: [] as Cart[],
        currentCart: JSON.parse(localStorage.getItem("current_cart") || "null"),
        loading: false,
        error: null,
    }),
    getters: {},
    actions: {
        async getAllCarts(skip?: number, limit?: number) {
            try {
                this.loading = true;
                this.error = null;
                const data = await cartService.getAllCarts(skip, limit);
                return data.carts;
            } catch (err) {
                this.error = "Erreur lors de la récuparation des paniers";
                console.error(this.error + ": " + err);
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async getSingleCart(id: number) {
            try {
                this.loading = true;
                this.error = null;
                const data = await cartService.getSingleCart(id);
                this.currentCart = data;
            } catch (err) {
                this.error = "Erreur lors du chargement du single cart " + id;
                console.error(this.error + ": " + err);
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async getCartsByUser(id: number) {
            try {
                this.loading = true;
                this.error = null;
                const data = await cartService.getCartsByUser(id);
                this.carts = data.carts;
            } catch (err) {
                this.error = "Erreur lors de la récupération des carts d'un user";
                console.error(this.error + ": " + err);
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async addProductToCart(product: Product, quantity: number) {
            const authStore = useAuthStore();
            // On utilise l'ID 1 pour simuler LE panier de l'utilisateur connecté
            // car l'ID 1 existe réellement dans la DB de DummyJSON
            const cartIdToUse = 1;
            try {
                this.loading = true;
                this.error = null;

                const userId = authStore.user?.id || 1;
                let data;

                if (!this.currentCart) {
                    const request: AddCartRequest = {
                        userId: userId,
                        products: [
                            {
                                id: product.id,
                                quantity: quantity,
                            },
                        ],
                    };
                    data = await cartService.addCart(request);
                } else {
                    const request: UpdateCartRequest = {
                        merge: true,
                        products: [
                            {
                                id: product.id,
                                quantity: quantity,
                            },
                        ],
                    };
                    data = await cartService.updateCart(cartIdToUse, request);
                }

                this.currentCart = data;
                localStorage.setItem("current_cart", JSON.stringify(this.currentCart));
            } catch (err) {
                this.error = "Erreur lors de l'ajout ou de la mise à jour du cart";
                console.error(this.error + ": " + err);
                throw err;
            } finally {
                this.loading = false;
            }
        },
        
        async deleteCart(id: number) {
            try {
                this.loading = true;
                this.error = null;
                const data = await cartService.deleteCart(id);
            } catch (err) {
                this.error = "Erreur lors de la suppression du cart";
                console.error(this.error + ": " + err);
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});
