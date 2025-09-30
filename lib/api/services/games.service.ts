import { apiClient } from "../client"
import { API_ENDPOINTS } from "../config"
import type {
  Game,
  CrashBetRequest,
  CrashCashoutRequest,
  PlinkoBetRequest,
  KenoBetRequest,
  MinesBetRequest,
  BattleCreateRequest,
  BattleJoinRequest,
  ApiResponse,
} from "../types"

export const gamesService = {
  async getGames(): Promise<ApiResponse<Game[]>> {
    return apiClient.get<ApiResponse<Game[]>>(API_ENDPOINTS.GAMES.LIST)
  },

  // Jump Irish Guy
  async playJumpIrishGuy(): Promise<ApiResponse<{ coins_earned: number }>> {
    return apiClient.post<ApiResponse<{ coins_earned: number }>>(API_ENDPOINTS.GAMES.JUMP_IRISH_GUY.PLAY)
  },

  // Crash Game
  async placeCrashBet(data: CrashBetRequest): Promise<ApiResponse<{ bet_id: string; game_id: string }>> {
    return apiClient.post<ApiResponse<{ bet_id: string; game_id: string }>>(API_ENDPOINTS.GAMES.CRASH.BET, data)
  },

  async crashCashout(data: CrashCashoutRequest): Promise<ApiResponse<{ payout: number; multiplier: number }>> {
    return apiClient.post<ApiResponse<{ payout: number; multiplier: number }>>(API_ENDPOINTS.GAMES.CRASH.CASHOUT, data)
  },

  // Plinko
  async dropPlinko(
    data: PlinkoBetRequest,
  ): Promise<ApiResponse<{ path: number[]; multiplier: number; payout: number }>> {
    return apiClient.post<ApiResponse<{ path: number[]; multiplier: number; payout: number }>>(
      API_ENDPOINTS.GAMES.PLINKO.DROP,
      data,
    )
  },

  // Keno
  async playKeno(
    data: KenoBetRequest,
  ): Promise<ApiResponse<{ drawn_numbers: number[]; matches: number; payout: number }>> {
    return apiClient.post<ApiResponse<{ drawn_numbers: number[]; matches: number; payout: number }>>(
      API_ENDPOINTS.GAMES.KENO.PLAY,
      data,
    )
  },

  // Mines
  async playMines(
    data: MinesBetRequest,
  ): Promise<ApiResponse<{ revealed: boolean[]; hit_mine: boolean; payout: number }>> {
    return apiClient.post<ApiResponse<{ revealed: boolean[]; hit_mine: boolean; payout: number }>>(
      API_ENDPOINTS.GAMES.MINES.PLAY,
      data,
    )
  },

  // Box Battle
  async createBattle(data: BattleCreateRequest): Promise<ApiResponse<{ battle_id: string }>> {
    return apiClient.post<ApiResponse<{ battle_id: string }>>(API_ENDPOINTS.GAMES.BATTLE.CREATE, data)
  },

  async joinBattle(data: BattleJoinRequest): Promise<ApiResponse<{ success: boolean }>> {
    return apiClient.post<ApiResponse<{ success: boolean }>>(API_ENDPOINTS.GAMES.BATTLE.JOIN, data)
  },
}
