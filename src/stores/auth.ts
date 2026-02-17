import { defineStore } from 'pinia'
import type { User, LoginRequest, LoginResponse, RefreshTokenResponse } from '@/interfaces/auth'
import { authService } from '@/services/auth.service'

interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    loading: boolean
    error: string | null
}

export const useAuthStore = defineStore('auth', {
    state: () : AuthState => {
        const savedUser = localStorage.getItem('user')
        return {
            user: (() => {
                try {
                    const saved = localStorage.getItem('user');
                    return saved ? JSON.parse(saved) : null;
                } catch {
                    return null;
                }
            })(),
            token: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refreshToken'),
            loading: false,
            error: null
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    },
    actions: {
        async login(credentials: LoginRequest) : Promise<void> {
            try {
                this.loading = true
                const data: LoginResponse = await authService.login (credentials)
                this.user = data
                this.token = data.accessToken
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('user', JSON.stringify(data)) 
                localStorage.setItem('refreshToken', data.refreshToken)
            } catch(err) {
                this.error = "Erreur lors de l'authentification ";
                console.error("Erreur lors de l'authentification" + err)
                throw err;
            } finally {
                this.loading = false
            }
        },

        async refreshAuthToken(refreshToken: string): Promise<void> {
            try {
                this.loading = true
                const data: RefreshTokenResponse = await authService.refreshToken(refreshToken)
                this.token = data.accessToken
                this.refreshToken = data.refreshToken
                this.token = data.accessToken
                localStorage.setItem('token', data.accessToken)
                localStorage.setItem('refreshToken', data.refreshToken)
            } catch (err){
                this.error = "Erreur lors du refesh du token"
                throw err
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = null
            this.refreshToken = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        }

    }
}) 