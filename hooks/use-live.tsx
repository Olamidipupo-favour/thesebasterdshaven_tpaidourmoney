"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { liveService } from "@/lib/api/services/live.service"
import type { LiveDrop, LiveStats, LeaderboardEntry } from "@/lib/api/types"

export function useLiveStats() {
  const { data, error, isLoading, mutate } = useSWR("live-stats", async () => {
    const response = await liveService.getStats()
    return response.data
  })

  return {
    stats: data as LiveStats | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useLiveDrops() {
  const { data, error, isLoading, mutate } = useSWR("live-drops", async () => {
    const response = await liveService.getDrops()
    return response.data || []
  })

  return {
    drops: data as LiveDrop[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useFeaturedDrops() {
  const { data, error, isLoading, mutate } = useSWR("featured-drops", async () => {
    const response = await liveService.getFeaturedDrops()
    return response.data || []
  })

  return {
    drops: data as LiveDrop[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useRecentWins() {
  const { data, error, isLoading, mutate } = useSWR("recent-wins", async () => {
    const response = await liveService.getRecentWins()
    return response.data || []
  })

  return {
    wins: data as LiveDrop[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useLeaderboard() {
  const { data, error, isLoading, mutate } = useSWR("leaderboard", async () => {
    const response = await liveService.getLeaderboard()
    return response.data || []
  })

  return {
    leaderboard: data as LeaderboardEntry[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useLiveActivity() {
  const { data, error, isLoading, mutate } = useSWR("live-activity", async () => {
    const response = await liveService.getActivity()
    return response.data || []
  })

  return {
    activity: data as any[] | undefined,
    isLoading,
    error,
    mutate,
  }
}

export function useTrackActivity() {
  const [isTracking, setIsTracking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const trackActivity = async (data: {
    activity_type: string
    activity_data: Record<string, any>
  }): Promise<boolean> => {
    setIsTracking(true)
    setError(null)

    try {
      const response = await liveService.trackActivity(data)
      return response.success
    } catch (err: any) {
      setError(err.message || "Failed to track activity")
      return false
    } finally {
      setIsTracking(false)
    }
  }

  return {
    trackActivity,
    isTracking,
    error,
  }
}
