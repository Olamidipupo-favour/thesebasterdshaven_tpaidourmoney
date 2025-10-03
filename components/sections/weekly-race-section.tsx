"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Timer, Users } from "lucide-react"

export function WeeklyRaceSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 23,
    seconds: 42
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const leaderboard = [
    { rank: 1, username: "Adanakepab", totalPlayed: "$44,999.94", prize: "$2000.00", avatar: "🍀" },
    { rank: 2, username: "sahily21", totalPlayed: "$16,499.97", prize: "$1000.00", avatar: "🍀" },
    { rank: 3, username: "neverbroke", totalPlayed: "$11,999.98", prize: "$500.00", avatar: "🍀" },
    { rank: 4, username: "ankushhkhar", totalPlayed: "$9,999.97", prize: "$350.00", avatar: "🍀" },
    { rank: 5, username: "alysajunk@yahoo.com", totalPlayed: "$8,689.35", prize: "$300.00", avatar: "🍀" },
  ]

  return (
    <section className="mb-16">
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
            {/* Left Side - Race Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground">$10,000</div>
                  <div className="text-lg font-semibold text-primary">Weekly Race</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                Participate in our Weekly Race simply by playing on O Sortudo! 
                The more you play, the higher your chances of winning amazing rewards.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                  <Timer className="w-5 h-5 text-primary" />
                  <span className="text-lg font-semibold text-foreground">Race ends</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{timeLeft.days.toString().padStart(2, '0')}D</div>
                  </div>
                  <div className="text-2xl text-muted-foreground">:</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}H</div>
                  </div>
                  <div className="text-2xl text-muted-foreground">:</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}M</div>
                  </div>
                  <div className="text-2xl text-muted-foreground">:</div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}S</div>
                  </div>
                </div>
              </div>

              <Button size="lg" className="glow-effect px-8 py-4 text-lg">
                <Trophy className="w-6 h-6 mr-2" />
                View Race
              </Button>
            </div>

            {/* Right Side - Leaderboard */}
            <div className="flex-shrink-0 w-full lg:w-96">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">Top Players</h3>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      index < 3 
                        ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20" 
                        : "bg-card border-border"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? "bg-yellow-500 text-white" :
                        index === 1 ? "bg-gray-400 text-white" :
                        index === 2 ? "bg-orange-600 text-white" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {player.rank}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <div className="font-semibold text-foreground">{player.username}</div>
                        <div className="text-sm text-muted-foreground">Total Played: {player.totalPlayed}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{player.prize}</div>
                      <div className="text-sm text-muted-foreground">{player.rank}st Place</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}
