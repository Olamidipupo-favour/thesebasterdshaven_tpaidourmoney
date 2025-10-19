"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  Users, 
  Gift, 
  Star,
  Zap,
  Trophy, 
  Timer,
  ClipboardList,
  User,
  Truck,
  Shield,
  ShoppingBag,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Target
} from "lucide-react"
import Link from "next/link"
import { useBoxes } from "@/hooks/use-boxes"
import { useLiveDrops, useLiveStats } from "@/hooks/use-socket"
import { useUserBalance, useUserStats } from "@/hooks/use-user"
import { GamesSection } from "@/components/sections/games-section"
import { WeeklyRaceSection } from "@/components/sections/weekly-race-section"
import { StatsSection } from "@/components/sections/stats-section"

// Banner data adapted to provided HTML (desktop/mobile images and links)
const heroBanners = [
  {
    id: 1,
    desktopImage: "/new/banner2.png",
    mobileImage: "/new/banner2.png",
    href: "/",
    alt: "New Boxes"
  },
  {
    id: 2,
    desktopImage: "https://rillabox.s3.amazonaws.com/media/banners/DESKTOP-DAILY-FREE2.png",
    mobileImage: "https://rillabox.s3.amazonaws.com/media/banners/MOBILE-DAILY-FREE2.png",
    href: "/",
    alt: "Daily Free"
  },
  {
    id: 3,
    desktopImage: "https://rillabox.s3.amazonaws.com/media/banners/DESKTOP-TELEGRAM.png",
    mobileImage: "https://rillabox.s3.amazonaws.com/media/banners/MOBILE-TELEGRAM.png",
    href: "https://telegram.com",
    alt: "Telegram"
  },
  {
    id: 4,
    desktopImage: "/new/banner1.png",
    mobileImage: "/new/banner1.png",
    href: "/",
    alt: "Starter"
  }
]

// Featured Boxes - EXACT O Sortudo Data with precise styling
const featuredBoxes = [
  {
    id: 1,
    name: "Balance Booster",
    image: "https://cdn.rillabox.com/media/boxes/BOOST-Box-mock_box_0mrPs54.png",
    originalPrice: 4.29,
    salePrice: 2.59
  },
  {
    id: 2,
    name: "Dubai Bling",
    image: "https://cdn.rillabox.com/media/boxes/14_DUBAI_BLING-Box-mock_box_1_9pAZR1t.png",
    originalPrice: 724.49,
    salePrice: 609.99
  },
  {
    id: 3,
    name: "FENDI",
    image: "https://cdn.rillabox.com/media/boxes/10-FENDI-Box-mock_box_1_fzB4ZYD.png",
    originalPrice: 219.99,
    salePrice: 184.99
  },
  {
    id: 4,
    name: "Fresh Kicks",
    image: "https://cdn.rillabox.com/media/boxes/15_FRESH_KICKS-Box-mock_box_xq1VUNu.png",
    originalPrice: 28.99,
    salePrice: 24.49
  },
  {
    id: 5,
    name: "Gamers Paradise",
    image: "https://cdn.rillabox.com/media/boxes/13_GAMERS_PARADISE-Box-mock_box_DU69psF.png",
    originalPrice: 29.49,
    salePrice: 25.99
  },
  {
    id: 6,
    name: "Risky Rolex",
    image: "https://cdn.rillabox.com/media/boxes/Risky-Rolex_mFTekxw.png",
    originalPrice: 10.49,
    salePrice: 8.39
  },
  {
    id: 7,
    name: "Travel",
    image: "https://cdn.rillabox.com/media/boxes/02_TRAVEL_-Box-mock_box_1_uk1ofGC.png",
    originalPrice: 11.29,
    salePrice: 9.49
  }
]

