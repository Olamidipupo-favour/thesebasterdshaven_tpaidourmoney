"use client"

import type React from "react"

import { useEffect } from "react"
import { useSocket } from "@/hooks/use-socket"

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { isConnected } = useSocket()

  useEffect(() => {
    console.log("[v0] Socket connection status:", isConnected ? "connected" : "disconnected")
  }, [isConnected])

  return <>{children}</>
}
