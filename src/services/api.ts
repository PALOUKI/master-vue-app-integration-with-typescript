import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const apiClient = axios.create({
    baseURL: 'https://dummyjson.com/',
    headers: {
        'Content-Type': "application/json"
    }
})

apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if(authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config;
}, (error) => Promise.reject(error));

apiClient.interceptors.response.use((response) => response, async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest.url?.includes('auth/login') && !originalRequest._retry){
        originalRequest._retry = true;
        try {
            if(authStore.refreshToken){
                await authStore.refreshAuthToken(authStore.refreshToken)
            }
            originalRequest.headers.Authorization = `Bearer ${authStore.token}`
            return apiClient(originalRequest)
        } catch (reflError) {
            authStore.logout()
            return Promise.reject(reflError)
        }
    }
    return Promise.reject(error)
})

export default apiClient