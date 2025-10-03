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

// Live Drops Data - EXACT RillaBox Live Drops
const liveDrops = [
  {
    id: 1,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_3e5fb7cd-3778-4576-b156-97ab292a2bf1-image_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/JORDAN_EXCLUSIVE-mock_box.png",
    title: "Jordan 6 Retro - Black Infrared (2019)",
    price: 449.00,
    color: "from-blue-600 to-black"
  },
  {
    id: 2,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_730bec1d-a26c-45ad-9154-0b97be3e0f30-bape-college-tee-ss22-navy_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/BAPE-budget-mock_box.png",
    title: "BAPE College Tee (SS22) - Navy",
    price: 134.00,
    color: "from-blue-600 to-black"
  },
  {
    id: 3,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_917e6adf-ab89-49c1-9ec1-f4980e89a3c9-image_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/08-GOPRO-Box-mock_box.png",
    title: "GoPro Dual Battery Charger & Enduro Batteries",
    price: 69.49,
    color: "from-green-500 to-black"
  },
  {
    id: 4,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_1712f721-d42e-47f6-b9e4-76ddea516b21_geg_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/DIOR-budget-mock_box.png",
    title: "Book: Dior By Dior",
    price: 18.99,
    color: "from-green-500 to-black"
  },
  {
    id: 5,
    productImage: "https://cdn.rillabox.com/media/products/removal.ai_7602004c-e92c-415c-b0b2-0514fe07625b-image_1.png",
    boxImage: "https://cdn.rillabox.com/media/boxes/SUPREME-X_TNF-mock_box.png",
    title: "Supreme The North Face Arc Logo Organizer - Black",
    price: 58.89,
    color: "from-gray-500 to-black"
  }
]

