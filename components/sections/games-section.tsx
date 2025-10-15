"use client"

import { useState } from "react"
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
    name: "Climb to the Top",
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
  crash: "Climb to the Top",
  plinko: "Chicken Road",
  numbers: "Numbers",
  earn: "Earn to Play",
}

export function GamesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)

  const categories = ["all", ...Object.keys(categoryNames)]
  const filteredGames = selectedCategory === "all" ? games : games.filter((game) => game.category === selectedCategory)

  return (
    <section className="gamemodes-wrapper w-100">
      <div className="justify-content-evenly  gy-5 row">
        <div className="col-xl-20 mt-lg-5 mt-xl-3 battle-box col-lg-3 col-md-6 col-6">
          <a className="gamemode-box box-block d-block text-decoration-none h-100" href="/boxes">
            <div className="gamemode-image">
              <img src="https://rillabox.com/animations/mysterbox-img.svg" alt="Mystery Boxes Image" className="" />
            </div>
            <span className="gamemode-text text-gradient fw-bold">Mystery Boxes</span>
          </a>
        </div>
        <div className="col-xl-20 mt-lg-5 mt-xl-3 battle-box col-lg-3 col-md-6 col-6">
          <a className="gamemode-box box-block d-block text-decoration-none h-100" href="/battles">
            <div className="gamemode-image">
              <img src="https://rillabox.com/animations/battlebox-img.svg" alt="Find the Prize" className="" />
            </div>
            <span className="gamemode-text text-gradient fw-bold">Find the Prize</span>
          </a>
        </div>
        <div className="col-xl-20 mt-lg-5 mt-xl-3 battle-box col-lg-3 col-md-6 col-6">
          <a className="gamemode-box box-block d-block text-decoration-none h-100" href="/crash">
            <div className="gamemode-image">
              <img src="https://rillabox.com/animations/crashbox-img.svg" alt="Climb to the Top" className="" />
            </div>
            <span className="gamemode-text text-gradient fw-bold">Climb to the Top</span>
          </a>
        </div>
        <div className="col-xl-20 mt-lg-5 mt-xl-3 battle-box col-lg-3 col-md-6 col-6">
          <a className="gamemode-box box-block d-block text-decoration-none h-100" href="/plinko">
            <div className="gamemode-image">
              <img src="https://rillabox.com/animations/plingobox-img.svg" alt="Chicken Road" className="" />
            </div>
            <span className="gamemode-text text-gradient fw-bold">Chicken Road</span>
          </a>
        </div>
      </div>
    </section>
  )
}
