"use client"

import { useState } from "react"
import useSWR from "swr"
import { gamesService } from "@/lib/api/services/games.service"
import type { Game } from "@/lib/api/types"

export function useGames() {
  const { data, error, isLoading, mutate } = useSWR("games", async () => {
    const response = await gamesService.getGames()
    return response.data || []
  })

  return {
    games: data as Game[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useJumpIrishGuy() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const playGame = async (): Promise<{ coins_earned: number } | null> => {
    setIsPlaying(true)
    setError(null)

    try {
      const response = await gamesService.playJumpIrishGuy()
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to play game")
      }
    } catch (err: any) {
      setError(err.message || "Failed to play game")
      return null
    } finally {
      setIsPlaying(false)
    }
  }

  return {
    playGame,
    isPlaying,
    error,
  }
}

export function useCrashGame() {
  const [isBetting, setIsBetting] = useState(false)
  const [isCashingOut, setIsCashingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeBet = async (data: { amount: number; auto_cashout?: number }): Promise<{ bet_id: string; game_id: string } | null> => {
    setIsBetting(true)
    setError(null)

    try {
      const response = await gamesService.placeCrashBet(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to place bet")
      }
    } catch (err: any) {
      setError(err.message || "Failed to place bet")
      return null
    } finally {
      setIsBetting(false)
    }
  }

  const cashout = async (data: { game_id: string; bet_id: string }): Promise<{ payout: number; multiplier: number } | null> => {
    setIsCashingOut(true)
    setError(null)

    try {
      const response = await gamesService.crashCashout(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to cashout")
      }
    } catch (err: any) {
      setError(err.message || "Failed to cashout")
      return null
    } finally {
      setIsCashingOut(false)
    }
  }

  return {
    placeBet,
    cashout,
    isBetting,
    isCashingOut,
    error,
  }
}

export function usePlinko() {
  const [isDropping, setIsDropping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dropBall = async (data: { bet_amount: number; risk: "low" | "medium" | "high"; rows: number }): Promise<{ path: number[]; multiplier: number; payout: number } | null> => {
    setIsDropping(true)
    setError(null)

    try {
      const response = await gamesService.dropPlinko(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to drop ball")
      }
    } catch (err: any) {
      setError(err.message || "Failed to drop ball")
      return null
    } finally {
      setIsDropping(false)
    }
  }

  return {
    dropBall,
    isDropping,
    error,
  }
}

export function useKeno() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const playKeno = async (data: { bet_amount: number; selected_numbers: number[]; risk: "low" | "medium" | "high" }): Promise<{ drawn_numbers: number[]; matches: number; payout: number } | null> => {
    setIsPlaying(true)
    setError(null)

    try {
      const response = await gamesService.playKeno(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to play keno")
      }
    } catch (err: any) {
      setError(err.message || "Failed to play keno")
      return null
    } finally {
      setIsPlaying(false)
    }
  }

  return {
    playKeno,
    isPlaying,
    error,
  }
}

export function useMines() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const playMines = async (data: { bet_amount: number; mine_count: number; revealed_tiles: number[] }): Promise<{ revealed: boolean[]; hit_mine: boolean; payout: number } | null> => {
    setIsPlaying(true)
    setError(null)

    try {
      const response = await gamesService.playMines(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to play mines")
      }
    } catch (err: any) {
      setError(err.message || "Failed to play mines")
      return null
    } finally {
      setIsPlaying(false)
    }
  }

  return {
    playMines,
    isPlaying,
    error,
  }
}

export function useBoxBattle() {
  const [isCreating, setIsCreating] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBattle = async (data: { box_id: string; player_count: number; is_private: boolean }): Promise<{ battle_id: string } | null> => {
    setIsCreating(true)
    setError(null)

    try {
      const response = await gamesService.createBattle(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to create battle")
      }
    } catch (err: any) {
      setError(err.message || "Failed to create battle")
      return null
    } finally {
      setIsCreating(false)
    }
  }

  const joinBattle = async (data: { battle_id: string }): Promise<{ success: boolean } | null> => {
    setIsJoining(true)
    setError(null)

    try {
      const response = await gamesService.joinBattle(data)
      if (response.success && response.data) {
        return response.data
      } else {
        throw new Error(response.message || "Failed to join battle")
      }
    } catch (err: any) {
      setError(err.message || "Failed to join battle")
      return null
    } finally {
      setIsJoining(false)
    }
  }

  return {
    createBattle,
    joinBattle,
    isCreating,
    isJoining,
    error,
  }
}
