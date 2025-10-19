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

      <div className="relative bg-gradient-to-br from-[#0d2818] via-[#1a3d2e] to-[#0d2818] rounded-[2rem] p-6 md:p-8 lg:p-10 overflow-hidden">
        {/* Floating boxes */}
        <div className="absolute top-8 left-8 w-16 h-16 md:w-20 md:h-20 animate-float-slow">
          <img
            src="/new/boxcoin.png"
            alt="Box 1"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="absolute top-16 right-12 w-12 h-12 md:w-16 md:h-16 animate-float-medium">
          <img
            src="https://rillabox.com/images/box2.png"
            alt="Box 2"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="absolute bottom-12 left-16 w-10 h-10 md:w-12 md:h-12 animate-float-fast opacity-70">
          <img
            src="/new/coin stacked.png"
            alt="Small trophy"
            className="w-full h-full object-contain drop-shadow-xl"
          />
        </div>
 
        <div className="absolute bottom-16 right-20 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 animate-float-slow rotate-12">
          <img
            src="/new/box_coin.png"
            alt="Adidas box"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="absolute top-1/2 left-4 w-8 h-8 md:w-10 md:h-10 animate-float-medium opacity-60">
          <img src="/new/coin floor.png" alt="Gift box" className="w-full h-full object-contain drop-shadow-xl" />
        </div>

        {/* Content grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-8 items-center">
          {/* Left section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Trophy */}
            <div className="hidden md:block flex-shrink-0 w-24 h-24 lg:w-32 lg:h-32 animate-float-slow">
              <img
                src="https://rillabox.com/images/trophy-changed.png"
                alt="Trophy"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">$10,000</h2>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1.5 rounded-full text-sm md:text-base font-semibold whitespace-nowrap">
                  Weekly Race
                </span>
              </div>
              <p className="text-gray-300 text-sm md:text-base font-medium">
                Participate in our Weekly Race simply by playing on RillaBox!
              </p>
            </div>
          </div>

          {/* Right section - Timer and button */}
          <div className="flex flex-col gap-4 lg:ml-auto">
            <div className="bg-gradient-to-br from-emerald-900/40 to-green-800/40 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-emerald-500/30">
              <h3 className="text-gray-300 text-xs md:text-sm font-medium text-center mb-3 uppercase tracking-wider">
                Ends In
              </h3>
              <div className="flex items-center justify-center gap-2 md:gap-3">
                {/* Days */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">{formatNumber(timeLeft.days)[0]}</span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">{formatNumber(timeLeft.days)[1]}</span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">Days</span>
                </div>

                {/* Hours */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {formatNumber(timeLeft.hours)[0]}
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {formatNumber(timeLeft.hours)[1]}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">Hours</span>
                </div>

                {/* Minutes */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {formatNumber(timeLeft.minutes)[0]}
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {formatNumber(timeLeft.minutes)[1]}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">Minutes</span>
                </div>

                {/* Seconds */}
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {formatNumber(timeLeft.seconds)[0]}
                      </span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg w-10 h-12 md:w-12 md:h-14 flex items-center justify-center border border-gray-700">
                      <span className="text-white text-xl md:text-2xl font-bold">
                        {formatNumber(timeLeft.seconds)[1]}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 text-xs">Seconds</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-black font-semibold text-base md:text-lg py-6 rounded-xl shadow-lg shadow-lime-500/50 transition-all hover:shadow-lime-500/70 hover:scale-[1.02]">
              View Race
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
