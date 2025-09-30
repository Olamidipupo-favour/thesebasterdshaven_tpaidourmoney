import { apiClient } from "../client"
import { API_ENDPOINTS } from "../config"
import type { MysteryBox, OpenBoxRequest, OpenBoxResponse, ApiResponse } from "../types"

export const boxesService = {
  async getBoxes(): Promise<ApiResponse<MysteryBox[]>> {
    return apiClient.get<ApiResponse<MysteryBox[]>>(API_ENDPOINTS.BOXES.LIST)
  },

  async getBox(id: string): Promise<ApiResponse<MysteryBox>> {
    return apiClient.get<ApiResponse<MysteryBox>>(API_ENDPOINTS.BOXES.DETAIL(id))
  },

  async openBox(id: string, data: OpenBoxRequest): Promise<ApiResponse<OpenBoxResponse>> {
    return apiClient.post<ApiResponse<OpenBoxResponse>>(API_ENDPOINTS.BOXES.OPEN(id), data)
  },

  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiClient.get<ApiResponse<string[]>>(API_ENDPOINTS.BOXES.CATEGORIES)
  },
}
