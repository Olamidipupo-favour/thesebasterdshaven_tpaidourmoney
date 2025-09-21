"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, TrendingUp } from "lucide-react"

const liveDrops = [
  {
    id: 1,
    name: "Lucky Leprechaun Box",
    price: "$1.69",
    image: "/leprechaun-treasure-box.jpg",
    winner: "Patrick_Lucky",
    timeAgo: "2m ago",
  },
  {
    id: 2,
    name: "Emerald Mystery",
    price: "$2.69",
    image: "/emerald-mystery-box.jpg",
    winner: "Irish_Gamer",
    timeAgo: "5m ago",
  },
  {
    id: 3,
    name: "Rainbow Treasure",
    price: "$89.99",
    image: "/rainbow-treasure-chest.jpg",
    winner: "LuckyCharm77",
    timeAgo: "8m ago",
  },
  {
    id: 4,
    name: "Clover Collection",
    price: "$199.99",
    image: "/four-leaf-clover-collection.jpg",
    winner: "GreenGold",
    timeAgo: "12m ago",
  },
  {
    id: 5,
    name: "Pot of Gold",
    price: "$22.99",
    image: "/pot-of-gold-gaming.jpg",
    winner: "Dublin_Dan",
    timeAgo: "15m ago",
  },
]

export function LiveDropsSidebar() {
  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-sidebar-foreground flex items-center">
            <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></div>
            LIVE DROPS
          </h2>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            <TrendingUp className="w-3 h-3 mr-1" />
            Hot
          </Badge>
        </div>

        <div className="space-y-3">
          {liveDrops.map((drop) => (
            <Card
              key={drop.id}
              className="p-3 bg-sidebar-accent border-sidebar-border hover:bg-sidebar-accent/80 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={drop.image || "/placeholder.svg"}
                  alt={drop.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-sidebar-foreground truncate">{drop.name}</h3>
                  <p className="text-xs text-sidebar-foreground/60">Won by {drop.winner}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-primary">{drop.price}</span>
                    <div className="flex items-center text-xs text-sidebar-foreground/60">
                      <Clock className="w-3 h-3 mr-1" />
                      {drop.timeAgo}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button className="w-full mt-4 glow-effect" size="sm">
          View All Live Drops
        </Button>
      </div>
    </div>
  )
}
