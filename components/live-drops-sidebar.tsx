"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap, Clock } from "lucide-react"
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

  const allDrops = [...realtimeDrops, ...initialDrops].slice(0, 10)

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
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-sidebar-foreground flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${isConnected ? "bg-primary animate-pulse" : "bg-gray-500"}`}
            ></div>
            LIVE DROPS
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
        ) : (
          <Tabs defaultValue="live" className="space-y-3">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="live" className="rounded-none">
                Live
              </TabsTrigger>
              <TabsTrigger value="recent" className="rounded-none">
                Recent
              </TabsTrigger>
            </TabsList>
            <TabsContent value="live">
              {realtimeDrops.length > 0 ? (
                realtimeDrops.map((drop, index) => (
                  <Card
                    key={`${drop.id}-${index}`}
                    className="p-3 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 transition-colors cursor-pointer animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={drop.item.image || "/placeholder.svg"}
                        alt={drop.item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-sidebar-foreground truncate">{drop.box.name}</h3>
                        <p className="text-xs text-sidebar-foreground/60">Won by {drop.user.username}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-bold text-primary">${drop.item.value.toFixed(2)}</span>
                          <div className="flex items-center text-xs text-sidebar-foreground/60">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeAgo(drop.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-sidebar-foreground/60 text-sm">No live drops</div>
              )}
            </TabsContent>
            <TabsContent value="recent">
              {initialDrops.length > 0 ? (
                initialDrops.map((drop, index) => (
                  <Card
                    key={`${drop.id}-${index}`}
                    className="p-3 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 transition-colors cursor-pointer animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={drop.item.image || "/placeholder.svg"}
                        alt={drop.item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-sidebar-foreground truncate">{drop.box.name}</h3>
                        <p className="text-xs text-sidebar-foreground/60">Won by {drop.user.username}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm font-bold text-primary">${drop.item.value.toFixed(2)}</span>
                          <div className="flex items-center text-xs text-sidebar-foreground/60">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeAgo(drop.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-sidebar-foreground/60 text-sm">No recent drops</div>
              )}
            </TabsContent>
          </Tabs>
        )}

        <div className="flex items-center justify-between mt-4">
          <button className="glow-effect" size="sm">
            View All Live Drops
          </button>
          <button className="glow-effect" size="sm">
            View All Recent Drops
          </button>
        </div>
      </div>
    </div>
  )
}
