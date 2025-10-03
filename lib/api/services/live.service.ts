import { apiClient } from "../client"
import { API_ENDPOINTS } from "../config"
import type { LiveDrop, LiveStats, LeaderboardEntry, ApiResponse } from "../types"

export const liveService = {
  async getDrops(): Promise<ApiResponse<LiveDrop[]>> {
    return apiClient.get<ApiResponse<LiveDrop[]>>(API_ENDPOINTS.LIVE.DROPS)
  },

  async getFeaturedDrops(): Promise<ApiResponse<LiveDrop[]>> {
    return apiClient.get<ApiResponse<LiveDrop[]>>(API_ENDPOINTS.LIVE.FEATURED)
  },

  async getActivity(): Promise<ApiResponse<any[]>> {
    return apiClient.get<ApiResponse<any[]>>(API_ENDPOINTS.LIVE.ACTIVITY)
  },

  async getStats(): Promise<ApiResponse<LiveStats>> {
    return apiClient.get<ApiResponse<LiveStats>>(API_ENDPOINTS.LIVE.STATS)
  },

  async getLeaderboard(): Promise<ApiResponse<LeaderboardEntry[]>> {
    return apiClient.get<ApiResponse<LeaderboardEntry[]>>(API_ENDPOINTS.LIVE.LEADERBOARD)
  },

  async getRecentWins(): Promise<ApiResponse<LiveDrop[]>> {
    return apiClient.get<ApiResponse<LiveDrop[]>>(API_ENDPOINTS.LIVE.RECENT_WINS)
  },

  async trackActivity(data: {
    activity_type: string
    activity_data: Record<string, any>
  }): Promise<ApiResponse> {
    return apiClient.post<ApiResponse>(API_ENDPOINTS.LIVE.TRACK, data)
  },
}