// Featured Boxes - EXACT RillaBox Data
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
    <div className="space-y-16">
      {/* Hero Banner with Swiper - EXACT RillaBox Style */}
      <section className="relative">
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
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

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentBanner((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev + 1) % heroBanners.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentBanner ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Game Modes Section - EXACT RillaBox Style */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <Link href="/" className="group">
          <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-all duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-3">
              <Gift className="w-12 h-12 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground">Mystery Boxes</span>
          </div>
        </Link>
        <Link href="/battles" className="group">
          <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-all duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center mb-3">
              <Trophy className="w-12 h-12 text-secondary" />
            </div>
            <span className="text-lg font-bold text-foreground">Battles</span>
          </div>
        </Link>
        <Link href="/crash" className="group">
          <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-all duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-chart-1/20 to-chart-2/20 rounded-lg flex items-center justify-center mb-3">
              <Timer className="w-12 h-12 text-chart-1" />
            </div>
            <span className="text-lg font-bold text-foreground">Crash</span>
          </div>
        </Link>
        <Link href="/plinko" className="group">
          <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-all duration-300">
            <div className="w-full h-32 bg-gradient-to-br from-chart-3/20 to-chart-4/20 rounded-lg flex items-center justify-center mb-3">
              <Target className="w-12 h-12 text-chart-3" />
            </div>
            <span className="text-lg font-bold text-foreground">Plinko</span>
          </div>
        </Link>
      </section>

      {/* Featured Boxes Section - EXACT RillaBox Layout */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured boxes</h2>
          <p className="text-lg text-muted-foreground">Discover & win the hottest items in our provably fair boxes</p>
        </div>

        {/* Featured Boxes Grid - EXACT RillaBox Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {featuredBoxes.map((box) => (
            <Card key={box.id} className="group bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
              <div className="relative">
                <img
                  src={box.image}
                  alt={box.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {box.name}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-3">{box.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">${box.salePrice}</div>
                  <div className="text-lg text-muted-foreground line-through">${box.originalPrice}</div>
                </div>
                <Button className="w-full glow-effect">
                  <Gift className="w-4 h-4 mr-2" />
                  Open Box
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Shop All Button - EXACT RillaBox Style */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop All
          </Button>
        </div>
      </section>

      {/* Stats Section - EXACT RillaBox Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center space-x-4 bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">993,881+</div>
            <div className="text-sm text-muted-foreground">Users</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-4 bg-card border border-border rounded-lg p-6">
          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
            <Gift className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">3,917,122+</div>
            <div className="text-sm text-muted-foreground">Mystery Boxes Opened</div>
          </div>
        </div>
      </section>

      {/* Weekly Race Section - EXACT RillaBox Layout */}
      <section>
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 overflow-hidden relative">
          {/* Background Box Images */}
          <div className="absolute inset-0 opacity-10">
            <img src="https://rillabox.com/images/box1.png" alt="Box1" className="absolute top-0 left-0 w-32 h-32 object-contain" />
            <img src="https://rillabox.com/images/box2.png" alt="Box2" className="absolute bottom-0 right-0 w-32 h-32 object-contain" />
          </div>
          
          <div className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Left Side - Race Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <img src="https://rillabox.s3.amazonaws.com/media/LeaderboardReward/trophy.png" alt="Trophy" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-foreground">$10,000</div>
                    <div className="text-lg font-semibold text-primary">Weekly Race</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  Participate in our Weekly Race simply by playing on O Sortudo!
                </p>

                {/* Countdown Timer - EXACT RillaBox Style */}
                <div className="mb-8">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                    <img src="https://rillabox.com/images/timer.svg" alt="Timer" className="w-5 h-5" />
                    <span className="text-lg font-semibold text-foreground">Race ends</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{timeLeft.days.toString().padStart(2, '0')}D</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">:</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{timeLeft.hours.toString().padStart(2, '0')}H</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">:</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{timeLeft.minutes.toString().padStart(2, '0')}M</div>
                    </div>
                    <div className="text-2xl text-muted-foreground">:</div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{timeLeft.seconds.toString().padStart(2, '0')}S</div>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="glow-effect px-8 py-4 text-lg">
                  <Trophy className="w-6 h-6 mr-2" />
                  View Race
                </Button>
              </div>

              {/* Right Side - Box Images - EXACT RillaBox Style */}
              <div className="flex-shrink-0">
                <div className="flex space-x-4">
                  <img src="https://rillabox.com/images/box3.png" alt="Box3" className="w-32 h-32 object-contain" />
                  <img src="https://rillabox.com/images/box4.png" alt="Box4" className="w-32 h-32 object-contain" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* How It Works Section - EXACT RillaBox Layout */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Check out how easy the unboxing process is at O Sortudo!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step) => (
            <Card key={step.id} className="bg-card border-border overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="p-6 text-center">
                <div className="flex items-center justify-between mb-6">
                  <img src={step.icon} alt={step.title} className="w-8 h-8" />
                  <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
                    STEP {step.id}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Provably Fair Section - EXACT RillaBox Layout */}
      <section className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Shield className="w-8 h-8 text-primary mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our industry-leading "Provably Fair" technology ensures that all mystery box draws are completely fair, guaranteeing a 100% fair experience.
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
          We uphold complete transparency and have no means of manipulating the outcome in any manner.
        </p>
        <Button className="glow-effect px-8 py-4 text-lg">
          Learn more
        </Button>
      </section>

      {/* Features Section - EXACT RillaBox Layout */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.id} className="bg-card border-border overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <img src={feature.icon} alt={feature.title} className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Payment Methods Section - EXACT RillaBox Layout */}
      <section>
        <Card className="bg-card border-border overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              {/* Left Side - Payment Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <img src="https://rillabox.com/icons/payment-icon.svg" alt="Payment" className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Payment</h2>
                  <h3 className="text-lg font-semibold text-muted-foreground">Methods</h3>
                </div>
              </div>

              {/* Right Side - Payment Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors duration-300 group"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <img src={method.icon} alt={method.name} className="w-6 h-6 object-contain" />
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