// How It Works Steps - EXACT O Sortudo Steps
const howItWorksSteps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Get started in seconds! Connect through Google, Facebook, or Twitter, or simply sign up with your email to unbox incredible mystery boxes here at O Sortudo.",
    icon: "/icons/landing/menu-board green.svg"
  },
  {
    id: 2,
    title: "Top Up Your Account With Credits",
    description: "Start your unboxing journey now! Simply top up your credits by clicking 'Deposit' button on desktop and + button on mobile. Choose your preferred payment method; we accept most major credit/debit cards as well as crypto.",
    icon: "/icons/landing/user-square green.svg"
  },
  {
    id: 3, 
    title: "Unbox Hyped Products",
    description: "Indulge in our exclusive collection of 50+ hand-crafted mystery boxes. Unveil authentic products and seize the chance to own rare pieces at a fraction of their price. Reward yourself with top brand treasures from brands such as Gucci, Louis Vuitton, Nike & many more!",
    icon: "/icons/landing/ic-gift grreen.svg"
  },
  {
    id: 4,
    title: "Ship Your Products",
    description: "Relax as we deliver your unboxed products right to your doorstep. With global shipping and minimized costs, you can expect delivery within 7 days to 21 days, as we strive to improve!",
    icon: "/icons/landing/truck-ic green.svg"
  }
]

// Features - EXACT O Sortudo Features
const features = [
  {
    id: 1,
    title: "100% Authentic Items",
    description: "At O Sortudo, every item you receive is verified authentic from StockX or official retailers, guaranteeing you the real deal every time.",
    icon: "https://rillabox.com/icons/Verified-Check.svg"
  },
  {
    id: 2,
    title: "Exchange Unwanted Items",
    description: "Convert all items in your inventory into instant cash on O Sortudo. Unbox something that perfectly matches your style with no fees or hidden costs.",
    icon: "https://rillabox.com/icons/shopping-bag.svg"
  },
  {
    id: 3,
    title: "Worldwide Shipping",
    description: "Claim your prize & have it delivered to your doorstep, or withdraw the value.",
    icon: "https://rillabox.com/icons/truck.svg"
  }
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
  { name: "Solana", icon: "https://rillabox.com/icons/solana-logo.png" }
]

