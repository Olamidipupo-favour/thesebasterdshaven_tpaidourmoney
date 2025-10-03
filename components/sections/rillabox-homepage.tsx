"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Shield, Zap, Users, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useBoxes } from "@/hooks/use-boxes"
import { useUserBalance } from "@/hooks/use-user"
import { useLiveDrops } from "@/hooks/use-socket"
import { liveService } from "@/lib/api/services"
import type { LiveStats } from "@/lib/api/types"

// Hero Banner Data - EXACT O Sortudo Banners
const heroBanners = [
  {
    id: 1,
    title: "JOIN TELEGRAM FOR",
    subtitle: "FREE GIVEAWAYS!",
    description: "FREE CREDIT, FREE BOXES & MORE!",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20251002-WA0203-sbZvFElxZ7WcZXjOa9U7nnE1JVZwsx.jpg",
    link: "/telegram",
    icon: "🎁",
  },
]

// Fallback featured boxes data
const fallbackBoxes = [
  {
    id: 1,
    name: "Balance Booster",
    image: "https://cdn.rillabox.com/media/boxes/BOOST-Box-mock_box_0mrPs54.png",
    price: 2.59,
    category: "starter",
    rarity: "common" as const,
    items: [],
    total_value: 4.29,
  },
  {
    id: 2,
    name: "Dubai Bling",
    image: "https://cdn.rillabox.com/media/boxes/14_DUBAI_BLING-Box-mock_box_1_9pAZR1t.png",
    price: 609.99,
    category: "luxury",
    rarity: "legendary" as const,
    items: [],
    total_value: 724.49,
  },
  {
    id: 3,
    name: "FENDI",
    image: "https://cdn.rillabox.com/media/boxes/10-FENDI-Box-mock_box_1_fzB4ZYD.png",
    price: 184.99,
    category: "fashion",
    rarity: "epic" as const,
    items: [],
    total_value: 219.99,
  },
  {
    id: 4,
    name: "Fresh Kicks",
    image: "https://cdn.rillabox.com/media/boxes/15_FRESH_KICKS-Box-mock_box_xq1VUNu.png",
    price: 24.49,
    category: "sneakers",
    rarity: "rare" as const,
    items: [],
    total_value: 28.99,
  },
  {
    id: 5,
    name: "Gamers Paradise",
    image: "https://cdn.rillabox.com/media/boxes/13_GAMERS_PARADISE-Box-mock_box_DU69psF.png",
    price: 25.99,
    category: "gaming",
    rarity: "rare" as const,
    items: [],
    total_value: 29.49,
  },
  {
    id: 6,
    name: "Risky Rolex",
    image: "https://cdn.rillabox.com/media/boxes/Risky-Rolex_mFTekxw.png",
    price: 8.39,
    category: "watches",
    rarity: "common" as const,
    items: [],
    total_value: 10.49,
  },
  {
    id: 7,
    name: "Travel",
    image: "https://cdn.rillabox.com/media/boxes/02_TRAVEL_-Box-mock_box_1_uk1ofGC.png",
    price: 9.49,
    category: "lifestyle",
    rarity: "common" as const,
    items: [],
    total_value: 11.29,
  },
]

// How It Works Steps - EXACT O Sortudo Steps
const howItWorksSteps = [
  {
    id: 1,
    title: "Sign Up",
    description:
      "Get started in seconds! Connect through Google, Facebook, or Twitter, or simply sign up with your email to unbox incredible mystery boxes here at O Sortudo.",
    icon: "https://rillabox.com/icons/menu-board.svg",
  },
  {
    id: 2,
    title: "Top Up Your Account With Credits",
    description:
      "Start your unboxing journey now! Simply top up your credits by clicking 'Deposit' button on desktop and + button on mobile. Choose your preferred payment method; we accept most major credit/debit cards as well as crypto.",
    icon: "https://rillabox.com/icons/user-square.svg",
  },
  {
    id: 3,
    title: "Unbox Hyped Products",
    description:
      "Indulge in our exclusive collection of 50+ hand-crafted mystery boxes. Unveil authentic products and seize the chance to own rare pieces at a fraction of their price. Reward yourself with top brand treasures from brands such as Gucci, Louis Vuitton, Nike & many more!",
    icon: "https://rillabox.com/icons/ic-gift.svg",
  },
  {
    id: 4,
    title: "Ship Your Products",
    description:
      "Relax as we deliver your unboxed products right to your doorstep. With global shipping and minimized costs, you can expect delivery within 7 days to 21 days, as we strive to improve!",
    icon: "https://rillabox.com/icons/truck-ic.svg",
  },
]

