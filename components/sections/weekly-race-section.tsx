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
      <div className="relative rounded-[2rem] overflow-hidden min-h-[240px] md:min-h-[320px] lg:min-h-[380px] bg-[url('/add/weekly%20race%20new%20banner%2022.png')] bg-cover bg-top">
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
             <div className="flex items-center justify-center gap-2">
               <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.days)}</span>
               <span className="text-emerald-200 text-[16px] md:text-[18px] lg:text-[20px]">:</span>
               <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.hours)}</span>
               <span className="text-emerald-200 text-[16px] md:text-[18px] lg:text-[20px]">:</span>
               <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.minutes)}</span>
               <span className="text-emerald-200 text-[16px] md:text-[18px] lg:text-[20px]">:</span>
               <span className="px-2.5 py-1.5 rounded-md bg-emerald-900/70 border border-emerald-600/40 text-yellow-300 font-bold text-[16px] md:text-[18px] lg:text-[20px] min-w-[40px] md:min-w-[44px] text-center shadow-inner backdrop-blur-[1px]">{formatNumber(timeLeft.seconds)}</span>
             </div>
             <Button className="mt-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-xs md:text-sm py-2 px-4 rounded-xl shadow-lg shadow-yellow-500/40 transition-all hover:shadow-yellow-500/60">
               View Race
               <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
           </div>

        {/* Bottom-center button removed; now placed inside mascot box */}
      </div>
    </div>
  )
}
