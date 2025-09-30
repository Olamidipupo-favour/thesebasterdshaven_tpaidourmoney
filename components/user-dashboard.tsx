"use client"

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
  Loader2,
} from "lucide-react"
import {
  useUserProfile,
  useUserBalance,
  useUserTransactions,
  useUserAchievements,
  useUserStats,
} from "@/hooks/use-user"
import { useAuth } from "@/hooks/use-auth"
import type { Transaction } from "@/lib/api/types"

export function UserDashboard() {
  const { user: authUser } = useAuth()
  const { user, isLoading: loadingProfile } = useUserProfile()
  const { balance, isLoading: loadingBalance } = useUserBalance()
  const { transactions, isLoading: loadingTransactions } = useUserTransactions()
  const { achievements, isLoading: loadingAchievements } = useUserAchievements()
  const { stats, isLoading: loadingStats } = useUserStats()

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
        return <CreditCard className="w-4 h-4 text-green-500" />
      case "withdrawal":
        return <Wallet className="w-4 h-4 text-blue-500" />
      case "win":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "bet":
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      case "purchase":
        return <Gift className="w-4 h-4 text-yellow-500" />
      default:
        return <Coins className="w-4 h-4" />
    }
  }

  const getTransactionColor = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit":
      case "win":
        return "text-green-500"
      case "withdrawal":
      case "bet":
        return "text-red-500"
      case "purchase":
        return "text-yellow-500"
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

  if (loadingProfile || loadingBalance || loadingStats) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const displayUser = user || authUser
  const winRate = stats ? ((stats.total_wins / stats.total_games_played) * 100).toFixed(1) : "0.0"

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {displayUser?.username || "lucky player"}! Here's your gaming overview.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Local Coins</p>
              <p className="text-2xl font-bold text-foreground">
                {balance?.coins.toLocaleString() || displayUser?.balance.toLocaleString() || 0}
              </p>
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
              <p className="text-2xl font-bold text-green-500">{winRate}%</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Target className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Won</p>
              <p className="text-2xl font-bold text-secondary">{stats?.total_won.toLocaleString() || 0}</p>
            </div>
            <div className="p-3 bg-secondary/20 rounded-full">
              <Trophy className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Games Played</p>
              <p className="text-2xl font-bold text-yellow-500">{stats?.total_games_played || 0}</p>
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
                <h3 className="text-lg font-bold text-foreground">Loyalty Level {displayUser?.level || 1}</h3>
                <p className="text-sm text-muted-foreground">Lucky Clover Member</p>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">{displayUser?.xp || 0} XP</Badge>
          </div>

          <Progress value={(displayUser?.xp || 0) % 100} className="mb-4" />

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

              {loadingTransactions ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : transactions && transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-semibold text-foreground">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(transaction.created_at)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getTransactionColor(transaction.type)}`}>
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount} coins
                        </p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs capitalize"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No transactions yet</div>
              )}

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

              {loadingAchievements ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : achievements && achievements.length > 0 ? (
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
                          <Star className="w-5 h-5" />
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
                                {achievement.progress}/{achievement.max_progress}
                              </span>
                            </div>
                            <Progress value={(achievement.progress / achievement.max_progress) * 100} className="h-2" />
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Reward:</span>
                              <div className="flex items-center space-x-1">
                                <Coins className="w-3 h-3 text-secondary" />
                                <span className="font-semibold text-secondary">{achievement.reward_coins}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No achievements yet</div>
              )}
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
                  <span className="font-semibold">{stats?.total_games_played || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Games Won</span>
                  <span className="font-semibold text-green-500">{stats?.total_wins || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Games Lost</span>
                  <span className="font-semibold text-red-500">{stats?.total_losses || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Wagered</span>
                  <span className="font-semibold">{stats?.total_wagered.toLocaleString() || 0} coins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Favorite Game</span>
                  <span className="font-semibold">{stats?.favorite_game || "N/A"}</span>
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
                    <span className="font-semibold">
                      {displayUser?.created_at ? new Date(displayUser.created_at).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Loyalty Level</span>
                  <span className="font-semibold text-primary">Level {displayUser?.level || 1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <div className="flex items-center space-x-1">
                    <Coins className="w-4 h-4 text-secondary" />
                    <span className="font-semibold text-secondary">
                      {balance?.coins.toLocaleString() || displayUser?.balance.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Profit/Loss</span>
                  <span
                    className={`font-semibold ${(stats?.profit_loss || 0) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {(stats?.profit_loss || 0) >= 0 ? "+" : ""}
                    {stats?.profit_loss.toLocaleString() || 0} coins
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
