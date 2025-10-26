"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
      <div className="relative rounded-[2rem] overflow-hidden min-h-[220px] md:min-h-[260px] lg:min-h-[300px] bg-[url('/add/weekly.png')] bg-cover bg-center">
        {/* Centered content */}
        <div className="absolute z-10 top-[60px] left-[20%] md:left-[22%] lg:left-[25%] w-auto px-4 text-left">
           <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">$10,000</h2>
           <span className="mt-3 inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-5 py-2 rounded-full text-sm md:text-base lg:text-lg font-semibold">Weekly Race</span>
           <p className="mt-3 text-gray-200 text-xs md:text-sm lg:text-sm leading-snug font-medium max-w-[520px]">Participate in our Weekly Race simply by playing on RillaBox!</p>
           <Button className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-xs md:text-sm py-2 px-4 rounded-xl shadow-lg shadow-yellow-500/40 transition-all hover:shadow-yellow-500/60">
             View Race
             <ArrowRight className="ml-2 h-5 w-5" />
           </Button>
         </div>

        {/* Timer over mascot box area (top-right of banner) */}
          <div className="absolute top-[200px] md:top-[200px] lg:top-[210px] right-[8%] md:right-[10%] lg:right-auto lg:left-[679px] w-[230px] md:w-[280px] lg:w-[320px] flex flex-col items-center gap-2 z-10">
            <span className="text-emerald-100 text-[11px] md:text-[12px] lg:text-[13px] font-medium uppercase tracking-wider">Ends in</span>
            <div className="flex items-center justify-center gap-2">
              <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.days)}</span>
              <span className="text-emerald-200 text-[16px] md:text-[18px] lg:text-[20px]">:</span>
              <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.hours)}</span>
              <span className="text-emerald-200 text-[16px] md:text-[18px] lg:text-[20px]">:</span>
              <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.minutes)}</span>
              <span className="text-emerald-200 text-[16px] md:text-[18px] lg:text-[20px]">:</span>
              <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.seconds)}</span>
            </div>
          </div>

        {/* Bottom-center button removed; now placed under heading block */}
      </div>
    </div>
  )
}
