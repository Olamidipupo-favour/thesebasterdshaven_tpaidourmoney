"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OSortudoLayout } from "@/components/layout/rillabox-layout"

// Simple countdown to end of week (Sunday 23:59:59 local time)
function useWeeklyCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const getNextWeeklySundayEnd = (now: Date) => {
      const end = new Date(now)
      const day = now.getDay() // 0 = Sunday
      const daysToSunday = (7 - day) % 7
      end.setDate(now.getDate() + daysToSunday)
      end.setHours(23, 59, 59, 999)
      if (end.getTime() <= now.getTime()) {
        end.setDate(end.getDate() + 7)
      }
      return end
    }

    const update = () => {
      const now = new Date()
      const end = getNextWeeklySundayEnd(now)
      const diff = Math.max(0, end.getTime() - now.getTime())
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])

  return timeLeft
}

function CountdownBlock({ label, value }: { label: string; value: number }) {
  const str = value.toString().padStart(2, "0")
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-1">
        <div className="rounded-lg w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-14 flex items-center justify-center border border-border bg-[#1f2433]">
          <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">{str[0]}</span>
        </div>
        <div className="rounded-lg w-9 h-11 sm:w-11 sm:h-13 md:w-12 md:h-14 flex items-center justify-center border border-border bg-[#1f2433]">
          <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">{str[1]}</span>
        </div>
      </div>
      <span className="text-muted-foreground text-[10px] sm:text-xs whitespace-nowrap">{label}</span>
    </div>
  )
}