export function OSortudoHomepage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 23,
    seconds: 42
  })

  // API hooks
  const { boxes, isLoading: boxesLoading } = useBoxes()
  const { drops } = useLiveDrops()
  const { balance } = useUserBalance()
  const { stats } = useUserStats()
  const { stats: liveStats } = useLiveStats()

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
      setTimeLeft(prev => {
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

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Banner Section - Tailwind functional slider */}
      <section className="w-full mb-4 md:mb-6">
        <div className="grid grid-cols-12 items-stretch gap-x-0 md:gap-x-4">
          {/* Left: Slider */}
          <div className="col-span-12 md:col-span-8 h-auto pl-0">
            <div className="relative w-full h-full overflow-hidden">
              {/* Slides */}
              <div className="relative w-full h-full">
                {heroBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentBanner ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <a href={banner.href} className="inline-block w-full h-full">
                      {/* Desktop image */}
                      <img
                        src={banner.desktopImage}
                        alt={banner.alt}
                        className="hidden md:block w-full h-full object-cover"
                      />
                      {/* Mobile image */}
                      <img
                        src={banner.mobileImage}
                        alt={banner.alt}
                        className="md:hidden block w-full h-full object-cover"
                      />
                    </a>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={() => setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 shadow-md z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentBanner((prev) => (prev + 1) % heroBanners.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 shadow-md z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {heroBanners.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentBanner(index)}
                    className={`w-2 h-2 rounded-full ${index === currentBanner ? 'bg-white' : 'bg-white/50 hover:bg-white/70'} transition-colors`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Achievements banner */}
          <div className="col-span-12 md:col-span-4 h-auto pr-0">
            <div className="h-full overflow-hidden">
              <a href="/" className="block w-full h-full">
                {/* Desktop */}
                <img
                  src="/new/acheivement banner.jpg"
                  alt="Rillabox Mystery Boxes"
                  className="hidden md:block w-full h-auto"
                />
                {/* Mobile */}
                <img
                  src="/new/acheivement banner.jpg"
                  alt="Refreal-code-image"
                  className="md:hidden block w-full h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section - Exact user-provided gamemodes markup */}
      <GamesSection />
      {false && (<section className="w-full mb-8">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
            {/* Mystery Boxes - BIGGER with enhanced box opening animation */}
            <Link href="/boxes" className="group block h-full">
              <div className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-primary/20">
                <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 relative overflow-hidden">
                  {/* Main gift box icon */}
                  <Gift className="w-12 h-12 text-primary group-hover:animate-spin transition-transform duration-500" />
                  
                  {/* Enhanced box opening animation overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse"></div>
                  
                  {/* Enhanced items flying out animation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {/* Flying items with different sizes and colors */}
                    <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping absolute top-3 left-3"></div>
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-ping absolute top-6 right-4" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-ping absolute bottom-4 left-6" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-ping absolute bottom-3 right-3" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping absolute top-8 left-8" style={{ animationDelay: '0.4s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping absolute bottom-6 right-6" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping absolute top-4 right-8" style={{ animationDelay: '0.6s' }}></div>
                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-ping absolute bottom-8 left-4" style={{ animationDelay: '0.7s' }}></div>
                  </div>
                  
                  {/* Sparkle effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-4 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-2 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute bottom-4 right-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                </div>
                </div>
                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">Mystery Boxes</span>
              </div>
            </Link>
            
            {/* Find the Prize - BIGGER with enhanced number selection animation */}
            <Link href="/find-prize" className="group block h-full">
              <div className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-primary/20">
                <div className="w-full h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-300 relative overflow-hidden">
                  <Target className="w-12 h-12 text-secondary group-hover:animate-bounce transition-transform duration-500" />
                  
                  {/* Enhanced number selection animation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="grid grid-cols-4 gap-1">
                      <div className="w-3 h-3 bg-blue-400 rounded-sm animate-pulse"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-sm animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-sm animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-red-400 rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-3 h-3 bg-purple-400 rounded-sm animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <div className="w-3 h-3 bg-pink-400 rounded-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                      <div className="w-3 h-3 bg-indigo-400 rounded-sm animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                      <div className="w-3 h-3 bg-orange-400 rounded-sm animate-pulse" style={{ animationDelay: '0.7s' }}></div>
                      <div className="w-3 h-3 bg-cyan-400 rounded-sm animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                </div>
                  </div>
                  
                  {/* Number highlighting effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.9s' }}></div>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground group-hover:text-secondary transition-colors duration-300">Find the Prize</span>
              </div>
            </Link>
            
            {/* Climb to the Top - BIGGER with enhanced tower building animation */}
            <Link href="/climb-top" className="group block h-full">
              <div className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-primary/20">
                <div className="w-full h-32 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-chart-1/30 group-hover:to-chart-2/30 transition-all duration-300 relative overflow-hidden">
                  <Timer className="w-12 h-12 text-chart-1 group-hover:animate-pulse transition-transform duration-500" />
                  
                  {/* Enhanced tower building animation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="w-4 h-2 bg-yellow-400 rounded-sm animate-bounce"></div>
                      <div className="w-5 h-2 bg-orange-400 rounded-sm animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-6 h-2 bg-red-400 rounded-sm animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-7 h-2 bg-purple-400 rounded-sm animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-8 h-2 bg-pink-400 rounded-sm animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <div className="w-9 h-2 bg-indigo-400 rounded-sm animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                </div>
                  </div>
                  
                  {/* Tower completion sparkles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute top-4 left-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute top-4 right-4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground group-hover:text-chart-1 transition-colors duration-300">Soccer Game</span>
              </div>
            </Link>
            
            {/* Chicken Road - BIGGER with enhanced road/car animation */}
            <Link href="/chicken-road" className="group block h-full">
              <div className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 hover:shadow-2xl transition-all duration-300 h-full group-hover:scale-105 group-hover:shadow-primary/20">
                <div className="w-full h-32 bg-gradient-to-br from-chart-3/20 to-chart-4/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-chart-3/30 group-hover:to-chart-4/30 transition-all duration-300 relative overflow-hidden">
                  <Target className="w-12 h-12 text-chart-3 group-hover:animate-spin transition-transform duration-500" />
                  
                  {/* Enhanced road/car animation */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full flex items-end justify-center">
                      <div className="w-12 h-4 bg-gray-400 rounded-sm relative">
                        {/* Road lines */}
                        <div className="absolute top-1 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
                        <div className="absolute top-1 left-6 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                        <div className="absolute top-1 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                        
                        {/* Car lights */}
                        <div className="absolute -top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                        <div className="absolute -top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
                        
                        {/* Moving car effect */}
                        <div className="absolute -top-1 left-1 w-3 h-2 bg-red-400 rounded-sm animate-pulse"></div>
                        <div className="absolute -top-1 right-1 w-3 h-2 bg-blue-400 rounded-sm animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
                    </div>
                  </div>
                  
                  {/* Road dust effects */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-2 left-4 w-1 h-1 bg-gray-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 right-4 w-1 h-1 bg-gray-300 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="absolute bottom-4 left-6 w-1 h-1 bg-gray-300 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
                    <div className="absolute bottom-4 right-6 w-1 h-1 bg-gray-300 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                <span className="text-sm font-bold text-foreground group-hover:text-chart-3 transition-colors duration-300">Chicken Road</span>
              </div>
            </Link>
          </div>
        </div>
      </section>)}

      {/* Featured Boxes Section - Animated with hover effects */}
      <section className="mb-8">
        <div className="d-flex align-items-center gap-3 mt-5 mb-4">
          <div className="info-img">
            <img src="https://rillabox.com/icons/landing/featured-box.svg" alt="featured-box" className="img-fluid" />
          </div>
          <div className="info-text w-75">
            <h3 className="font-18 fw-medium">Featured boxes</h3>
            <p className="font-14 fw-normal">Explore our 200+ mystery boxes</p>
          </div>
        </div>
        <div className="boxes-container landing-boxes mb-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3" style={{ display: 'grid' }}>
          <div>
            <div className="sc-iHmpnF eXDFil box-item group relative" style={{ "--accent-color": "#FFBE0B" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">1% iPhone</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/08_1__IPHONE-Box-mock_box_1.png" alt="1% iPhone" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>3.94</span></div>
                <div className="current-price"><span>$</span><span>2.79</span></div>
              </div>
              <Link href="/boxes/iphone-box" className="absolute inset-0 z-10" aria-label="Open 1% iPhone"><span className="sr-only">Open 1% iPhone</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF goUMrq box-item group relative" style={{ "--accent-color": "#C8102E" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Alfa Romeo</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/06_ALFA_ROMEO-Box-mock_box_1.png" alt="Alfa Romeo" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>564.99</span></div>
                <div className="current-price"><span>$</span><span>469.99</span></div>
              </div>
              <Link href="/boxes/alfa-romeo" className="absolute inset-0 z-10" aria-label="Open Alfa Romeo"><span className="sr-only">Open Alfa Romeo</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF iBpake box-item group relative" style={{ "--accent-color": "#FF9900" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Amazon</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/Amazon.png" alt="Amazon" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>8.49</span></div>
                <div className="current-price"><span>$</span><span>6.79</span></div>
              </div>
              <Link href="/boxes/amazon" className="absolute inset-0 z-10" aria-label="Open Amazon"><span className="sr-only">Open Amazon</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF bwTbAw box-item group relative" style={{ "--accent-color": "#8A8A95" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Bentley</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/05_BENTLEY-Box-mock_box_1.png" alt="Bentley" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>1999.99</span></div>
                <div className="current-price"><span>$</span><span>1889.99</span></div>
              </div>
              <Link href="/boxes/bentley" className="absolute inset-0 z-10" aria-label="Open Bentley"><span className="sr-only">Open Bentley</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF hQTtrT box-item group relative" style={{ "--accent-color": "#43A047" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Call Of Duty</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/Call-of-Duty.png" alt="Call Of Duty" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>7.87</span></div>
                <div className="current-price"><span>$</span><span>5.79</span></div>
              </div>
              <Link href="/boxes/call-of-duty" className="absolute inset-0 z-10" aria-label="Open Call Of Duty"><span className="sr-only">Open Call Of Duty</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF cbMspm box-item group relative" style={{ "--accent-color": "#FF69B4" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Holidays</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/03_HOLIDAYS_-Box-mock_box_1.png" alt="Holidays" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>10.49</span></div>
                <div className="current-price"><span>$</span><span>8.29</span></div>
              </div>
              <Link href="/boxes/holidays" className="absolute inset-0 z-10" aria-label="Open Holidays"><span className="sr-only">Open Holidays</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF gKAfqw box-item group relative" style={{ "--accent-color": "#1E9D34" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">India</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/15_INDIA-Box-mock_box_1.png" alt="India" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>2.99</span></div>
                <div className="current-price"><span>$</span><span>2.24</span></div>
              </div>
              <Link href="/boxes/india" className="absolute inset-0 z-10" aria-label="Open India"><span className="sr-only">Open India</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF jxfbuA box-item group relative" style={{ "--accent-color": "#C3002F" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Nissan</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/11_NISSAN-Box-mock_box_1.png" alt="Nissan" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>544.99</span></div>
                <div className="current-price"><span>$</span><span>484.99</span></div>
              </div>
              <Link href="/boxes/nissan" className="absolute inset-0 z-10" aria-label="Open Nissan"><span className="sr-only">Open Nissan</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF buczcf box-item group relative" style={{ "--accent-color": "#FFD700" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Risky Rolex</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/Risky-Rolex.png" alt="Risky Rolex" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>10.49</span></div>
                <div className="current-price"><span>$</span><span>8.39</span></div>
              </div>
              <Link href="/boxes/risky-rolex" className="absolute inset-0 z-10" aria-label="Open Risky Rolex"><span className="sr-only">Open Risky Rolex</span></Link>
            </div>
          </div>
          <div>
            <div className="sc-iHmpnF lpdxJd box-item group relative" style={{ "--accent-color": "#C67E3E" } as React.CSSProperties}>
              {/* <img src="https://rillabox.com/images/helloween/shape-1.svg" alt="Haloween" className="end-0 h-auto position-absolute start-auto top-0 vector-halloween" /> */}
              <span className="box-name">Travis Scott</span>
              <img className="prod-img" src="https://cdn.rillabox.com/media/boxes/TRAVIS_SCOTT-mock_box.png" alt="Travis Scott" />
              <div className="price-container">
                <div className="original-price"><span>$</span><span>39.99</span></div>
                <div className="current-price"><span>$</span><span>33.49</span></div>
              </div>
              <Link href="/boxes/travis-scott" className="absolute inset-0 z-10" aria-label="Open Travis Scott"><span className="sr-only">Open Travis Scott</span></Link>
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex justify-center">
            <Link
              href="/boxes"
              className="shop-btn button-primary mobile-fs-16 view-btn btn btn-primary px-5 py-2 inline-flex items-center justify-center gap-1.5 rounded-lg"
              style={{ minWidth: 0, display: 'inline-flex', alignItems: 'center' }}
            >
              <img src="https://rillabox.com/icons/landing/shopping-cart.svg" alt="Cart" style={{ width: '18px', height: '18px' }} />
              <span>View All</span>
            </Link>
          </div>
        </div>

      </section>
      {false && (<section className="mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured boxes</h2>
          <p className="text-lg text-muted-foreground">Discover & win the hottest items in our provably fair boxes</p>
        </div>

        {/* Featured Boxes Grid - EXACT Rillabox Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Balance Booster Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
            </div>
            
            <div className="relative z-20 flex flex-col flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn.rillabox.com/media/boxes/BOOST-Box-mock_box_0mrPs54.png"
                  alt="Balance Booster"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    Balance Booster
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white text-sm px-3 py-1 animate-pulse">
                    🔥 Hot
                  </Badge>
      </div>
      </div>
      {/* Users and Boxes card will appear below by replacing old stats section */}

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">Balance Booster</h3>
                <p className="text-sm text-muted-foreground mb-4">Boost your balance with guaranteed rewards</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$2.59</div>
                  <div className="text-sm text-muted-foreground line-through">$4.29</div>
                </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Open Box
                </Button>
                  </div>
                </div>
              </Card>

          {/* Dubai Bling Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
            </div>
                
                <div className="relative z-20 flex flex-col flex-1">
                  <div className="relative flex-shrink-0">
                    <img
                  src="https://cdn.rillabox.com/media/boxes/14_DUBAI_BLING-Box-mock_box_1_9pAZR1t.png"
                  alt="Dubai Bling"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    Dubai Bling
                      </Badge>
                    </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-500 text-white text-sm px-3 py-1 animate-pulse">
                    💎 Luxury
                        </Badge>
                      </div>
                  </div>

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">Dubai Bling</h3>
                <p className="text-sm text-muted-foreground mb-4">Luxury items from the city of gold</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$609.99</div>
                  <div className="text-sm text-muted-foreground line-through">$724.49</div>
                      </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Open Box
                </Button>
                    </div>
            </div>
          </Card>

          {/* FENDI Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative ring-2 ring-primary/20 flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
            </div>
            
            <div className="relative z-20 flex flex-col flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn.rillabox.com/media/boxes/10-FENDI-Box-mock_box_1_fzB4ZYD.png"
                  alt="FENDI"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    FENDI
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-purple-500 text-white text-sm px-3 py-1 animate-pulse">
                    ⭐ Featured
                  </Badge>
                      </div>
                    </div>

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">FENDI</h3>
                <p className="text-sm text-muted-foreground mb-4">Italian luxury fashion and accessories</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$184.99</div>
                  <div className="text-sm text-muted-foreground line-through">$219.99</div>
                </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Open Box
                    </Button>
                  </div>
                </div>
              </Card>

          {/* Fresh Kicks Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
        </div>

            <div className="relative z-20 flex flex-col flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn.rillabox.com/media/boxes/15_FRESH_KICKS-Box-mock_box_xq1VUNu.png"
                  alt="Fresh Kicks"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    Fresh Kicks
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-pink-500 text-white text-sm px-3 py-1 animate-pulse">
                    👟 Sneakers
                  </Badge>
                </div>
              </div>

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">Fresh Kicks</h3>
                <p className="text-sm text-muted-foreground mb-4">Latest sneaker drops and streetwear</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$24.49</div>
                  <div className="text-sm text-muted-foreground line-through">$28.99</div>
                </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Open Box
                </Button>
              </div>
            </div>
          </Card>

          {/* Gamers Paradise Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
            </div>
            
            <div className="relative z-20 flex flex-col flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn.rillabox.com/media/boxes/13_GAMERS_PARADISE-Box-mock_box_DU69psF.png"
                  alt="Gamers Paradise"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    Gamers Paradise
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-500 text-white text-sm px-3 py-1 animate-pulse">
                    🎮 Gaming
                  </Badge>
                </div>
              </div>

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">Gamers Paradise</h3>
                <p className="text-sm text-muted-foreground mb-4">Gaming gear and tech accessories</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$25.99</div>
                  <div className="text-sm text-muted-foreground line-through">$29.49</div>
                </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Open Box
                </Button>
              </div>
            </div>
          </Card>

          {/* Risky Rolex Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
            </div>
            
            <div className="relative z-20 flex flex-col flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn.rillabox.com/media/boxes/Risky-Rolex_mFTekxw.png"
                  alt="Risky Rolex"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    Risky Rolex
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white text-sm px-3 py-1 animate-pulse">
                    ⚠️ Risky
                  </Badge>
                </div>
              </div>

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">Risky Rolex</h3>
                <p className="text-sm text-muted-foreground mb-4">High-risk, high-reward luxury watches</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$8.39</div>
                  <div className="text-sm text-muted-foreground line-through">$10.49</div>
                </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Open Box
                </Button>
              </div>
            </div>
          </Card>

          {/* Travel Box */}
          <Card className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl overflow-hidden group-hover:scale-105 relative flex flex-col h-full">
            {/* Continuous Green Light Animation Around Edge */}
            <div className="absolute inset-0 overflow-hidden z-10">
              {/* Top edge light */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              {/* Right edge light */}
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Bottom edge light */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* Left edge light */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Corner lights */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.25s' }}></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '0.75s' }}></div>
            </div>
            
            <div className="relative z-20 flex flex-col flex-1">
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn.rillabox.com/media/boxes/02_TRAVEL_-Box-mock_box_1_uk1ofGC.png"
                  alt="Travel"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 group-hover:animate-pulse">
                    Travel
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-cyan-500 text-white text-sm px-3 py-1 animate-pulse">
                    ✈️ Travel
                  </Badge>
                </div>
              </div>

              <div className="p-4 mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-3">Travel</h3>
                <p className="text-sm text-muted-foreground mb-4">Travel essentials and accessories</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">$9.49</div>
                  <div className="text-sm text-muted-foreground line-through">$11.29</div>
                </div>
                <Button className="w-full glow-effect text-sm py-3 h-12 group-hover:animate-pulse">
                  <Gift className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Open Box
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Shop All Button - EXACT Rillabox Style */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8 py-3 text-base">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop All
          </Button>
        </div>
      </section>)}

      {/* Stats Section (v0-build-landing-page) */}
      <section className="mb-6">
        <StatsSection />
      </section>

      {/* Weekly Race Banner inline block removed to avoid duplication; using <WeeklyRaceSection /> below */}

      {/* Live Drops Section - Real-time Activity */}
      {drops && drops.length > 0 && (
        <section className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-foreground mb-2">🔥 Live Drops</h2>
            <p className="text-sm text-muted-foreground">See what others are winning right now!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drops.slice(0, 6).map((drop, index) => (
              <Card key={`${drop.id}-${index}`} className="bg-card border-border overflow-hidden group hover:shadow-md transition-all duration-200">
                <div className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {drop.user.username}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        won {drop.item.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">
                        ${drop.item.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        from {drop.box.name}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Live Statistics Section */}
      {liveStats && (
        <section className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-foreground mb-2">📊 Live Statistics</h2>
            <p className="text-sm text-muted-foreground">Real-time platform activity</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border p-4 text-center hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-lg font-bold text-foreground">
                {liveStats.total_players_online.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Online Now</div>
            </Card>

            <Card className="bg-card border-border p-4 text-center hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Timer className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-lg font-bold text-foreground">
                {liveStats.total_games_active}
              </div>
              <div className="text-xs text-muted-foreground">Active Games</div>
            </Card>

            <Card className="bg-card border-border p-4 text-center hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Gift className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-lg font-bold text-foreground">
                ${liveStats.total_wagered_today.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Wagered Today</div>
            </Card>

            <Card className="bg-card border-border p-4 text-center hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-lg font-bold text-foreground">
                ${liveStats.biggest_win_today.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Biggest Win</div>
            </Card>
          </div>
        </section>
      )}

      {/* Weekly Race Section - Implemented with exact provided HTML structure */}
      <WeeklyRaceSection />

      {/* How It Works Section - EXACT O Sortudo Layout */}
      <section className="mb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">How It Works</h2>
          <p className="text-sm md:text-base text-muted-foreground">Get started in just 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step) => (
            <Card
              key={step.id}
              className="group relative rounded-2xl bg-[#0b1e17] border border-[#163526] overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-[#22c55e]/60 hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#163526] transition-all duration-200 group-hover:h-[8px] group-hover:bg-[#22c55e]" />
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] md:text-xs font-semibold text-[#22c55e] uppercase">STEP {step.id}</span>
                  <img src={step.icon} alt={step.title} className="w-6 h-6" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Industry-leading Banner - Rillabox-inspired (Sortudo theme) */}
      <section className="relative mb-10 rounded-2xl overflow-hidden border border-[#1f6b4a] bg-gradient-to-b from-[#0a1b14] via-[#0d241b] to-[#0a1b14]">
        {/* Star field overlay to mimic Rillabox background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '6px 6px'
          }}
        />
        {/* Local mascot images on both sides */}
        <img src="/new/mascot2.png" alt="Mascot left" className="hidden md:block absolute left-4 bottom-0 w-28 h-28 md:w-40 md:h-40 drop-shadow-lg" />
        <img src="/new/mascot2.png" alt="Mascot right" className="hidden md:block absolute right-4 bottom-0 w-28 h-28 md:w-40 md:h-40 drop-shadow-lg scale-x-[-1]" />
        {/* Soft shadows under mascots for depth */}
        <div className="hidden md:block absolute left-6 bottom-2 w-28 h-6 rounded-full bg-black/40 blur-md opacity-40" />
        <div className="hidden md:block absolute right-6 bottom-2 w-28 h-6 rounded-full bg-black/40 blur-md opacity-40" />
        <div className="relative text-center px-6 py-10 md:py-12">
          <h2 className="text-white font-semibold max-w-[824px] mx-auto mb-5 text-[20px] md:text-[24px]">
            Our industry-leading "Provably Fair" technology ensures that all mystery box draws are completely fair, guaranteeing a 100% fair experience.
          </h2>
          <span className="block text-muted-foreground mb-3 text-[14px] md:text-[16px]">
            We uphold complete transparency and have no means of manipulating the outcome in any manner.
          </span>
          <Button type="button" className="min-w-[248px] justify-center text-sm md:text-base h-10 md:h-12 bg-[#1f6b4a] hover:bg-[#238257] text-white gap-2">
            Learn more
            <img src="/icons/landing/button-right-arrow.svg" alt="button-right-arrow" className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Features Grid - Three Cards (Green accent) */}
      <section className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
              <Star className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">100% Authentic Items</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              At RillaBox, every item you receive is verified authentic from StockX or official retailers, guaranteeing you the real deal every time.
            </p>
          </Card>

          <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
              <Gift className="w-8 h-8 text-primary group-hover:animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">Exchange Unwanted Items</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Convert all items in your inventory into instant cash on RillaBox. Unbox something that perfectly matches your style with no fees or hidden costs.
            </p>
          </Card>

          <Card className="bg-card border-border text-center p-6 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 group-hover:scale-110 transition-all duration-300">
              <Zap className="w-8 h-8 text-green-500 group-hover:animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">Worldwide Shipping</h3>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Claim your prize & have it delivered to your doorstep, or withdraw the value.
            </p>
          </Card>
        </div>
      </section>

      {/* Payment Methods Bar - Match Design */}
      <section className="mb-10">
        <div className="rounded-xl border border-[#1f6b4a] bg-gradient-to-r from-[#0e1f17] via-[#0b1a14] to-[#0e1f17] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/new/icons8-magnetic-card-100.png" alt="Payment Icon" className="w-6 h-6" />
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#1f6b4a] text-white text-xs font-semibold tracking-wide">
                PAYMENT METHODS
              </span>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-end">
              {paymentMethods.map((method) => (
                <div key={method.name} className="w-14 h-14 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner">
                  <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain brightness-110 contrast-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose O Sortudo - Match Design */}
      <section className="relative mb-6 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1b14] via-[#0d241b] to-[#0a1b14]" />
        <div className="relative px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose O Sortudo?</h2>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">Experience the best in online gaming with our innovative platform</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Win Real Prizes */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner mb-3">
                <Gift className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">Win Real Prizes</h3>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground max-w-xs">Compete in tournaments and win real money, gift cards, and exclusive rewards.</p>
            </div>

            {/* Play with Friends */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner mb-3">
                <Users className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">Play with Friends</h3>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground max-w-xs">Challenge your friends and family to exciting games and see who comes out on top.</p>
            </div>

            {/* Secure & Fair */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner mb-3">
                <Shield className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">Secure & Fair</h3>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground max-w-xs">All games are provably fair and secure. Your data and winnings are always protected.</p>
            </div>

            {/* Instant Play */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner mb-3">
                <Timer className="w-6 h-6 text-[#22c55e]" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground">Instant Play</h3>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground max-w-xs">No downloads required. Start playing instantly in your browser on any device.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}