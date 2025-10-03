"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  Users, 
  Gift, 
  Trophy, 
  Timer,
  ClipboardList,
  User,
  Truck,
  Shield,
  ShoppingBag,
  CreditCard,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Target
} from "lucide-react"
import Link from "next/link"

// Hero Banner Data - EXACT RillaBox Banners
const heroBanners = [
  {
    id: 1,
    image: "https://rillabox.s3.amazonaws.com/media/banners/ACHIEVEMENTS_-_NEW_SEASON_BANNER_DESKTOP.png",
    link: "/achievements",
    alt: "Achievements Banner"
  },
  {
    id: 2,
    image: "https://rillabox.s3.amazonaws.com/media/banners/AFSDFEW.png",
    link: "/home",
    alt: "Mystery Boxes Banner"
  },
  {
    id: 3,
    image: "https://rillabox.s3.amazonaws.com/media/banners/STARTER_DESKTOP_BANNER_JTZniV6.jpg",
    link: "/signup",
    alt: "Starter Banner"
  },
  {
    id: 4,
    image: "https://rillabox.s3.amazonaws.com/media/banners/tele_desktop_ban_nnBhx1L.png",
    link: "/telegram",
    alt: "Telegram Banner"
  }
]

// Featured Boxes - EXACT RillaBox Data with precise styling
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

// How It Works Steps - EXACT RillaBox Steps
const howItWorksSteps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Get started in seconds! Connect through Google, Facebook, or Twitter, or simply sign up with your email to unbox incredible mystery boxes here at O Sortudo.",
    icon: "https://rillabox.com/icons/menu-board.svg"
  },
  {
    id: 2,
    title: "Top Up Your Account With Credits",
    description: "Start your unboxing journey now! Simply top up your credits by clicking 'Deposit' button on desktop and + button on mobile. Choose your preferred payment method; we accept most major credit/debit cards as well as crypto.",
    icon: "https://rillabox.com/icons/user-square.svg"
  },
  {
    id: 3,
    title: "Unbox Hyped Products",
    description: "Indulge in our exclusive collection of 50+ hand-crafted mystery boxes. Unveil authentic products and seize the chance to own rare pieces at a fraction of their price. Reward yourself with top brand treasures from brands such as Gucci, Louis Vuitton, Nike & many more!",
    icon: "https://rillabox.com/icons/ic-gift.svg"
  },
  {
    id: 4,
    title: "Ship Your Products",
    description: "Relax as we deliver your unboxed products right to your doorstep. With global shipping and minimized costs, you can expect delivery within 7 days to 21 days, as we strive to improve!",
    icon: "https://rillabox.com/icons/truck-ic.svg"
  }
]

// Features - EXACT RillaBox Features
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

// Payment Methods - EXACT RillaBox Payment Methods
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

