"use client"

import { io, type Socket } from "socket.io-client"
import { API_CONFIG, SOCKET_EVENTS } from "./config"
import { apiClient } from "./client"

class SocketService {
  private socket: Socket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  connect() {
    if (this.socket?.connected) {
      return this.socket
    }

    this.socket = io(API_CONFIG.SOCKET_URL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: this.maxReconnectAttempts,
    })

    this.setupEventListeners()
    return this.socket
  }

  private setupEventListeners() {
    if (!this.socket) return

    this.socket.on(SOCKET_EVENTS.CONNECT, () => {
      console.log("[v0] Socket connected")
      this.reconnectAttempts = 0
      this.authenticate()
    })

    this.socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log("[v0] Socket disconnected")
    })

    this.socket.on("connect_error", (error) => {
      console.error("[v0] Socket connection error:", error)
      this.reconnectAttempts++
    })
  }

  private authenticate() {
    const token = apiClient.getToken()
    if (token && this.socket) {
      this.socket.emit(SOCKET_EVENTS.AUTHENTICATE, { token })
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  emit(event: string, data?: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data)
    } else {
      console.warn("[v0] Socket not connected, cannot emit event:", event)
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }

  // Convenience methods for common events
  joinGlobal() {
    this.emit(SOCKET_EVENTS.JOIN_GLOBAL)
  }

  leaveGlobal() {
    this.emit(SOCKET_EVENTS.LEAVE_GLOBAL)
  }

  joinCrashGame() {
    this.emit(SOCKET_EVENTS.JOIN_CRASH_GAME)
  }

  leaveCrashGame() {
    this.emit(SOCKET_EVENTS.LEAVE_CRASH_GAME)
  }

  joinBattle(battleId: string) {
    this.emit(SOCKET_EVENTS.JOIN_BATTLE, { battle_id: battleId })
  }

  leaveBattle(battleId: string) {
    this.emit(SOCKET_EVENTS.LEAVE_BATTLE, { battle_id: battleId })
  }

  getSocket(): Socket | null {
    return this.socket
  }
}

export const socketService = new SocketService()
