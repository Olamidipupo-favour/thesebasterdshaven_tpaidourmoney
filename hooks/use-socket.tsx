"use client"

import { useEffect, useState } from "react"
import { socketService } from "@/lib/api/socket"
import { SOCKET_EVENTS } from "@/lib/api/config"
import { useAuth } from "./use-auth"
import type { LiveDrop } from "@/lib/api/types"

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) return

    const socket = socketService.connect()

    socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("[v0] Socket connected")
      setIsConnected(true)
    })

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("[v0] Socket disconnected")
      setIsConnected(false)
    })

    return () => {
      socketService.disconnect()
      setIsConnected(false)
    }
  }, [isAuthenticated])

  return {
    isConnected,
    socket: socketService.getSocket(),
  }
}

export function useLiveDrops() {
  const [drops, setDrops] = useState<LiveDrop[]>([])
  const { isConnected } = useSocket()

  useEffect(() => {
    if (!isConnected) return

    // Join global room to receive live drops
    socketService.joinGlobal()

    // Listen for new drops
    const handleNewDrop = (drop: LiveDrop) => {
      console.log("[v0] New drop received:", drop)
      setDrops((prev) => [drop, ...prev].slice(0, 10)) // Keep last 10 drops
    }

    socketService.on(SOCKET_EVENTS.NEW_DROP, handleNewDrop)

    return () => {
      socketService.off(SOCKET_EVENTS.NEW_DROP, handleNewDrop)
      socketService.leaveGlobal()
    }
  }, [isConnected])

  return {
    drops,
    isConnected,
  }
}

export function useCrashGame() {
  const [gameState, setGameState] = useState<{
    multiplier: number
    status: "waiting" | "running" | "crashed"
    players: number
  }>({
    multiplier: 1.0,
    status: "waiting",
    players: 0,
  })
  const { isConnected } = useSocket()

  useEffect(() => {
    if (!isConnected) return

    // Join crash game room
    socketService.joinCrashGame()

    // Listen for game events
    const handleGameStarting = () => {
      console.log("[v0] Crash game starting")
      setGameState((prev) => ({ ...prev, status: "running", multiplier: 1.0 }))
    }

    const handleGameTick = (data: { multiplier: number }) => {
      setGameState((prev) => ({ ...prev, multiplier: data.multiplier }))
    }

    const handleGameCrashed = (data: { multiplier: number }) => {
      console.log("[v0] Crash game crashed at:", data.multiplier)
      setGameState((prev) => ({ ...prev, status: "crashed", multiplier: data.multiplier }))
    }

    socketService.on(SOCKET_EVENTS.CRASH_GAME_STARTING, handleGameStarting)
    socketService.on(SOCKET_EVENTS.CRASH_GAME_TICK, handleGameTick)
    socketService.on(SOCKET_EVENTS.CRASH_GAME_CRASHED, handleGameCrashed)

    return () => {
      socketService.off(SOCKET_EVENTS.CRASH_GAME_STARTING, handleGameStarting)
      socketService.off(SOCKET_EVENTS.CRASH_GAME_TICK, handleGameTick)
      socketService.off(SOCKET_EVENTS.CRASH_GAME_CRASHED, handleGameCrashed)
      socketService.leaveCrashGame()
    }
  }, [isConnected])

  return {
    gameState,
    isConnected,
  }
}

export function useBoxBattle(battleId: string | null) {
  const [battleState, setBattleState] = useState<{
    players: any[]
    status: "waiting" | "active" | "ended"
    currentRound: number
  }>({
    players: [],
    status: "waiting",
    currentRound: 0,
  })
  const { isConnected } = useSocket()

  useEffect(() => {
    if (!isConnected || !battleId) return

    // Join battle room
    socketService.joinBattle(battleId)

    // Listen for battle events
    const handlePlayerJoined = (data: any) => {
      console.log("[v0] Player joined battle:", data)
      setBattleState((prev) => ({
        ...prev,
        players: [...prev.players, data.player],
      }))
    }

    const handleBattleStarted = () => {
      console.log("[v0] Battle started")
      setBattleState((prev) => ({ ...prev, status: "active" }))
    }

    const handleRoundResult = (data: any) => {
      console.log("[v0] Round result:", data)
      setBattleState((prev) => ({
        ...prev,
        currentRound: data.round,
      }))
    }

    const handleBattleEnded = (data: any) => {
      console.log("[v0] Battle ended:", data)
      setBattleState((prev) => ({ ...prev, status: "ended" }))
    }

    socketService.on(SOCKET_EVENTS.BATTLE_PLAYER_JOINED, handlePlayerJoined)
    socketService.on(SOCKET_EVENTS.BATTLE_STARTED, handleBattleStarted)
    socketService.on(SOCKET_EVENTS.BATTLE_ROUND_RESULT, handleRoundResult)
    socketService.on(SOCKET_EVENTS.BATTLE_ENDED, handleBattleEnded)

    return () => {
      socketService.off(SOCKET_EVENTS.BATTLE_PLAYER_JOINED, handlePlayerJoined)
      socketService.off(SOCKET_EVENTS.BATTLE_STARTED, handleBattleStarted)
      socketService.off(SOCKET_EVENTS.BATTLE_ROUND_RESULT, handleRoundResult)
      socketService.off(SOCKET_EVENTS.BATTLE_ENDED, handleBattleEnded)
      socketService.leaveBattle(battleId)
    }
  }, [isConnected, battleId])

  return {
    battleState,
    isConnected,
  }
}

export function useLiveStats() {
  const [stats, setStats] = useState<{
    total_players_online: number
    total_games_active: number
    total_wagered_today: number
    biggest_win_today: number
  } | null>(null)
  const { isConnected } = useSocket()

  useEffect(() => {
    if (!isConnected) return

    // Listen for live stats updates
    const handleStatsUpdate = (data: any) => {
      console.log("[v0] Live stats updated:", data)
      setStats(data)
    }

    socketService.on(SOCKET_EVENTS.LIVE_STATS_UPDATE, handleStatsUpdate)

    return () => {
      socketService.off(SOCKET_EVENTS.LIVE_STATS_UPDATE, handleStatsUpdate)
    }
  }, [isConnected])

  return {
    stats,
    isConnected,
  }
}