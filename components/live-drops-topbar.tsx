"use client"

import { useState, useEffect } from "react"
import { Users, Box } from "lucide-react"

type LiveDropItem = {
  id: number
  name: string
  price: number
  image: string
  hoverImage: string
  badgeColor: string
}

const liveDropsData: LiveDropItem[] = [
  { id: 1, name: "Nike Dri-FIT Head Tie - White", price: 13.2, image: "/nike-dri-fit-head-tie.jpg", hoverImage: "/mystery-box.png", badgeColor: "#6F6868" },
  { id: 2, name: "Air Force Nike College Beanie", price: 44.59, image: "/nike-college-beanie-camo.jpg", hoverImage: "/mystery-box.png", badgeColor: "#4A7C59" },
  { id: 3, name: "$250 RillaBox Voucher", price: 250.0, image: "/250-dollar-voucher-card.jpg", hoverImage: "/mystery-box.png", badgeColor: "#2B5278" },
  { id: 4, name: "LEGO® Super Mario™ Picnic", price: 47.79, image: "/lego-super-mario-picnic-set.jpg", hoverImage: "/mystery-box.png", badgeColor: "#5A7C4A" },
  { id: 5, name: "The Tiffany Archives Book", price: 84.49, image: "/tiffany-archives-blue-book.jpg", hoverImage: "/mystery-box.png", badgeColor: "#4A4A4A" },
  { id: 6, name: "VR Silicon Face Cover For Quest 2", price: 13.99, image: "/vr-silicon-face-cover-green.jpg", hoverImage: "/mystery-box.png", badgeColor: "#4A7C59" },
  { id: 7, name: "N3on Fortnite Sticker", price: 0.99, image: "/fortnite-character-sticker.jpg", hoverImage: "/mystery-box.png", badgeColor: "#6F6868" },
  { id: 8, name: "Land Rover Defender Brand New", price: 104.49, image: "/land-rover-defender-toy-model.jpg", hoverImage: "/mystery-box.png", badgeColor: "#4A4A4A" },
  { id: 9, name: "Corsair VENGEANCE LPX", price: 79.4, image: "/corsair-vengeance-ram-memory.jpg", hoverImage: "/mystery-box.png", badgeColor: "#4A7C59" },
]

export function LiveDropsTopbar() {
  const [visibleItems, setVisibleItems] = useState<LiveDropItem[]>([])

  useEffect(() => {
    // Show all items immediately on load (no staggered animation)
    setVisibleItems(liveDropsData.slice(0, 12))

    // Keep periodic updates, but without entry animations
    const interval = setInterval(() => {
      const randomItem = liveDropsData[Math.floor(Math.random() * liveDropsData.length)]
      setVisibleItems((prev) => [randomItem, ...prev].slice(0, 12))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="live-drops-top" className="w-full bg-[#0a1f1a] rounded-2xl p-3 shadow-2xl">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full" />
          </div>
          <h2 className="text-white text-sm md:text-base font-bold tracking-wide">LIVE DROPS</h2>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold leading-none">993,881</h3>
              <p className="text-gray-400 text-xs">Users</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg">
              <Box className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold leading-none">3,917,122</h3>
              <p className="text-gray-400 text-xs">Boxes Opened</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-3" />

      <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar py-1">
        {visibleItems.map((item, index) => (
          <LiveDropCardHorizontal key={`${item.id}-${index}`} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function LiveDropCardHorizontal({ item, index }: { item: LiveDropItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative min-w-[220px] max-w-[260px]">
      <div
        className="absolute -inset-[2px] rounded-xl animate-neon-pulse opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${item.badgeColor} 20%, ${item.badgeColor}dd 40%, ${item.badgeColor} 60%, transparent 80%)`,
          backgroundSize: "200% 100%",
          filter: `drop-shadow(0 0 8px ${item.badgeColor}) drop-shadow(0 0 12px ${item.badgeColor}80)`,
          animationDelay: `${index * 0.2}s`,
        }}
      />

      <div
        className="absolute -inset-[4px] rounded-xl animate-neon-pulse-outer opacity-40 blur-sm"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${item.badgeColor}aa 25%, ${item.badgeColor} 50%, ${item.badgeColor}aa 75%, transparent 100%)`,
          backgroundSize: "300% 100%",
          animationDelay: `${index * 0.2}s`,
        }}
      />

      <div
        className="relative rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, #0d1f1a 0%, ${item.badgeColor}15 50%, #0d1f1a 100%)`,
          border: `1px solid ${item.badgeColor}60`,
          boxShadow: `inset 0 0 20px ${item.badgeColor}10`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${item.badgeColor}80, transparent 60%)` }}
        />

        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex-shrink-0">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`} />
            <img src={item.hoverImage || "/placeholder.svg"} alt={`${item.name} box`} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-xs md:text-sm truncate mb-1">{item.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-400 text-xs">$</span>
              <span className="text-white font-bold text-base">{item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}