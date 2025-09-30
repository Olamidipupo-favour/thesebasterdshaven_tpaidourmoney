import { apiClient } from "../client"
import { API_ENDPOINTS } from "../config"
import type { RegisterRequest, LoginRequest, AuthResponse, ApiResponse } from "../types"

export const authService = {
  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, data)

    if (response.data?.token) {
      apiClient.setToken(response.data.token)
    }

    return response
  },

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, data)

    if (response.data?.token) {
      apiClient.setToken(response.data.token)
    }

    return response
  },

  async logout(): Promise<ApiResponse> {
    const response = await apiClient.post<ApiResponse>(API_ENDPOINTS.AUTH.LOGOUT)
    apiClient.setToken(null)
    return response
  },

  async refresh(): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REFRESH)

    if (response.data?.token) {
      apiClient.setToken(response.data.token)
    }

    return response
  },

  async verify(): Promise<ApiResponse<{ valid: boolean }>> {
    return apiClient.post<ApiResponse<{ valid: boolean }>>(API_ENDPOINTS.AUTH.VERIFY)
  },

  isAuthenticated(): boolean {
    return !!apiClient.getToken()
  },
}
