"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageCircle, Gift } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "JOIN TELEGRAM FOR",
    subtitle: "FREE GIVEAWAYS!",
    description: "FREE CREDIT, FREE BOXES & MORE!",
    icon: <MessageCircle className="w-12 h-12" />,
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-800",
    textColor: "text-white",
  },
  {
    id: 2,
    title: "LUCKY IRISH",
    subtitle: "MYSTERY BOXES!",
    description: "WIN AMAZING PRIZES WITH EVERY BOX!",
    icon: <Gift className="w-12 h-12" />,
    bgColor: "bg-gradient-to-r from-primary to-secondary",
    textColor: "text-white",
  },
]

export function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const banner = banners[currentBanner]

  return (
    <div className="relative mb-8">
      <div className={`${banner.bgColor} ${banner.textColor} rounded-2xl p-8 md:p-12 relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">🍀</div>
          <div className="absolute top-8 right-8 text-4xl">💰</div>
          <div className="absolute bottom-4 left-8 text-5xl">🌈</div>
          <div className="absolute bottom-8 right-4 text-3xl">⭐</div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h2>
            <h3 className="text-2xl md:text-4xl font-bold text-yellow-300 mb-4">{banner.subtitle}</h3>
            <p className="text-lg md:text-xl opacity-90 mb-6">{banner.description}</p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 text-lg glow-effect"
            >
              {currentBanner === 0 ? "Join Telegram" : "Open Mystery Box"}
            </Button>
          </div>

          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              {banner.icon}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={prevBanner}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
          onClick={nextBanner}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentBanner ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>

      {/* Irish Mascot Character */}
      <div className="absolute -right-4 -top-4 hidden lg:block">
        <div className="w-32 h-32 bg-primary rounded-full flex items-center justify-center coin-spin">
          <span className="text-6xl">🍀</span>
        </div>
      </div>
    </div>
  )
}
