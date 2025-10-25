"use client"

import { useState, useEffect, useRef } from "react"
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
  const queueRef = useRef<LiveDropItem[]>([])

  useEffect(() => {
    const initial = liveDropsData.slice(0, 12).map((item, i) => ({
      ...item,
      username: namePool[i % namePool.length],
    }))
    setVisibleItems(initial)

    const interval = setInterval(() => {
      const randomItem = liveDropsData[Math.floor(Math.random() * liveDropsData.length)]
      const username = namePool[Math.floor(Math.random() * namePool.length)]
      // Buffer incoming updates so current scrollers finish their full run
      queueRef.current.push({ ...randomItem, username })
      if (queueRef.current.length > 24) {
        queueRef.current.shift()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleMarqueeIteration = () => {
    if (queueRef.current.length === 0) return
    setVisibleItems((prev) => {
      const merged = [...prev, ...queueRef.current]
      queueRef.current = []
      // Keep the newest 12 items for the next full cycle
      return merged.slice(-12)
    })
  }

  return (
    <section id="live-drops-top" className="w-full bg-[#0a1f1a] rounded-2xl px-3 py-2 shadow-2xl">
      <div className="flex items-stretch gap-3">
        {/* Left label: LIVE DROPS (like AO VIVO) */}
        <div className="relative flex-shrink-0 min-w-[130px] pl-3 pr-4 py-1.5 flex items-center">
          <div
            className="absolute inset-y-0 -left-2 -right-8 rounded-xl pointer-events-none opacity-80 blur-md"
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
            <span className="text-white text-xs md:text-sm xl:text-base font-extrabold tracking-wider">LIVE</span>
            <span className="text-white text-xs md:text-sm xl:text-base font-extrabold tracking-wider">DROPS</span>
          </div>
        </div>

        {/* Items to the right */}
        <div
          className="flex-1 relative overflow-hidden py-0.5"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, black 84px, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0, black 84px, black 100%)",
          }}
        >
          <div className="live-drops-marquee flex items-stretch gap-2" onAnimationIteration={handleMarqueeIteration}>
            {[...visibleItems, ...visibleItems].map((item, index) => (
              <LiveDropCardHorizontal key={`${item.id}-${index}`} item={item} index={index} />
            ))}
          </div>

          {/* Soft fades on both edges to avoid hard borders */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10"
            style={{
              background:
                "radial-gradient(100% 80% at 0% 50%, rgba(10,31,26,0.95) 0%, rgba(10,31,26,0.8) 40%, transparent 80%)",
            }}
          />

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
            <p className="text-gray-300 text-[9px] md:text-[11px] truncate">{item.username}</p>
            <h3 className="text-white font-medium text-[9px] md:text-xs truncate mb-0.5">{item.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-yellow-400 text-[10px]">$</span>
              <span className="text-yellow-400 font-bold text-[12px] md:text-sm">{item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}