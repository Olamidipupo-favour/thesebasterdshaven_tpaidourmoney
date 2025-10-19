"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Gift,
  Swords,
  TrendingUp,
  Target,
  Dices,
  Calculator,
  Bomb,
  Play,
  Coins,
  Trophy,
  Users,
  Clock,
  Zap,
} from "lucide-react"

interface Game {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  category: "mystery" | "battle" | "crash" | "plinko" | "numbers" | "earn"
  minBet: number
  maxWin: string
  players?: number
  isLive?: boolean
  difficulty?: "Easy" | "Medium" | "Hard"
  featured?: boolean
}

const games: Game[] = [
  {
    id: 1,
    name: "Mystery Boxes",
    description: "Open boxes and discover amazing prizes with Irish luck",
    icon: <Gift className="w-8 h-8" />,
    category: "mystery",
    minBet: 125,
    maxWin: "$500",
    players: 1247,
    isLive: true,
    featured: true,
  },
  {
    id: 2,
    name: "Find the Prize",
    description: "Challenge other players in mystery box duels",
    icon: <Swords className="w-8 h-8" />,
    category: "battle",
    minBet: 250,
    maxWin: "$1,000",
    players: 892,
    isLive: true,
  },
  {
    id: 3,
    name: "Soccer Game",
    description: "Watch the multiplier rise and cash out before it crashes",
    icon: <TrendingUp className="w-8 h-8" />,
    category: "crash",
    minBet: 50,
    maxWin: "$10,000",
    players: 2156,
    isLive: true,
  },
  {
    id: 4,
    name: "Chicken Road",
    description: "Drop the ball and watch it bounce to fortune",
    icon: <Target className="w-8 h-8" />,
    category: "plinko",
    minBet: 25,
    maxWin: "$2,500",
    players: 634,
    isLive: true,
  },
  {
    id: 5,
    name: "Lucky Numbers (1-100)",
    description: "Pick your lucky number and win big with Irish fortune",
    icon: <Dices className="w-8 h-8" />,
    category: "numbers",
    minBet: 10,
    maxWin: "$5,000",
    players: 445,
    difficulty: "Easy",
  },
  {
    id: 6,
    name: "Celtic Keno",
    description: "Choose numbers and let the luck of the Irish guide you",
    icon: <Calculator className="w-8 h-8" />,
    category: "numbers",
    minBet: 25,
    maxWin: "$7,500",
    players: 312,
    difficulty: "Medium",
  },
  {
    id: 7,
    name: "Shamrock Mines",
    description: "Navigate the minefield to find hidden treasures",
    icon: <Bomb className="w-8 h-8" />,
    category: "numbers",
    minBet: 50,
    maxWin: "$15,000",
    players: 189,
    difficulty: "Hard",
  },
  {
    id: 8,
    name: "Jump Irish Guy",
    description: "Help our mascot jump and earn Local Coins for free!",
    icon: <Play className="w-8 h-8" />,
    category: "earn",
    minBet: 0,
    maxWin: "50 Coins",
    players: 3421,
    isLive: true,
    featured: true,
  },
]

const categoryColors = {
  mystery: "bg-primary/20 text-primary border-primary/30",
  battle: "bg-red-500/20 text-red-400 border-red-500/30",
  crash: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  plinko: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  numbers: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  earn: "bg-green-500/20 text-green-400 border-green-500/30",
}

const categoryNames = {
  mystery: "Mystery",
  battle: "Find the Prize",
  crash: "Soccer Game",
  plinko: "Chicken Road",
  numbers: "Numbers",
  earn: "Earn to Play",
}

export function GamesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)
  const mysteryVideoRef = useRef<HTMLVideoElement | null>(null)

  const categories = ["all", ...Object.keys(categoryNames)]
  const filteredGames = selectedCategory === "all" ? games : games.filter((game) => game.category === selectedCategory)

  return (
    <section className="w-full mb-4 md:mb-6">
      {/* Align to the same 12-column grid as the hero banners */}
      <div className="grid grid-cols-12 gap-x-0 md:gap-x-4">
        {/* Mystery Boxes - show video paused by default, play on hover */}
        <div className="col-span-6 md:col-span-3">
          <a
            className="block group"
            href="/boxes"
            onMouseEnter={() => {
              const v = mysteryVideoRef.current
              if (v) {
                v.play().catch(() => {})
              }
            }}
            onMouseLeave={() => {
              const v = mysteryVideoRef.current
              if (v) {
                v.pause()
                try { v.currentTime = 0 } catch {}
              }
            }}
          >
            <div className="rounded-xl border border-border overflow-hidden relative">
              {/* Background fallback image */}
              <img src="https://rillabox.com/animations/mysterbox-img.svg" alt="Mystery Boxes" className="w-full h-44 md:h-48 object-cover" />
              {/* Video: visible and paused by default, plays on hover */}
              <video
                ref={mysteryVideoRef}
                src="https://rillabox.com/animations/mistrorybox.mp4"
                preload="auto"
                muted
                loop
                playsInline
                onLoadedData={() => {
                  const v = mysteryVideoRef.current
                  if (v) {
                    v.pause()
                    try { v.currentTime = 0 } catch {}
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-200"
              />
            </div>
            <span className="mt-1 md:mt-2 block text-center font-semibold">Mystery Boxes</span>
          </a>
        </div>

        {/* Find the Prize */}
        <div className="col-span-6 md:col-span-3">
          <a className="block" href="/battles">
            <div className="rounded-xl border border-border overflow-hidden">
              <img src="/new/find_prize_1.jpg" alt="Find the Prize" className="w-full h-44 md:h-48 object-cover" />
            </div>
            <span className="mt-1 md:mt-2 block text-center font-semibold">Find the Prize</span>
          </a>
        </div>

        {/* Climb to the Top */}
        <div className="col-span-6 md:col-span-3">
          <a className="block" href="/crash">
            <div className="rounded-xl border border-border overflow-hidden">
              <img src="/new/SOCCER.jpg" alt="Soccer Game" className="w-full h-44 md:h-48 object-cover" />
            </div>
            <span className="mt-1 md:mt-2 block text-center font-semibold">Soccer Game</span>
          </a>
        </div>

        {/* Chicken Road */}
        <div className="col-span-6 md:col-span-3">
          <a className="block" href="/plinko">
            <div className="rounded-xl border border-border overflow-hidden">
              <img src="/new/checken_road_1.jpg" alt="Chicken Road" className="w-full h-44 md:h-48 object-cover" />
            </div>
            <span className="mt-1 md:mt-2 block text-center font-semibold">Chicken Road</span>
          </a>
        </div>
      </div>
    </section>
  )
}
