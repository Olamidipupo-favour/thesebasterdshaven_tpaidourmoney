"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Clock, User } from "lucide-react"
import { liveService } from "@/lib/api/services/live.service"
import { useLiveDrops } from "@/hooks/use-socket"
import type { LiveDrop } from "@/lib/api/types"

export function LiveDropsSidebar() {
  const { drops: realtimeDrops, isConnected } = useLiveDrops()
  const [initialDrops, setInitialDrops] = useState<LiveDrop[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInitialDrops = async () => {
      try {
        const response = await liveService.getRecentWins()
        if (response.success && response.data) {
          setInitialDrops(response.data)
        }
      } catch (error) {
        console.error("[v0] Failed to fetch initial drops:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialDrops()
  }, [])

  const allDrops = [...realtimeDrops, ...initialDrops].slice(0, 6)

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const dropTime = new Date(timestamp)
    const diffMs = now.getTime() - dropTime.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-sidebar-foreground flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${isConnected ? "bg-primary animate-pulse" : "bg-gray-500"}`}
            ></div>
            🔥 LIVE DROPS
          </h2>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            <TrendingUp className="w-3 h-3 mr-1" />
            Hot
          </Badge>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Zap className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : allDrops.length > 0 ? (
          <div className="space-y-3">
            {allDrops.map((drop, index) => (
              <Card 
                key={`${drop.id}-${index}`} 
                className="bg-card border-border overflow-hidden group hover:shadow-md transition-all duration-200"
              >
                <div className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {drop.user.username}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        won {drop.item.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">
                        ${drop.item.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        from {drop.box.name}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sidebar-foreground/60 text-sm">No live drops</div>
        )}

        <div className="flex items-center justify-between mt-6 space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            View All Live Drops
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            View All Recent Drops
          </Button>
        </div>
      </div>
    </div>
  )
}
