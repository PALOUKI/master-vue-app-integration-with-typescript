import apiClient  from './api'
import type { LoginRequest, LoginResponse, RefreshTokenResponse } from "@/interfaces/auth.ts"

export const authService = {

    async login(credentials: LoginRequest): Promise<LoginResponse>{
        const response = await apiClient.post<LoginResponse>('auth/login', credentials)
        return response.data
    },

    async refreshToken(refreshToken?: string): Promise<RefreshTokenResponse> {
        const response = await apiClient.post('auth/refresh', {
            refreshToken: refreshToken,
            expiresInMins: 30
        }) 
        return response.data
    }

}