function AvatarComposer({ base, skin, face, female = false, size = "md" }: { base: string; skin: string; face: string; female?: boolean; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-16 h-16" : size === "sm" ? "w-10 h-10" : "w-12 h-12"
  return (
    <div className={`relative ${sizeClass}`}> 
      <img src={base} alt="base avatar" className="absolute inset-0 w-full h-full object-contain" />
      <img src={skin} alt="skin tone" className="absolute inset-0 w-full h-full object-contain" />
      <img src={face} alt="face expression" className="absolute inset-0 w-full h-full object-contain" />
    </div>
  )
}

type Winner = {
  name: string
  totalPlayed: string
  placeLabel: string
  prize: string
  avatar: { base: string; skin: string; face: string; female?: boolean }
}

const topWinners: Winner[] = [
  {
    name: "anak***",
    totalPlayed: "$63,824.93",
    placeLabel: "1st Place",
    prize: "$2000.00",
    avatar: {
      base: "/achieve/happy.png",
      skin: "/achieve/happy.png",
      face: "/achieve/happy.png",
    },
  },
  {
    name: "getk***",
    totalPlayed: "$53,699.94",
    placeLabel: "2nd Place",
    prize: "$1000.00",
    avatar: {
      base: "/achieve/beaming.png",
      skin: "/achieve/beaming.png",
      face: "/achieve/beaming.png",
    },
  },
  {
    name: "byte***",
    totalPlayed: "$30,299.93",
    placeLabel: "3rd Place",
    prize: "$500.00",
    avatar: {
      base: "/achieve/cool.png",
      skin: "/achieve/cool.png",
      face: "/achieve/cool.png",
    },
  },
]

const leaderboard: Winner[] = [
  {
    name: "thre***",
    totalPlayed: "$26,879.93",
    placeLabel: "4th",
    prize: "$350.00",
    avatar: {
      base: "/achieve/proud.png",
      skin: "/achieve/proud.png",
      face: "/achieve/proud.png",
    },
  },
  {
    name: "alys***",
    totalPlayed: "$25,076.53",
    placeLabel: "5th",
    prize: "$300.00",
    avatar: {
      base: "/achieve/ok sign.png",
      skin: "/achieve/ok sign.png",
      face: "/achieve/ok sign.png",
      female: true,
    },
  },
  {
    name: "ware***",
    totalPlayed: "$13,414.96",
    placeLabel: "6th",
    prize: "$250.00",
    avatar: {
      base: "/achieve/wink.png",
      skin: "/achieve/wink.png",
      face: "/achieve/wink.png",
    },
  },
  {
    name: "jefr***",
    totalPlayed: "$9,899.97",
    placeLabel: "7th",
    prize: "$200.00",
    avatar: {
      base: "/achieve/surprised.png",
      skin: "/achieve/surprised.png",
      face: "/achieve/surprised.png",
    },
  },
  {
    name: "wemd***",
    totalPlayed: "$8,789.98",
    placeLabel: "8th",
    prize: "$200.00",
    avatar: {
      base: "/achieve/jealous.png",
      skin: "/achieve/jealous.png",
      face: "/achieve/jealous.png",
    },
  },
  {
    name: "kolo***",
    totalPlayed: "$5,349.98",
    placeLabel: "9th",
    prize: "$100.00",
    avatar: {
      base: "/achieve/sad.png",
      skin: "/achieve/sad.png",
      face: "/achieve/sad.png",
    },
  },
  {
    name: "Fete***",
    totalPlayed: "$4,429.97",
    placeLabel: "10th",
    prize: "$50.00",
    avatar: {
      base: "/achieve/sad.png",
      skin: "/achieve/sad.png",
      face: "/achieve/sad.png",
    },
  },
]

function WinnerCard({ winner, rankClass, size = "normal" }: { winner: Winner; rankClass: "rank-1" | "rank-2" | "rank-3"; size?: "compact" | "normal" | "big" }) {
  const pad = size === "big" ? "p-6" : size === "compact" ? "p-3" : "p-4"
  const nameSize = size === "big" ? "text-xl" : size === "compact" ? "text-base" : "text-lg"
  const totalPlayedSize = size === "big" ? "text-base" : size === "compact" ? "text-sm" : "text-sm"
  const cardMinH = size === "big" ? "min-h-[240px]" : size === "compact" ? "min-h-[180px]" : "min-h-[200px]"
  return (
    <div className={`relative ${rankClass === "rank-1" ? "md:-translate-y-4 lg:-translate-y-5" : ""}`}>
      <Card className={`winner-card ${rankClass} rounded-2xl overflow-hidden shadow-md ${cardMinH}`}>
        <div className="absolute end-0 top-0">
          {/* <img src="/images/helloween/shape-1.svg" alt="Halloween" className="w-28 h-auto opacity-80" /> */}
        </div>
        <div className={`${pad} flex flex-col items-center gap-3 text-center`}>
          <div className="mt-2">
            <AvatarComposer base={winner.avatar.base} skin={winner.avatar.skin} face={winner.avatar.face} female={winner.avatar.female} size={size === "big" ? "lg" : size === "compact" ? "sm" : "md"} />
          </div>
          <h6 className={`text-white font-semibold ${nameSize} mb-2 text-break`}>{winner.name}</h6>
          <div className="mb-2">
            <span className="text-muted-foreground/80 text-sm block">Total Played</span>
            <h6 className={`text-white font-medium ${totalPlayedSize}`}>{winner.totalPlayed}</h6>
          </div>
          <div className="played-box mt-1">
            <span className="text-white font-medium text-sm block">{winner.placeLabel}</span>
            <h6 className="text-white font-semibold text-lg mb-0">{winner.prize}</h6>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function WeeklyRacePage() {
  const { days, hours, minutes, seconds } = useWeeklyCountdown()

  return (
    <OSortudoLayout>
      <main className="px-4 md:px-6 lg:px-10 py-6 space-y-12">
        {/* Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 cups-bg"></div>
          <div className="relative bg-gradient-to-br from-[#0b1220] via-[#151a2b] to-[#0b1220] rounded-3xl p-6 md:p-8 lg:p-10 animate-borderbox hero-lightpop">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 items-center">
              {/* Left: Trophy + Text */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  <img src="https://rillabox.com/images/trophy-changed.png" alt="Trophy" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">$10,000</h2>
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">Weekly Race</span>
                  </div>
                  <p className="text-muted-foreground mt-2">Every week, you can join our Weekly Race on RillaBox, where users can win amazing rewards just by participating!</p>
                </div>
              </div>

              {/* Right: Countdown */}
              <div className="flex flex-col items-center lg:items-end gap-2 w-full">
                <h3 className="text-white/80 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <img src="/images/timer.svg" alt="Timer" className="w-5 h-5" />
                  Race ends
                </h3>
                <div className="flex flex-nowrap items-center gap-1 justify-center lg:justify-end w-full">
                  <CountdownBlock label="Days" value={days} />
                  <span className="text-white">:</span>
                  <CountdownBlock label="Hours" value={hours} />
                  <span className="text-white">:</span>
                  <CountdownBlock label="Minutes" value={minutes} />
                  <span className="text-white">:</span>
                  <CountdownBlock label="Seconds" value={seconds} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Winners + Right Info */}
        <section className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Left: Top 3 */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <WinnerCard winner={topWinners[1]} rankClass="rank-2" size="compact" />
              <WinnerCard winner={topWinners[0]} rankClass="rank-1" size="compact" />
              <WinnerCard winner={topWinners[2]} rankClass="rank-3" size="compact" />
            </div>
          </div>

          {/* Right: Position/Wager/Prize */}
          <div className="flex flex-col gap-4">
            <Card className="info-box animate-borderbox rounded-2xl p-4 text-center">
              <h3 className="text-yellow-400 font-medium text-sm mb-1">Your Position</h3>
              <span className="text-2xl font-bold text-white">N/A</span>
              <div className="mt-2">
                <h3 className="text-muted-foreground text-sm font-medium">Your Wager</h3>
                <span className="text-2xl font-bold text-white">$0.00</span>
              </div>
            </Card>
            <Card className="info-box animate-borderbox rounded-2xl p-4 text-center">
              <h3 className="text-yellow-400 font-medium text-sm mb-1">Your Prize</h3>
              <span className="text-2xl font-bold text-white">$0.00</span>
            </Card>
          </div>
        </section>

        {/* Leaderboard List */}
        <section>
          <div className="grid gap-3">
            {/* Header row */}
            <div className="flex items-center px-4 py-3 rounded-xl border border-border bg-card">
              <div className="w-16 text-center text-sm font-semibold text-white/70"> </div>
              <div className="flex-1 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">User</div>
                <div className="text-sm text-muted-foreground">Total Played</div>
                <div className="text-sm text-muted-foreground">Prize</div>
              </div>
            </div>

            {leaderboard.map((w, idx) => (
              <div key={w.name} className="flex items-center px-4 py-3 rounded-xl border border-border bg-card">
                <div className="w-16 text-center text-sm font-semibold text-white/80">{w.placeLabel}</div>
                <div className="flex-1 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12">
                      <AvatarComposer base={w.avatar.base} skin={w.avatar.skin} face={w.avatar.face} female={w.avatar.female} />
                    </div>
                    <h6 className="text-white text-sm font-medium truncate">{w.name}</h6>
                  </div>
                  <div className="text-white text-sm font-medium">
                    <span>{w.totalPlayed}</span>
                  </div>
                  <div>
                    <Button variant="secondary" className="text-sm">{w.prize}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </OSortudoLayout>
  )
}