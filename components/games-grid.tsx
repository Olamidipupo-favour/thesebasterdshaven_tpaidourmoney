"use client"

import type React from "react"

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
}

const games: Game[] = [
  {
    id: 1,
    name: "Mystery Boxes",
    description: "Open boxes and discover amazing prizes with Irish luck",
    icon: <Gift className="w-6 h-6" />,
    category: "mystery",
    minBet: 125,
    maxWin: "$500",
    players: 1247,
    isLive: true,
  },
  {
    id: 2,
    name: "Box Battles",
    description: "Challenge other players in mystery box duels",
    icon: <Swords className="w-6 h-6" />,
    category: "battle",
    minBet: 250,
    maxWin: "$1,000",
    players: 892,
    isLive: true,
  },
  {
    id: 3,
    name: "Lucky Crash",
    description: "Watch the multiplier rise and cash out before it crashes",
    icon: <TrendingUp className="w-6 h-6" />,
    category: "crash",
    minBet: 50,
    maxWin: "$10,000",
    players: 2156,
    isLive: true,
  },
  {
    id: 4,
    name: "Irish Plinko",
    description: "Drop the ball and watch it bounce to fortune",
    icon: <Target className="w-6 h-6" />,
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
    icon: <Dices className="w-6 h-6" />,
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
    icon: <Calculator className="w-6 h-6" />,
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
    icon: <Bomb className="w-6 h-6" />,
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
    icon: <Play className="w-6 h-6" />,
    category: "earn",
    minBet: 0,
    maxWin: "50 Coins",
    players: 3421,
    isLive: true,
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
  battle: "Battle",
  crash: "Crash",
  plinko: "Plinko",
  numbers: "Numbers",
  earn: "Earn to Play",
}

export function GamesGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)

  const categories = ["all", ...Object.keys(categoryNames)]
  const filteredGames = selectedCategory === "all" ? games : games.filter((game) => game.category === selectedCategory)

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Game Categories</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Experience the luck of the Irish across our exciting game collection
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category === "all" ? "All Games" : categoryNames[category as keyof typeof categoryNames]}
            </Button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <Card
            key={game.id}
            className={`bg-card border-border overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col h-full ${
              hoveredGame === game.id ? "border-primary/50 shadow-lg scale-105" : ""
            }`}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <div className="p-6 flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-start justify-between mb-4 flex-shrink-0">
                <div className={`p-3 rounded-lg ${categoryColors[game.category]} transition-colors`}>{game.icon}</div>
                <div className="flex flex-col items-end space-y-1">
                  {game.isLive && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      LIVE
                    </Badge>
                  )}
                  {game.difficulty && (
                    <Badge variant="outline" className="text-xs">
                      {game.difficulty}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Game Info */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {game.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{game.description}</p>
              </div>

              {/* Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Min Bet:</span>
                  <div className="flex items-center space-x-1">
                    {game.minBet === 0 ? (
                      <span className="font-semibold text-green-400">FREE</span>
                    ) : (
                      <>
                        <Coins className="w-3 h-3 text-secondary" />
                        <span className="font-semibold">{game.minBet}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Max Win:</span>
                  <span className="font-semibold text-secondary">{game.maxWin}</span>
                </div>

                {game.players && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Players:</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span className="font-semibold">{game.players.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-auto">
                <Button className="w-full glow-effect group-hover:bg-primary/90 transition-colors" size="sm">
                  {game.category === "earn" ? (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play & Earn
                    </>
                  ) : (
                    <>
                      <Trophy className="w-4 h-4 mr-2" />
                      Play Now
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div
              className={`absolute inset-0 bg-primary/5 transition-opacity duration-300 pointer-events-none ${
                hoveredGame === game.id ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </Card>
        ))}
      </div>

      {/* Featured Game Spotlight */}
      <div className="mt-12">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                    <Clock className="w-3 h-3 mr-1" />
                    Featured Game
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    LIVE
                  </Badge>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Jump Irish Guy - Earn Free Coins!
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Help our lucky leprechaun mascot jump over obstacles and collect treasures! This free-to-play game
                  lets you earn Local Coins without spending any money. Perfect for building your coin balance before
                  trying other games.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Coins className="w-4 h-4 text-secondary" />
                    <span className="text-sm">
                      <strong>Earn:</strong> Up to 50 coins per game
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <strong>Players:</strong> 3,421 online
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">
                      <strong>Difficulty:</strong> Easy
                    </span>
                  </div>
                </div>

                <Button size="lg" className="glow-effect">
                  <Play className="w-5 h-5 mr-2" />
                  Start Earning Coins
                </Button>
              </div>

              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <div className="text-6xl animate-bounce">🍀</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
