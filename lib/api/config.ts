export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://31.97.35.174:5000",
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || "http://31.97.35.174:5000",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    VERIFY: "/api/auth/verify",
  },
  // User Management
  USER: {
    PROFILE: "/api/user/profile",
    BALANCE: "/api/user/balance",
    TRANSACTIONS: "/api/user/transactions",
    ACHIEVEMENTS: "/api/user/achievements",
    STATS: "/api/user/stats",
  },
  // Coins & Payments
  COINS: {
    PURCHASE: "/api/coins/purchase",
    WITHDRAW: "/api/coins/withdraw",
    EXCHANGE_RATE: "/api/coins/exchange-rate",
  },
  // Mystery Boxes
  BOXES: {
    LIST: "/api/boxes",
    DETAIL: (id: string) => `/api/boxes/${id}`,
    OPEN: (id: string) => `/api/boxes/${id}/open`,
    CATEGORIES: "/api/boxes/categories",
  },
  // Games
  GAMES: {
    LIST: "/api/games",
    JUMP_IRISH_GUY: {
      PLAY: "/api/games/jump-irish-guy/play",
    },
    CRASH: {
      BET: "/api/games/crash/bet",
      CASHOUT: "/api/games/crash/cashout",
    },
    PLINKO: {
      DROP: "/api/games/plinko/drop",
    },
    KENO: {
      PLAY: "/api/games/keno/play",
    },
    MINES: {
      PLAY: "/api/games/mines/play",
    },
    BATTLE: {
      CREATE: "/api/games/battle/create",
      JOIN: "/api/games/battle/join",
    },
  },
  // Live Features
  LIVE: {
    DROPS: "/api/live-drops/drops",
    FEATURED: "/api/live-drops/drops/featured",
    ACTIVITY: "/api/live-drops/activity",
    STATS: "/api/live-drops/stats",
    LEADERBOARD: "/api/live-drops/leaderboard",
    RECENT_WINS: "/api/live-drops/recent-wins",
    TRACK: "/api/live-drops/activity/track",
  },
  // Health
  HEALTH: {
    CHECK: "/health",
    DETAILED: "/health/detailed",
    READY: "/health/ready",
    LIVE: "/health/live",
  },
} as const

export const SOCKET_EVENTS = {
  // Connection
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  AUTHENTICATE: "authenticate",

  // Global Events
  JOIN_GLOBAL: "join_global",
  LEAVE_GLOBAL: "leave_global",
  NEW_DROP: "new_drop",
  PLAYER_COUNT_UPDATE: "player_count_update",

  // Crash Game
  JOIN_CRASH_GAME: "join_crash_game",
  LEAVE_CRASH_GAME: "leave_crash_game",
  CRASH_GAME_STARTING: "crash_game_starting",
  CRASH_GAME_TICK: "crash_game_tick",
  CRASH_GAME_CRASHED: "crash_game_crashed",
  CRASH_BET_PLACED: "crash_bet_placed",
  CRASH_CASHOUT: "crash_cashout",

  // Box Battle
  JOIN_BATTLE: "join_battle",
  LEAVE_BATTLE: "leave_battle",
  BATTLE_PLAYER_JOINED: "battle_player_joined",
  BATTLE_STARTED: "battle_started",
  BATTLE_ROUND_RESULT: "battle_round_result",
  BATTLE_ENDED: "battle_ended",
} as const
