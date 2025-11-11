"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function WeeklyRaceSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 1,
    minutes: 38,
    seconds: 50,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num: number) => String(num).padStart(2, "0")

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Mobile-only version using mobilr.png */}
      <div className="md:hidden">
        <div className="relative rounded-[1.5rem] overflow-hidden min-h-[260px] bg-[url('/add/mobilr.png')] bg-cover bg-center">
          {/* <div className="absolute inset-0 bg-black/40 pointer-events-none" /> */}
          {/* Left-side text cluster */}
          <div className="relative z-10 px-4 pr-[52%] min-h-[260px] flex flex-col justify-center">
            <h2 className="text-[30px] font-extrabold text-white tracking-tight">$10,000</h2>
            <span className="mt-1 w-fit inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-[12px] font-semibold">Weekly Race</span>
            <p className="mt-2 text-gray-200 text-[12px] leading-snug font-medium max-w-[300px]">Participate in our Weekly Race simply by playing on RillaBox!</p>
          </div>

          {/* Mascot box overlay: timer + button (anchored inside right green box) */}
          <div className="absolute right-3 bottom-4 z-10 w-[50%] max-w-[210px] flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
              <div className="flex flex-col items-center">
                <span className="px-1.5 py-1 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[12px] min-w-[32px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.days)}</span>
                <span className="text-emerald-200 text-[10px] mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 py-1 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[12px] min-w-[32px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.hours)}</span>
                <span className="text-emerald-200 text-[10px] mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 py-1 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[12px] min-w-[32px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.minutes)}</span>
                <span className="text-emerald-200 text-[10px] mt-1">Min</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-1.5 py-1 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[12px] min-w-[32px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.seconds)}</span>
                <span className="text-emerald-200 text-[10px] mt-1">Sec</span>
              </div>
            </div>
            <Button asChild className="mt-2 w-auto self-center translate-x-1 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-xs py-1.5 px-3 rounded-lg shadow-md shadow-yellow-500/20 transition-all">
              <Link href="/weekly-race" aria-label="View Weekly Race">
                View Race
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop / Tablet version (unchanged) */}
      <div className="hidden md:block">
        <div className="relative rounded-[2rem] overflow-hidden min-h-[240px] md:min-h-[320px] lg:min-h-[380px] bg-[url('/add/weekly%20race%20new%20banner%2022.png')] bg-cover bg-top">
          {/* <div className="absolute inset-0 bg-black/40" /> */}
          {/* Centered content */}
          <div className="absolute z-10 top-[60px] left-[200px] md:left-[200px] lg:left-[200px] w-auto px-4 text-center">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight">$10,000</h2>
            <span className="mt-4 inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-3 rounded-full text-base md:text-lg lg:text-xl font-semibold">Weekly Race</span>
            <p className="mt-4 text-gray-200 text-sm md:text-base lg:text-base leading-relaxed font-medium max-w-[300px] md:max-w-[360px] lg:max-w-[380px] mx-auto">Participate in our Weekly Race simply by playing on RillaBox!</p>
            {/* Button moved to mascot box */}
          </div>

          {/* Mascot box overlay: timer + button */}
          <div className="absolute top-[230px] left-[790px] w-[240px] md:w-[280px] lg:w-[320px] flex flex-col items-center gap-3 z-10">
            {/* Removed Ends in label for more space */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.days)}</span>
                <span className="text-emerald-200 text-xs md:text-sm lg:text-base mt-1">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.hours)}</span>
                <span className="text-emerald-200 text-xs md:text-sm lg:text-base mt-1">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.minutes)}</span>
                <span className="text-emerald-200 text-xs md:text-sm lg:text-base mt-1">Min</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.seconds)}</span>
                <span className="text-emerald-200 text-xs md:text-sm lg:text-base mt-1">Sec</span>
              </div>
            </div>
            <Button asChild className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-sm md:text-base lg:text-lg py-2.5 px-5 rounded-xl shadow-lg shadow-yellow-500/40 transition-all hover:shadow-yellow-500/60">
              <Link href="/weekly-race" aria-label="View Weekly Race">
                View Race
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Bottom-center button removed; now placed inside mascot box */}
        </div>
      </div>
    </div>
  )
}