// Features - EXACT O Sortudo Features
const features = [
  {
    id: 1,
    title: "100% Authentic Items",
    description:
      "At O Sortudo, every item you receive is verified authentic from StockX or official retailers, guaranteeing you the real deal every time.",
    icon: "https://rillabox.com/icons/Verified-Check.svg",
  },
  {
    id: 2,
    title: "Exchange Unwanted Items",
    description:
      "Convert all items in your inventory into instant cash on O Sortudo. Unbox something that perfectly matches your style with no fees or hidden costs.",
    icon: "https://rillabox.com/icons/shopping-bag.svg",
  },
  {
    id: 3,
    title: "Worldwide Shipping",
    description: "Claim your prize & have it delivered to your doorstep, or withdraw the value.",
    icon: "https://rillabox.com/icons/truck.svg",
  },
]

// Payment Methods - EXACT O Sortudo Payment Methods
const paymentMethods = [
  { name: "Visa", icon: "https://rillabox.com/icons/visa-image.png" },
  { name: "Master Card", icon: "https://rillabox.com/icons/mastercard-icon.png" },
  { name: "Skirlls", icon: "https://rillabox.com/icons/skirlls.png" },
  { name: "Google Pay", icon: "https://rillabox.com/icons/google-pay.png" },
  { name: "Tether", icon: "https://rillabox.com/icons/tether.png" },
  { name: "Bitcoin", icon: "https://rillabox.com/icons/bitcoin.png" },
  { name: "Ethereum", icon: "https://rillabox.com/icons/ethereum.png" },
  { name: "Solana", icon: "https://rillabox.com/icons/solana-logo.png" },
]

