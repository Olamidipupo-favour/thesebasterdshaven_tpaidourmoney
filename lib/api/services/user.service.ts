import { apiClient } from "../client"
import { API_ENDPOINTS } from "../config"
import type { User, UserBalance, Transaction, Achievement, UserStats, ApiResponse } from "../types"

export const userService = {
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(API_ENDPOINTS.USER.PROFILE)
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<ApiResponse<User>>(API_ENDPOINTS.USER.PROFILE, data)
  },

  async getBalance(): Promise<ApiResponse<UserBalance>> {
    return apiClient.get<ApiResponse<UserBalance>>(API_ENDPOINTS.USER.BALANCE)
  },

  async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    return apiClient.get<ApiResponse<Transaction[]>>(API_ENDPOINTS.USER.TRANSACTIONS)
  },

  async getAchievements(): Promise<ApiResponse<Achievement[]>> {
    return apiClient.get<ApiResponse<Achievement[]>>(API_ENDPOINTS.USER.ACHIEVEMENTS)
  },

  async getStats(): Promise<ApiResponse<UserStats>> {
    return apiClient.get<ApiResponse<UserStats>>(API_ENDPOINTS.USER.STATS)
  },
}
