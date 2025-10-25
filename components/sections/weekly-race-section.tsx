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
      {/* Outer glow/frame */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 opacity-60 blur-sm animate-glow-green" />
        <div className="absolute inset-0 rounded-[2rem] border-2 border-emerald-400 animate-glow-green" />
      </div>

      <div className="relative bg-gradient-to-br from-[#0d2818] via-[#1a3d2e] to-[#0d2818] rounded-[2rem] p-3 md:p-4 lg:p-5 overflow-hidden min-h-[200px] md:min-h-[220px] lg:min-h-[250px]">
        {/* Leaf background layer */}
        <div className="race-leaf-bg absolute inset-0 rounded-[2rem] pointer-events-none" />
        {/* Floating boxes */}
        <div className="absolute top-6 left-6 w-16 h-16 md:w-24 md:h-24 animate-float-slow pointer-events-none">
          <img
            src="/new/pot coin.png"
            alt="Box 1"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* <div className="absolute top-16 right-12 w-12 h-12 md:w-16 md:h-16 animate-float-medium">
          <img
            src="https://rillabox.com/images/box2.png"
            alt="Box 2"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div> */}

        <div className="absolute bottom-5 left-3 w-12 h-12 md:w-14 md:h-14 animate-float-medium opacity-70">
          <img
            src="/new/coin stacked.png"
            alt="Small trophy"
            className="w-full h-full object-contain drop-shadow-xl"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-30 pointer-events-none">
          <img
            src="/new/box_coin.png"
            alt="Coins box"
            className="w-24 md:w-32 lg:w-40 h-auto object-contain drop-shadow-2xl"
          />
        </div>

        <div className="absolute bottom-6 right-8 w-10 h-10 md:w-12 md:h-12 animate-float-fast opacity-60">
          <img src="/new/coin floor.png" alt="Gift box" className="w-full h-full object-contain drop-shadow-xl" />
        </div>

        {/* Content grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-1 lg:gap-0 items-center">
          {/* Left section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Trophy */}
            <div className="hidden md:block flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 animate-float-slow">
              <img
                src="https://rillabox.com/images/trophy-changed.png"
                alt="Trophy"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">$10,000</h2>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap">
                   Weekly Race
                 </span>
               </div>
              <p className="text-gray-300 text-xs md:text-sm font-medium">
                 Participate in our Weekly Race simply by playing on RillaBox!
               </p>
            </div>
          </div>

          {/* Right section - Mascot image with overlay timer and button */}
          <div className="flex flex-col gap-2 items-center lg:justify-self-start lg:-ml-2">
            <div className="race-mascot-wrap relative z-10 select-none">
              <img
                src="/new/mascot image countdown.png"
                alt="Mascot holding box"
                className="w-[150px] md:w-[190px] lg:w-[210px] h-auto pointer-events-none drop-shadow-xl"
              />

               {/* Overlay timer positioned on the box area */}

              <div className="absolute left-[18%] right-[18%] bottom-[22%] flex flex-col items-center gap-0.5 md:gap-1">
                <span className="text-emerald-100 text-[7px] md:text-[9px] font-medium uppercase tracking-wider">Ends in</span>
                <div className="flex items-center justify-center text-yellow-300 font-bold tracking-wider">
                  <span className="text-[11px] md:text-xs">{formatNumber(timeLeft.days)}</span>
                  <span className="text-emerald-200 mx-0.5 md:mx-1">:</span>
                  <span className="text-[11px] md:text-xs">{formatNumber(timeLeft.hours)}</span>
                  <span className="text-emerald-200 mx-0.5 md:mx-1">:</span>
                  <span className="text-[11px] md:text-xs">{formatNumber(timeLeft.minutes)}</span>
                  <span className="text-emerald-200 mx-0.5 md:mx-1">:</span>
                  <span className="text-[11px] md:text-xs">{formatNumber(timeLeft.seconds)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-xs md:text-sm py-2 rounded-xl shadow-lg shadow-yellow-500/40 transition-all hover:shadow-yellow-500/60 hover:scale-[1.01]">
              View Race
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
