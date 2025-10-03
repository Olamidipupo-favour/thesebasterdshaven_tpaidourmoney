export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Authentication Types
export interface RegisterRequest {
  username: string
  email: string
  password: string
  date_of_birth: string
  country: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  refresh_token?: string
  user: User
}

// User Types
export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  balance: number
  level: number
  xp: number
  created_at: string
}

export interface UserBalance {
  coins: number
  usd_equivalent: number
}

export interface Transaction {
  id: string
  type: "deposit" | "withdrawal" | "bet" | "win" | "purchase"
  amount: number
  description: string
  created_at: string
  status: "pending" | "completed" | "failed"
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  max_progress: number
  reward_coins: number
}

export interface UserStats {
  total_games_played: number
  total_wins: number
  total_losses: number
  win_rate: number
  total_wagered: number
  total_won: number
  profit_loss: number
  favorite_game: string
}

// Coins & Payments Types
export interface PurchaseCoinsRequest {
  usd_amount: number
  payment_method: string
  payment_token: string
}

export interface WithdrawRequest {
  usd_amount: number
  payment_method: string
  payment_details: Record<string, any>
}

export interface ExchangeRate {
  coins_per_usd: number
  usd_per_coin: number
}

// Mystery Box Types
export interface MysteryBox {
  id: string
  name: string
  description: string
  image: string
  price: number
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  items: BoxItem[]
  total_value: number
  trending?: boolean
}

export interface BoxItem {
  id: string
  name: string
  image: string
  value: number
  rarity: "common" | "rare" | "epic" | "legendary"
  probability: number
}

export interface OpenBoxRequest {
  quantity: number
  payment_method: "coins" | "usd"
}

export interface OpenBoxResponse {
  items: BoxItem[]
  total_value: number
  profit: number
}

// Game Types
export interface Game {
  id: string
  name: string
  slug: string
  description: string
  image: string
  category: string
  min_bet: number
  max_bet: number
  is_active: boolean
}

export interface CrashBetRequest {
  amount: number
  auto_cashout?: number
}

export interface CrashCashoutRequest {
  game_id: string
  bet_id: string
}

export interface PlinkoBetRequest {
  bet_amount: number
  risk: "low" | "medium" | "high"
  rows: number
}

export interface KenoBetRequest {
  bet_amount: number
  selected_numbers: number[]
  risk: "low" | "medium" | "high"
}

export interface MinesBetRequest {
  bet_amount: number
  mine_count: number
  revealed_tiles: number[]
}

export interface BattleCreateRequest {
  box_id: string
  player_count: number
  is_private: boolean
}

export interface BattleJoinRequest {
  battle_id: string
}

// Live Features Types
export interface LiveDrop {
  id: string
  user: {
    id: string
    username: string
    avatar?: string
  }
  item: BoxItem
  box: {
    id: string
    name: string
  }
  timestamp: string
}

export interface LiveStats {
  total_players_online: number
  total_games_active: number
  total_wagered_today: number
  biggest_win_today: number
}

export interface LeaderboardEntry {
  rank: number
  user: {
    id: string
    username: string
    avatar?: string
  }
  total_won: number
  games_played: number
}