export function OSortudoHomepage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 1,
    minutes: 32,
    seconds: 43,
  })
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null)

  // API Hooks
  const { boxes, isLoading: boxesLoading } = useBoxes()
  const { balance } = useUserBalance()
  const { drops } = useLiveDrops()

  // Banner carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch live stats
  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const response = await liveService.getStats()
        if (response.success && response.data) {
          setLiveStats(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch live stats:", error)
      }
    }

    fetchLiveStats()
    const interval = setInterval(fetchLiveStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Get featured boxes (first 7 from API or fallback)
  const featuredBoxes = boxes && boxes.length > 0 ? boxes.slice(0, 7) : fallbackBoxes

  return (
    <div className="space-y-8">
      {/* Hero Banner with Swiper - EXACT O Sortudo Style */}
      <section className="relative w-full mb-8">
        <div className="relative w-full h-[280px] md:h-[360px] overflow-hidden rounded-2xl">
          <div
            className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/90 to-emerald-950/90"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(5, 150, 105, 0.15) 0%, transparent 50%)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16">
              {/* Left side - Text content */}
              <div className="flex-1 z-10">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-yellow-400 tracking-tight leading-none">
                    JOIN TELEGRAM FOR
                  </h2>
                  <h3 className="text-4xl md:text-6xl font-black text-cyan-400 tracking-tight leading-none">
                    FREE GIVEAWAYS!
                  </h3>
                  <p className="text-lg md:text-xl font-semibold text-white/90 italic">
                    FREE CREDIT, FREE BOXES & MORE!
                  </p>
                </div>
              </div>

              {/* Right side - Telegram icon */}
              <div className="flex-shrink-0 z-10">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-cyan-400 rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-20 h-20 md:w-32 md:h-32 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                  </svg>
                </div>
              </div>

              {/* Leprechaun mascot */}
              <div
                className="absolute bottom-4 right-4 text-6xl md:text-8xl animate-bounce opacity-80"
                style={{ animationDuration: "3s" }}
              >
                🍀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Race Section - EXACT O Sortudo Layout */}
      <section className="mb-8">
        <Card className="bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-emerald-950/40 border-emerald-700/50 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)]" />

          <div className="p-6 md:p-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Left Side - Race Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <div className="text-4xl font-black text-yellow-400">$10,000</div>
                  <div className="text-xl font-bold text-white">WEEKLY RACE</div>
                  <p className="text-sm text-emerald-200 mt-1">
                    Participate in our Weekly Race simply by playing on RillaBox!
                  </p>
                </div>
              </div>

              {/* Right Side - Countdown Timer matching images */}
              <div className="bg-emerald-950/60 border border-emerald-700/50 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    {/* Days */}
                    <div className="bg-emerald-900/80 border border-emerald-700/50 rounded-lg px-4 py-3 min-w-[70px] text-center">
                      <div className="text-3xl font-black text-white">{timeLeft.days.toString().padStart(2, "0")}</div>
                      <div className="text-xs font-semibold text-emerald-400 uppercase">D</div>
                    </div>
                    <span className="text-2xl text-emerald-400 font-bold">:</span>
                    {/* Hours */}
                    <div className="bg-emerald-900/80 border border-emerald-700/50 rounded-lg px-4 py-3 min-w-[70px] text-center">
                      <div className="text-3xl font-black text-white">{timeLeft.hours.toString().padStart(2, "0")}</div>
                      <div className="text-xs font-semibold text-emerald-400 uppercase">H</div>
                    </div>
                    <span className="text-2xl text-emerald-400 font-bold">:</span>
                    {/* Minutes */}
                    <div className="bg-emerald-900/80 border border-emerald-700/50 rounded-lg px-4 py-3 min-w-[70px] text-center">
                      <div className="text-3xl font-black text-white">
                        {timeLeft.minutes.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs font-semibold text-emerald-400 uppercase">M</div>
                    </div>
                    <span className="text-2xl text-emerald-400 font-bold">:</span>
                    {/* Seconds */}
                    <div className="bg-emerald-900/80 border border-emerald-700/50 rounded-lg px-4 py-3 min-w-[70px] text-center">
                      <div className="text-3xl font-black text-white">
                        {timeLeft.seconds.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs font-semibold text-emerald-400 uppercase">S</div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-sm font-semibold text-emerald-300 uppercase tracking-wide">
                  UNTIL NEXT RACE
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Game Modes Section - EXACT O Sortudo Style */}
      <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/" className="group block">
            <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 hover:border-emerald-600/70 transition-all duration-300 overflow-hidden group-hover:scale-105">
              <div className="aspect-square relative">
                <img src="/mystery-box-treasure-chest.jpg" alt="Mystery Box" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white text-center">MYSTERY BOX</h3>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/find-prize" className="group block">
            <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 hover:border-emerald-600/70 transition-all duration-300 overflow-hidden group-hover:scale-105">
              <div className="aspect-square relative">
                <img src="/digital-grid-numbers-neon.jpg" alt="Find the Prize" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white text-center">FIND THE PRIZE</h3>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/climb" className="group block">
            <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 hover:border-emerald-600/70 transition-all duration-300 overflow-hidden group-hover:scale-105">
              <div className="aspect-square relative">
                <img src="/golden-stairway-heaven-mystical.jpg" alt="Climb to the Top" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white text-center">CLIMB TO THE TOP</h3>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/chicken-road" className="group block">
            <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 hover:border-emerald-600/70 transition-all duration-300 overflow-hidden group-hover:scale-105">
              <div className="aspect-square relative">
                <img src="/racing-road-speed-motion-blur.jpg" alt="Chicken Road" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white text-center">CHICKEN ROAD</h3>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Live Drops Ticker */}
      <section className="mb-8">
        <Card className="bg-emerald-900/30 border-emerald-700/50 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-bold whitespace-nowrap">
                LIVE DROPS
              </Badge>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-6 animate-marquee">
                  {drops.slice(0, 5).map((drop, index) => (
                    <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                      <span className="text-sm font-semibold text-white">{drop.username}</span>
                      <span className="text-sm text-emerald-400">won</span>
                      <span className="text-sm font-bold text-yellow-400">${drop.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Featured Boxes Section - EXACT O Sortudo Layout */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-emerald-400 mb-3">Featured Boxes</h2>
          <p className="text-base text-emerald-200">Discover amazing prizes in our mystery boxes</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {boxesLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="bg-emerald-900/30 border-emerald-700/50 overflow-hidden">
                  <div className="w-full h-48 bg-emerald-800/30 animate-pulse" />
                  <div className="p-4">
                    <div className="h-5 bg-emerald-800/30 rounded animate-pulse mb-3" />
                    <div className="h-8 bg-emerald-800/30 rounded animate-pulse mb-3" />
                    <div className="h-10 bg-emerald-800/30 rounded animate-pulse" />
                  </div>
                </Card>
              ))
            : featuredBoxes.map((box) => (
                <Card
                  key={box.id}
                  className="group bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 hover:border-emerald-600/70 transition-all duration-300 overflow-hidden hover:scale-105"
                >
                  <div className="relative">
                    <img
                      src={box.image || "/placeholder.svg"}
                      alt={box.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-yellow-500 text-black text-xs px-2 py-1 font-bold">1%</Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-white mb-2 truncate">{box.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl font-black text-emerald-400">${box.price}</div>
                      {box.total_value && box.total_value > box.price && (
                        <div className="text-sm text-emerald-600 line-through">${box.total_value}</div>
                      )}
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                      Open Box
                    </Button>
                  </div>
                </Card>
              ))}
        </div>
      </section>

      {/* How It Works Section - EXACT O Sortudo Layout */}
      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-emerald-400 mb-3">How It Works</h2>
          <p className="text-base text-emerald-200">Get started in just 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {howItWorksSteps.map((step, index) => (
            <Card
              key={step.id}
              className={`bg-emerald-900/30 border-emerald-700/50 overflow-hidden group hover:bg-emerald-800/40 transition-all duration-300 ${
                index === 1 ? "ring-2 ring-emerald-500/50" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-bold">STEP {step.id}</Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-emerald-200 leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Methods Section - EXACT O Sortudo Layout */}
      <section className="mb-8">
        <Card className="bg-emerald-900/30 border-emerald-700/50 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-600/30 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-white uppercase">Payment Methods</h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {paymentMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-emerald-950/50 border border-emerald-700/30 rounded-lg px-6 py-3 hover:bg-emerald-900/50 hover:border-emerald-600/50 transition-all duration-200"
                >
                  <span className="text-sm font-semibold text-white">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Why Choose O Sortudo?</h2>
          <p className="text-base text-emerald-200">
            Experience the best in online gaming with our innovative platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 transition-all duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Win Real Prizes</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Compete in tournaments and win real money, gift cards, and exclusive rewards.
              </p>
            </div>
          </Card>

          <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 transition-all duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Play with Friends</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Challenge your friends and family to exciting games and see who comes out on top.
              </p>
            </div>
          </Card>

          <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 transition-all duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Secure & Fair</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                All games are provably fair and secure. Your data and winnings are always protected.
              </p>
            </div>
          </Card>

          <Card className="bg-emerald-900/30 border-emerald-700/50 hover:bg-emerald-800/40 transition-all duration-300">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Play</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                No downloads required. Start playing instantly in your browser on any device.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
