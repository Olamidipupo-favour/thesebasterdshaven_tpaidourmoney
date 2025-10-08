"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, User } from "lucide-react"
import type { LiveDrop } from "@/lib/api/types"

// Static dataset generator for live drops (20 items)
const generateStaticDrops = () => {
  const users = [
    "LuckyLeo", "SpinMaster", "CryptoQueen", "BoxHunter", "PrizePirate",
    "FortuneFox", "WinWizard", "LootLynx", "GambleGuru", "VaultViking",
    "TreasureTom", "MysteryMia", "CashCarl", "BonusBella", "JackpotJae",
    "TokenTara", "RiskRiley", "StakeSam", "RollRae", "ChanceChad"
  ]
  // Match previous design items and include images for rendering
  const items = [
    { id: "jordan6", name: "Jordan 6 Retro - Black Infrared", image: "https://cdn.rillabox.com/media/items/jordan6.png", value: 449, rarity: "rare", probability: 0.02 },
    { id: "bape-tee", name: "BAPE College Tee (SS22) - Navy", image: "https://cdn.rillabox.com/media/items/bape_tee_navy.png", value: 134, rarity: "common", probability: 0.12 },
    { id: "gopro-battery", name: "GoPro Dual Battery Charger & Battery", image: "https://cdn.rillabox.com/media/items/gopro_battery.png", value: 69.49, rarity: "common", probability: 0.18 },
    { id: "book-dior", name: "Book: Dior By Dior", image: "https://cdn.rillabox.com/media/items/dior_book.png", value: 18.99, rarity: "common", probability: 0.25 },
    { id: "supreme-arc-logo", name: "Supreme The North Face Arc Logo Tee", image: "https://cdn.rillabox.com/media/items/supreme_arc_logo.png", value: 58.89, rarity: "common", probability: 0.15 },
    { id: "airpods-pro", name: "AirPods Pro", image: "https://rillabox.com/images/items/airpods_pro.png", value: 249, rarity: "epic", probability: 0.05 },
    { id: "ps5", name: "PS5 Console", image: "https://rillabox.com/images/items/ps5.png", value: 499, rarity: "epic", probability: 0.03 },
    { id: "apple-watch", name: "Apple Watch", image: "https://rillabox.com/images/items/apple_watch.png", value: 399, rarity: "rare", probability: 0.04 },
    { id: "nintendo-switch", name: "Nintendo Switch", image: "https://rillabox.com/images/items/nintendo_switch.png", value: 299, rarity: "rare", probability: 0.06 },
    { id: "steam-gift", name: "Steam Gift Card", image: "https://rillabox.com/images/items/steam_gift_card.png", value: 100, rarity: "common", probability: 0.3 },
  ]
  const boxes = [
    { id: "apple-box", name: "Apple Box" }, { id: "fresh-kicks", name: "Fresh Kicks" }, { id: "electro-vault", name: "Electro Vault" },
    { id: "starter-pack", name: "Starter Pack" }, { id: "pro-gear", name: "Pro Gear Box" }, { id: "premium-tech", name: "Premium Tech" },
    { id: "surprise-vault", name: "Surprise Vault" }, { id: "lucky-loot", name: "Lucky Loot" }, { id: "high-roller", name: "High Roller" },
    { id: "daily-deals", name: "Daily Deals" }
  ]

  const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
  const now = Date.now()

  return Array.from({ length: 20 }, (_, i) => ({
    id: `static-${i + 1}`,
    user: { id: `user-${i + 1}`, username: pick(users) },
    item: pick(items),
    box: pick(boxes),
    timestamp: new Date(now - Math.floor(Math.random() * 60) * 60000).toISOString()
  })) as unknown as LiveDrop[]
}

export function LiveDropsSidebar() {
  const [isConnected] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [rotationIndex, setRotationIndex] = useState(0)

  // Pre-generate static drops once
  const [staticDrops] = useState<LiveDrop[]>(() => generateStaticDrops())

  // Rotate displayed window every 5 seconds
  useEffect(() => {
    const ITEMS_TO_SHOW = 6
    const interval = setInterval(() => {
      setRotationIndex(prev => (prev + ITEMS_TO_SHOW) % staticDrops.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [staticDrops.length])

  const ITEMS_TO_SHOW = 6
  const allDrops = staticDrops
  const displayedDrops = allDrops.length >= ITEMS_TO_SHOW
    ? [
        ...allDrops.slice(rotationIndex, Math.min(rotationIndex + ITEMS_TO_SHOW, allDrops.length)),
        ...(rotationIndex + ITEMS_TO_SHOW > allDrops.length
          ? allDrops.slice(0, (rotationIndex + ITEMS_TO_SHOW) % allDrops.length)
          : [])
      ]
    : allDrops

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-sidebar-foreground">LIVE DROPS</h2>
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-red-500" : "bg-gray-500"}`} />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Zap className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : displayedDrops.length > 0 ? (
          <div className="space-y-3">
            {displayedDrops.map((drop, index) => (
              <Card
                key={`${drop.id}-${index}`}
                className="relative overflow-hidden rounded-xl bg-[#0e1713] border-none group"
              >
                {/* Animated gradient strip to match old design */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/40 via-emerald-500/20 to-transparent animate-pulse" />
                <div className="relative p-3">
                  <div className="flex items-center gap-3">
                    {/* Product image */}
                    <div className="w-10 h-10 rounded-md bg-black/30 border border-white/5 overflow-hidden flex items-center justify-center">
                      {drop.item.image ? (
                        <img src={drop.item.image} alt={drop.item.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-primary" />
                      )}
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {drop.item.name}
                      </div>
                      <div className="text-[11px] text-white/70 truncate">{drop.user.username}</div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-base font-bold text-white">${drop.item.value}</div>
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
          <Button variant="outline" size="sm" className="flex-1">View All Live Drops</Button>
          <Button variant="outline" size="sm" className="flex-1">View All Recent Drops</Button>
        </div>
      </div>
    </div>
  )
}
