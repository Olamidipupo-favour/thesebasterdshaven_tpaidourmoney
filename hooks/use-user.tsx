"use client"

import useSWR from "swr"
import { userService } from "@/lib/api/services/user.service"
import type { User, Transaction, Achievement, UserStats, UserBalance } from "@/lib/api/types"

export function useUserProfile() {
  const { data, error, isLoading, mutate } = useSWR("user-profile", async () => {
    const response = await userService.getProfile()
    return response.data
  })

  return {
    user: data as User | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useUserBalance() {
  const { data, error, isLoading, mutate } = useSWR("user-balance", async () => {
    const response = await userService.getBalance()
    return response.data
  })

  return {
    balance: data as UserBalance | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useUserTransactions() {
  const { data, error, isLoading } = useSWR("user-transactions", async () => {
    const response = await userService.getTransactions()
    return response.data || []
  })

  return {
    transactions: data as Transaction[] | undefined,
    isLoading,
    error,
  }
}

export function useUserAchievements() {
  const { data, error, isLoading } = useSWR("user-achievements", async () => {
    const response = await userService.getAchievements()
    return response.data || []
  })

  return {
    achievements: data as Achievement[] | undefined,
    isLoading,
    error,
  }
}

export function useUserStats() {
  const { data, error, isLoading } = useSWR("user-stats", async () => {
    const response = await userService.getStats()
    return response.data
  })

  return {
    stats: data as UserStats | undefined,
    isLoading,
    error,
  }
}
