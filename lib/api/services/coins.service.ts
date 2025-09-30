import { apiClient } from "../client"
import { API_ENDPOINTS } from "../config"
import type { PurchaseCoinsRequest, WithdrawRequest, ExchangeRate, ApiResponse } from "../types"

export const coinsService = {
  async purchaseCoins(
    data: PurchaseCoinsRequest,
  ): Promise<ApiResponse<{ transaction_id: string; coins_added: number }>> {
    return apiClient.post<ApiResponse<{ transaction_id: string; coins_added: number }>>(
      API_ENDPOINTS.COINS.PURCHASE,
      data,
    )
  },

  async withdraw(data: WithdrawRequest): Promise<ApiResponse<{ transaction_id: string }>> {
    return apiClient.post<ApiResponse<{ transaction_id: string }>>(API_ENDPOINTS.COINS.WITHDRAW, data)
  },

  async getExchangeRate(): Promise<ApiResponse<ExchangeRate>> {
    return apiClient.get<ApiResponse<ExchangeRate>>(API_ENDPOINTS.COINS.EXCHANGE_RATE)
  },
}
