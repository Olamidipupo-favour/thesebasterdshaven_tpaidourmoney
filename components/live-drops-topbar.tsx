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
  username?: string
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

const namePool = [
  "Amanda L****",
  "Daniel P****",
  "Carol O****",
  "Ricardo J****",
  "Caio J****",
  "Bruna S****",
  "Lucas M****",
  "Fernanda A****",
  "Tiago R****",
  "Mariana C****",
  "Pedro H****",
  "Juliana V****",
]

export function LiveDropsTopbar() {
  const [visibleItems, setVisibleItems] = useState<LiveDropItem[]>([])

  useEffect(() => {
    const initial = liveDropsData.slice(0, 12).map((item, i) => ({
      ...item,
      username: namePool[i % namePool.length],
    }))
    setVisibleItems(initial)

    const interval = setInterval(() => {
      const randomItem = liveDropsData[Math.floor(Math.random() * liveDropsData.length)]
      const username = namePool[Math.floor(Math.random() * namePool.length)]
      setVisibleItems((prev) => [{ ...randomItem, username }, ...prev].slice(0, 12))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="live-drops-top" className="w-full bg-[#0a1f1a] rounded-2xl px-3 py-2 shadow-2xl">
      <div className="flex items-stretch gap-3">
        {/* Left label: LIVE DROPS (like AO VIVO) */}
        <div className="relative flex-shrink-0 min-w-[130px] pl-3 pr-4 py-1.5 flex items-center">
          <div
            className="absolute inset-y-0 -left-2 right-0 rounded-xl pointer-events-none opacity-80 blur-md"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.2) 40%, transparent 100%)",
            }}
          />
          <div className="relative mr-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
          </div>
          <div className="relative z-10 flex flex-col leading-tight">
            <span className="text-white text-sm md:text-base xl:text-lg font-extrabold tracking-wider">LIVE</span>
            <span className="text-white text-sm md:text-base xl:text-lg font-extrabold tracking-wider">DROPS</span>
          </div>
        </div>

        {/* Items to the right */}
        <div className="flex-1 overflow-hidden py-0.5">
          <div className="live-drops-marquee flex items-stretch gap-2">
            {[...visibleItems, ...visibleItems].map((item, index) => (
              <LiveDropCardHorizontal key={`${item.id}-${index}`} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveDropCardHorizontal({ item, index }: { item: LiveDropItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative min-w-[180px] max-w-[220px]">
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
        className="relative rounded-xl p-1.5 cursor-pointer transition-all duration-300 hover:scale-[1.02] group overflow-hidden"
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

        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 flex-shrink-0">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`} />
            <img src={item.hoverImage || "/placeholder.svg"} alt={`${item.name} box`} className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <p className="text-gray-300 text-[10px] md:text-xs truncate">{item.username}</p>
            <h3 className="text-white font-medium text-[10px] md:text-sm truncate mb-0.5">{item.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-yellow-400 text-[11px]">$</span>
              <span className="text-yellow-400 font-bold text-[13px] md:text-base">{item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}