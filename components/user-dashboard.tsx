"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Coins,
  TrendingUp,
  Gift,
  History,
  Trophy,
  Star,
  CreditCard,
  Wallet,
  Calendar,
  Target,
  Award,
  Zap,
} from "lucide-react"

interface Transaction {
  id: number
  type: "deposit" | "withdrawal" | "win" | "loss" | "bonus"
  amount: number
  description: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface Achievement {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  progress: number
  maxProgress: number
  reward: number
  unlocked: boolean
}

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "win",
    amount: 250,
    description: "Lucky Leprechaun Box - Four Leaf Clover Charm",
    timestamp: "2025-01-21T10:30:00Z",
    status: "completed",
  },
  {
    id: 2,
    type: "deposit",
    amount: 125,
    description: "USD Purchase - $4.99",
    timestamp: "2025-01-21T10:25:00Z",
    status: "completed",
  },
  {
    id: 3,
    type: "bonus",
    amount: 50,
    description: "Jump Irish Guy - Daily Play Bonus",
    timestamp: "2025-01-21T09:15:00Z",
    status: "completed",
  },
  {
    id: 4,
    type: "loss",
    amount: -75,
    description: "Celtic Keno - Game Play",
    timestamp: "2025-01-21T08:45:00Z",
    status: "completed",
  },
  {
    id: 5,
    type: "win",
    amount: 500,
    description: "Lucky Crash - 2.5x Multiplier",
    timestamp: "2025-01-20T22:30:00Z",
    status: "completed",
  },
]

const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Steps",
    description: "Open your first mystery box",
    icon: <Gift className="w-5 h-5" />,
    progress: 1,
    maxProgress: 1,
    reward: 25,
    unlocked: true,
  },
  {
    id: 2,
    name: "Lucky Streak",
    description: "Win 5 games in a row",
    icon: <Star className="w-5 h-5" />,
    progress: 3,
    maxProgress: 5,
    reward: 100,
    unlocked: false,
  },
  {
    id: 3,
    name: "High Roller",
    description: "Spend 1000 Local Coins in games",
    icon: <Coins className="w-5 h-5" />,
    progress: 750,
    maxProgress: 1000,
    reward: 200,
    unlocked: false,
  },
  {
    id: 4,
    name: "Leprechaun's Friend",
    description: "Play Jump Irish Guy 50 times",
    icon: <Trophy className="w-5 h-5" />,
    progress: 32,
    maxProgress: 50,
    reward: 150,
    unlocked: false,
  },
]

export function UserDashboard() {
  const [userStats] = useState({
    totalCoins: 1250,
    totalWins: 47,
    totalLosses: 23,
    winRate: 67.1,
    totalWagered: 3450,
    biggestWin: 500,
    currentStreak: 3,
    loyaltyLevel: 2,
    loyaltyProgress: 65,
    joinDate: "2024-12-15",
  })

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <CreditCard className="w-4 h-4 text-green-500" />
      case "withdrawal":
        return <Wallet className="w-4 h-4 text-blue-500" />
      case "win":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "loss":
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      case "bonus":
        return <Gift className="w-4 h-4 text-yellow-500" />
      default:
        return <Coins className="w-4 h-4" />
    }
  }

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
      case "win":
      case "bonus":
        return "text-green-500"
      case "withdrawal":
      case "loss":
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, lucky player! Here's your gaming overview.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Local Coins</p>
              <p className="text-2xl font-bold text-foreground">{userStats.totalCoins.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-full">
              <Coins className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Win Rate</p>
              <p className="text-2xl font-bold text-green-500">{userStats.winRate}%</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Target className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Biggest Win</p>
              <p className="text-2xl font-bold text-secondary">{userStats.biggestWin}</p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-full">
              <Trophy className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold text-yellow-500">{userStats.currentStreak}</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-full">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Loyalty Program */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Loyalty Level {userStats.loyaltyLevel}</h3>
                <p className="text-sm text-muted-foreground">Lucky Clover Member</p>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {userStats.loyaltyProgress}% to next level
            </Badge>
          </div>

          <Progress value={userStats.loyaltyProgress} className="mb-4" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Benefits: +5% bonus coins, priority support</span>
            <span className="text-primary font-semibold">Next: +10% bonus coins</span>
          </div>
        </div>
      </Card>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-card border-border">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <History className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Recent Transactions</h3>
              </div>

              <div className="space-y-4">
                {mockTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-semibold text-foreground">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? "+" : ""}
                        {transaction.amount} coins
                      </p>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">View All Transactions</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card className="bg-card border-border">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Achievements</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.unlocked ? "bg-primary/10 border-primary/30" : "bg-background/50 border-border"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-primary/20" : "bg-muted/20"}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Unlocked</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Reward:</span>
                            <div className="flex items-center space-x-1">
                              <Coins className="w-3 h-3 text-secondary" />
                              <span className="font-semibold text-secondary">{achievement.reward}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Gaming Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Games Played</span>
                  <span className="font-semibold">{userStats.totalWins + userStats.totalLosses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Games Won</span>
                  <span className="font-semibold text-green-500">{userStats.totalWins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Games Lost</span>
                  <span className="font-semibold text-red-500">{userStats.totalLosses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Wagered</span>
                  <span className="font-semibold">{userStats.totalWagered.toLocaleString()} coins</span>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-semibold">{new Date(userStats.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Loyalty Level</span>
                  <span className="font-semibold text-primary">Level {userStats.loyaltyLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-secondary" />
                    <span className="font-semibold text-secondary">{userStats.totalCoins.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