export function RillaBoxHomepage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 23,
    seconds: 42
  })

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
    <div className="space-y-8">
      {/* Hero Banner with Swiper - EXACT RillaBox Style */}
      <section className="relative w-full mb-6">
        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg shadow-md">
          {/* Banner Images */}
          <div className="relative w-full h-full">
            {heroBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentBanner ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Link href={banner.link}>
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - EXACT RillaBox Style */}
          <button
            onClick={() => setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 shadow-md hover:scale-105 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % heroBanners.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 shadow-md hover:scale-105 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator - EXACT RillaBox Style */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentBanner ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Gorilla Image - EXACT RillaBox Style */}
          <div className="absolute bottom-0 right-0 pointer-events-none z-0">
            <img 
              src="https://rillabox.com/images/gorilla-landingpage2.png" 
              alt="O Sortudo Mystery Boxes" 
              className="h-24 md:h-32 w-auto object-contain opacity-80 animate-pulse"
            />
          </div>
        </div>
      </section>

      {/* Game Modes Section - EXACT RillaBox Style */}
      <section className="w-full mb-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full max-w-4xl">
            <Link href="/" className="group block h-full">
              <div className="bg-card border border-border rounded-lg p-2 text-center hover:border-primary/50 hover:shadow-md transition-all duration-200 h-full group-hover:scale-105">
                <div className="w-full h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md flex items-center justify-center mb-2 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-200">
                  <Gift className="w-6 h-6 text-primary group-hover:animate-bounce" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors duration-200">Mystery Boxes</span>
              </div>
            </Link>
            <Link href="/battles" className="group block h-full">
              <div className="bg-card border border-border rounded-lg p-2 text-center hover:border-primary/50 hover:shadow-md transition-all duration-200 h-full group-hover:scale-105">
                <div className="w-full h-20 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-md flex items-center justify-center mb-2 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all duration-200">
                  <Trophy className="w-6 h-6 text-secondary group-hover:animate-bounce" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-secondary transition-colors duration-200">Battles</span>
              </div>
            </Link>
            <Link href="/crash" className="group block h-full">
              <div className="bg-card border border-border rounded-lg p-2 text-center hover:border-primary/50 hover:shadow-md transition-all duration-200 h-full group-hover:scale-105">
                <div className="w-full h-20 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-md flex items-center justify-center mb-2 group-hover:from-chart-1/30 group-hover:to-chart-2/30 transition-all duration-200">
                  <Timer className="w-6 h-6 text-chart-1 group-hover:animate-pulse" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-chart-1 transition-colors duration-200">Crash</span>
              </div>
            </Link>
            <Link href="/plinko" className="group block h-full">
              <div className="bg-card border border-border rounded-lg p-2 text-center hover:border-primary/50 hover:shadow-md transition-all duration-200 h-full group-hover:scale-105">
                <div className="w-full h-20 bg-gradient-to-br from-chart-3/20 to-chart-4/20 rounded-md flex items-center justify-center mb-2 group-hover:from-chart-3/30 group-hover:to-chart-4/30 transition-all duration-200">
                  <Target className="w-6 h-6 text-chart-3 group-hover:animate-spin" />
                </div>
                <span className="text-xs font-bold text-foreground group-hover:text-chart-3 transition-colors duration-200">Plinko</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Boxes Section - EXACT RillaBox Layout */}
      <section className="mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Featured boxes</h2>
          <p className="text-base text-muted-foreground">Discover & win the hottest items in our provably fair boxes</p>
        </div>

        {/* Featured Boxes Grid - EXACT RillaBox Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {featuredBoxes.map((box) => (
            <Card key={box.id} className="group bg-card border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg overflow-hidden group-hover:scale-105 relative">
              {/* Lightning Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -skew-x-12 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              <div className="relative z-20">
                <div className="relative">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1 group-hover:animate-pulse">
                      {box.name}
                    </Badge>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-bold text-foreground mb-2 truncate">{box.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-primary">${box.salePrice}</div>
                    <div className="text-sm text-muted-foreground line-through">${box.originalPrice}</div>
                  </div>
                  <Button className="w-full glow-effect text-sm py-2 h-9 group-hover:animate-pulse">
                    <Gift className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                    Open Box
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Shop All Button - EXACT RillaBox Style */}
        <div className="text-center">
          <Button variant="outline" size="sm" className="px-6 py-2 text-sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Shop All
          </Button>
        </div>
      </section>

      {/* Stats Section - EXACT RillaBox Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center justify-center space-x-2 bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all duration-200 group">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-200">
            <Users className="w-4 h-4 text-primary group-hover:animate-bounce" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">993,881+</div>
            <div className="text-xs text-muted-foreground">Users</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2 bg-card border border-border rounded-lg p-3 hover:shadow-md transition-all duration-200 group">
          <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-200">
            <Gift className="w-4 h-4 text-secondary group-hover:animate-bounce" />
          </div>
          <div>
            <div className="text-lg font-bold text-foreground group-hover:text-secondary transition-colors duration-200">3,917,122+</div>
            <div className="text-xs text-muted-foreground">Mystery Boxes Opened</div>
          </div>
        </div>
      </section>

      {/* Weekly Race Section - EXACT RillaBox Layout */}
      <section className="mb-6">
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 overflow-hidden relative">
          {/* Background Box Images */}
          <div className="absolute inset-0 opacity-10">
            <img src="https://rillabox.com/images/box1.png" alt="Box1" className="absolute top-0 left-0 w-16 h-16 object-contain" />
            <img src="https://rillabox.com/images/box2.png" alt="Box2" className="absolute bottom-0 right-0 w-16 h-16 object-contain" />
          </div>
          
          <div className="p-4 md:p-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
              {/* Left Side - Race Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <img src="https://rillabox.s3.amazonaws.com/media/LeaderboardReward/trophy.png" alt="Trophy" className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground animate-pulse">$10,000</div>
                    <div className="text-sm font-semibold text-primary">Weekly Race</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  Participate in our Weekly Race simply by playing on O Sortudo!
                </p>

                {/* Countdown Timer - EXACT RillaBox Style */}
                <div className="mb-4">
                  <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
                    <img src="https://rillabox.com/images/timer.svg" alt="Timer" className="w-3 h-3" />
                    <span className="text-sm font-semibold text-foreground">Race ends</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{timeLeft.days.toString().padStart(2, '0')}D</div>
                    </div>
                    <div className="text-sm text-muted-foreground">:</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}H</div>
                    </div>
                    <div className="text-sm text-muted-foreground">:</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}M</div>
                    </div>
                    <div className="text-sm text-muted-foreground">:</div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}S</div>
                    </div>
                  </div>
                </div>

                <Button size="sm" className="glow-effect px-4 py-2 text-sm hover:animate-pulse">
                  <Trophy className="w-4 h-4 mr-1 animate-bounce" />
                  View Race
                </Button>
              </div>

              {/* Right Side - Box Images - EXACT RillaBox Style */}
              <div className="flex-shrink-0">
                <div className="flex space-x-2">
                  <img src="https://rillabox.com/images/box3.png" alt="Box3" className="w-16 h-16 object-contain animate-bounce" />
                  <img src="https://rillabox.com/images/box4.png" alt="Box4" className="w-16 h-16 object-contain animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* How It Works Section - EXACT RillaBox Layout */}
      <section className="mb-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">How it works</h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Check out how easy the unboxing process is at O Sortudo!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step) => (
            <Card key={step.id} className="bg-card border-border overflow-hidden group hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <div className="p-4 text-center">
                <div className="flex items-center justify-between mb-4">
                  <img src={step.icon} alt={step.title} className="w-6 h-6 group-hover:animate-bounce" />
                  <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1 group-hover:animate-pulse">
                    STEP {step.id}
                  </Badge>
                </div>

                <h3 className="text-sm font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Provably Fair Section - EXACT RillaBox Layout */}
      <section className="text-center mb-6">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-primary mr-3 animate-pulse" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Our industry-leading "Provably Fair" technology ensures that all mystery box draws are completely fair, guaranteeing a 100% fair experience.
          </h2>
        </div>
        <p className="text-base text-muted-foreground max-w-4xl mx-auto mb-6">
          We uphold complete transparency and have no means of manipulating the outcome in any manner.
        </p>
        <Button className="glow-effect px-6 py-2 text-sm hover:animate-pulse">
          Learn more
        </Button>
      </section>

      {/* Features Section - EXACT RillaBox Layout */}
      <section className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.id} className="bg-card border-border overflow-hidden group hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <div className="p-4 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
                </div>

                <h3 className="text-sm font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Methods Section - EXACT RillaBox Layout */}
      <section className="mb-6">
        <Card className="bg-card border-border overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Left Side - Payment Info */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <img src="https://rillabox.com/icons/payment-icon.svg" alt="Payment" className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Payment</h2>
                  <h3 className="text-sm font-semibold text-muted-foreground">Methods</h3>
                </div>
              </div>

              {/* Right Side - Payment Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-2 bg-muted/20 rounded-md hover:bg-muted/40 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-200 shadow-sm">
                      <img src={method.icon} alt={method.name} className="w-4 h-4 object-contain" />
                    </div>
                    <span className="text-xs font-medium text-foreground text-center">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}