"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Star, Zap, Users, Clock, ArrowLeft, Smartphone } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Footer } from "@/components/layout/footer"

// Function to get rarity color based on application theme
const getRarityColor = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return '#FFBE0B' // Gold
    case 'epic':
      return '#A800E0' // Purple
    case 'rare':
      return '#0078D7' // Blue
    case 'common':
      return '#52CA19' // Green
    default:
      return '#6F6868' // Gray
  }
}

// First 10 items from Rillabox HTML - exact data with images
const iphoneItems = [
  {
    id: "iphone-16-ultramarine",
    name: "iPhone 16 - Ultramarine, 128GB",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754077274535_1.png",
    value: 799.99,
    rarity: "legendary",
    probability: 0.1454,
    glowColor: "#FFBE0B"
  },
  {
    id: "iphone-16e-white",
    name: "iPhone 16e - White, 128GB",
    image: "https://cdn.rillabox.com/media/products/SnapBG.ai_1741048077175_1_1_ciOSbOm.png",
    value: 599.99,
    rarity: "epic",
    probability: 0.2865,
    glowColor: "#A800E0"
  },
  {
    id: "iphone-12-black",
    name: "iPhone 12 - Black, 64GB",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754077212074_1.png",
    value: 249.99,
    rarity: "epic",
    probability: 0.3912,
    glowColor: "#A800E0"
  },
  {
    id: "iphone-se-2nd-gen",
    name: "iPhone SE 2nd Generation - Black, 64GB",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754077150469_1.png",
    value: 144.99,
    rarity: "epic",
    probability: 0.4587,
    glowColor: "#A800E0"
  },
  {
    id: "dji-osmo-mobile-se",
    name: "DJI Osmo Mobile SE",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1751319110142_1_1.png",
    value: 74.99,
    rarity: "rare",
    probability: 0.6698,
    glowColor: "#0078D7"
  },
  {
    id: "belkin-power-bank",
    name: "Belkin BoostCharge Pro Magnetic Power Bank 5K - Deep Purple",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754077096001_1.png",
    value: 64.49,
    rarity: "rare",
    probability: 0.7432,
    glowColor: "#0078D7"
  },
  {
    id: "wireless-carplay",
    name: "Wireless Carplay Adapter",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754077038240_1.png",
    value: 50.49,
    rarity: "rare",
    probability: 0.8554,
    glowColor: "#0078D7"
  },
  {
    id: "mophie-car-charger",
    name: "mophie Dual USB-C 40W PD Car Charger",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754076993821_1.png",
    value: 38.99,
    rarity: "rare",
    probability: 0.9989,
    glowColor: "#0078D7"
  },
  {
    id: "apple-earpods",
    name: "Apple EarPods with Lightning Connector",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754076951179_1.png",
    value: 27.99,
    rarity: "rare",
    probability: 1.3409,
    glowColor: "#0078D7"
  },
  {
    id: "anker-lightning-cable",
    name: "Anker iPhone Lightning Charger Cable",
    image: "https://cdn.rillabox.com/media/products/Remove-bg.ai_1754076886943_1.png",
    value: 18.99,
    rarity: "common",
    probability: 2.0013,
    glowColor: "#52CA19"
  }
]

// Similar boxes from Rillabox
const similarBoxes = [
  {
    id: "1-percent-pc",
    name: "1% PC",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/07_1__PC-Box-mock_box_1_5rK5rgB.png",
    originalPrice: 4.13,
    currentPrice: 2.89,
    borderColor: "#9D1FC3"
  },
  {
    id: "apple-budget",
    name: "Apple Budget",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/APPLE-Budget-mock_box_1_1_BNZNwNg.png",
    originalPrice: 8.09,
    currentPrice: 5.99,
    borderColor: "#D6D6D6"
  },
  {
    id: "apple-deluxe",
    name: "Apple Deluxe",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/Apple-deluxe_l6wR88P.png",
    originalPrice: 118.89,
    currentPrice: 109.99,
    borderColor: "#8A8A95"
  },
  {
    id: "apple-premium",
    name: "Apple Premium",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/APPLE-Premium-mock_box_Jt7iRRs.png",
    originalPrice: 41.49,
    currentPrice: 32.99,
    borderColor: "#D5D5D5"
  },
  {
    id: "apple-vs-android",
    name: "Apple Vs Android",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/03_APPLE_VS_ANDROID-Box-mock_box_UmzM9F2.png",
    originalPrice: 53.49,
    currentPrice: 44.99,
    borderColor: "#BC39D2"
  },
  {
    id: "apple-vs-samsung",
    name: "Apple Vs Samsung",
    image: "https://rillabox.s3.amazonaws.com/media/boxes/25_APPLE_VS_SAMSUNG-Box-mock_box_NSFrh0X.png",
    originalPrice: 38.49,
    currentPrice: 34.99,
    borderColor: "#A22DE5"
  }
]

export default function IPhoneBoxPage() {
  const { user, isAuthenticated } = useAuth()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isDemoSpinning, setIsDemoSpinning] = useState(false)
  const [wonPrize, setWonPrize] = useState<any>(null)
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const [currentSpinIndex, setCurrentSpinIndex] = useState(0)
  const [boxOpening, setBoxOpening] = useState(false)
  const [boxDisappearing, setBoxDisappearing] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [idleOffset, setIdleOffset] = useState(0)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("coins")
  const [quantity, setQuantity] = useState(1)

  // Lightweight click sound using Web Audio API
  const audioCtxRef = useRef<AudioContext | null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioCtxRef.current) {
      const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext
      if (Ctx) audioCtxRef.current = new Ctx()
    }
    return () => {
      try { audioCtxRef.current?.close() } catch {}
    }
  }, [])

  const playClick = () => {
    const ctx = audioCtxRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 900
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.07)
  }

  // Demo spin function with enhanced animation sequence
  const handleDemoSpin = () => {
    setIsDemoSpinning(true)
    try { audioCtxRef.current?.resume?.() } catch {}
    setWonPrize(null)
    setShowSpinner(false)
    
    // Create a large array of items for smooth scrolling
    const extendedItems: typeof iphoneItems = []
    for (let i = 0; i < 30; i++) {
      extendedItems.push(...iphoneItems)
    }
    setSpinningItems(extendedItems)
    setCurrentSpinIndex(Math.floor(extendedItems.length / 2))

    // Step 1: Box opening animation
    setTimeout(() => {
      setBoxOpening(true)
      
      // Step 2: Box disappearing after opening
      setTimeout(() => {
        setBoxDisappearing(true)
        
        // Step 3: Show spinner and start animation after box disappears
        setTimeout(() => {
          setShowSpinner(true)
          startEnhancedSpinning(extendedItems, true)
        }, 800)
      }, 1200)
    }, 500)
  }

  // Idle background scroll for items behind the box
  useEffect(() => {
    if (!showSpinner && !wonPrize) {
      const interval = setInterval(() => {
        setIdleOffset((prev) => {
          const delta = Math.random() > 0.5 ? 1 : -1
          const next = prev + delta
          // keep within [-40, 40]
          if (next > 40) return 40
          if (next < -40) return -40
          return next
        })
      }, 120)
      return () => clearInterval(interval)
    }
  }, [showSpinner, wonPrize])

  // Enhanced spinning: step-by-step scroll with left/right oscillation and click sound
  const startEnhancedSpinning = (items: typeof iphoneItems, isDemo: boolean) => {
    let currentIndex = Math.floor(items.length / 2)
    let direction = Math.random() > 0.5 ? 1 : -1 // 1: right, -1: left
    let steps = 0
    let speed = 85 // fast but readable
    const maxRandomSteps = 100 // oscillate before final approach
    const finalItem = Math.floor(Math.random() * iphoneItems.length)
    const center = Math.floor(items.length / 2)
    const targetIndex = center + (finalItem % iphoneItems.length) - Math.floor(iphoneItems.length / 2)

    const tick = () => {
      setCurrentSpinIndex(currentIndex)
      playClick()
      steps++

      // Final approach after enough steps
      if (steps >= maxRandomSteps) {
        if (currentIndex !== targetIndex) {
          direction = currentIndex < targetIndex ? 1 : -1
          currentIndex += direction
          speed = Math.min(140, speed + 6)
          setTimeout(tick, speed)
        } else {
          const selectedItem = iphoneItems[finalItem]
          setTimeout(() => {
            setWonPrize(selectedItem)
            if (isDemo) {
              setIsDemoSpinning(false)
            } else {
              setIsSpinning(false)
            }
          }, 500)
        }
        return
      }

      // Random oscillation phase — step one-by-one
      currentIndex += direction
      if (steps % 12 === 0 && Math.random() > 0.4) {
        direction *= -1
      }
      if (currentIndex < 0) currentIndex = 0
      if (currentIndex >= items.length) currentIndex = items.length - 1
      setTimeout(tick, speed)
    }

    tick()
  }

  // Real spin function
  const handleRealSpin = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to open boxes")
      return
    }

    setIsSpinning(true)
    try { audioCtxRef.current?.resume?.() } catch {}
    setWonPrize(null)
    setShowSpinner(false)
    
    // Create a large array of items for smooth scrolling
    const extendedItems: typeof iphoneItems = []
    for (let i = 0; i < 30; i++) {
      extendedItems.push(...iphoneItems)
    }
    setSpinningItems(extendedItems)
    setCurrentSpinIndex(Math.floor(extendedItems.length / 2))

    // Step 1: Box opening animation
    setTimeout(() => {
      setBoxOpening(true)
      
      // Step 2: Box disappearing after opening
      setTimeout(() => {
        setBoxDisappearing(true)
        
        // Step 3: Show spinner and start animation after box disappears
        setTimeout(() => {
          setShowSpinner(true)
          startEnhancedSpinning(extendedItems, false)
        }, 800)
      }, 1200)
    }, 500)
  }

  const resetGame = () => {
    setWonPrize(null)
    setSpinningItems([])
    setCurrentSpinIndex(0)
    setBoxOpening(false)
    setBoxDisappearing(false)
    setShowSpinner(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <style jsx>{`
        @keyframes boxOpen {
          0% { 
            transform: rotateX(0deg) rotateY(0deg) scale(1); 
            opacity: 1;
          }
          50% { 
            transform: rotateX(-12deg) rotateY(8deg) scale(1.06); 
            opacity: 1;
          }
          100% { 
            transform: rotateX(0deg) rotateY(0deg) scale(1); 
            opacity: 1;
          }
        }
        @keyframes boxDisappear {
          0% { 
            transform: scale(1) rotateY(0deg); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.2) rotateY(180deg); 
            opacity: 0.5; 
          }
          100% { 
            transform: scale(0) rotateY(360deg); 
            opacity: 0; 
          }
        }
        @keyframes dance3D {
          0% { transform: rotateX(0deg) rotateY(0deg) translateY(0); }
          25% { transform: rotateX(6deg) rotateY(-6deg) translateY(-2px); }
          50% { transform: rotateX(0deg) rotateY(0deg) translateY(0); }
          75% { transform: rotateX(-6deg) rotateY(6deg) translateY(-2px); }
          100% { transform: rotateX(0deg) rotateY(0deg) translateY(0); }
        }
        @keyframes spinnerFadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes idleScroll {
          0% { transform: translateX(0); }
          50% { transform: translateX(-40px); }
          100% { transform: translateX(0); }
        }
        .spinner-item-middle {
          position: relative;
          z-index: 10;
        }
        .glow {
          animation: glow 0.5s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { box-shadow: 0 0 20px currentColor; }
          to { box-shadow: 0 0 30px currentColor, 0 0 40px currentColor; }
        }
        .cube {
          width: 180px; height: 180px; position: relative; transform-style: preserve-3d;
        }
        .cube-face {
          position: absolute; width: 180px; height: 180px; backface-visibility: hidden;
          background-size: cover; background-position: center; border-radius: 12px;
          box-shadow: 0 12px 32px rgba(0,0,0,0.35);
        }
        .lid {
          position: absolute; width: 180px; height: 180px; transform-style: preserve-3d;
        }
      `}</style>
        {/* Global Navigation is provided via RootLayout */}
      
      {/* Main Content - Exact Rillabox Layout */}
      <main className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header - Exact Rillabox Style */}
            <div className="mb-8">
          <Link href="/boxes" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
                ← Return to Boxes
          </Link>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-primary" />
                  </div>
            <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">1% iPhone</h1>
                    <p className="text-muted-foreground">Open to reveal your prize!</p>
                  </div>
            </div>
            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg text-foreground">{user.balance?.toLocaleString() || 0}</span>
                <span className="text-sm text-muted-foreground">Coins</span>
              </div>
            )}
          </div>
        </div>

             {/* 3D Box Animation - Enhanced with 3D cube and idle items behind */}
             {!showSpinner && !wonPrize && (
              <div className="relative mb-12 h-[360px] pointer-events-none">
                {/* Center arrows like Rillabox */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 flex justify-center">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white/70"></div>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white/70"></div>
                </div>
                <div className="flex h-full justify-center items-center">
                  <div 
                    className="relative w-[180px] h-[180px]"
                    style={{
                      perspective: '1000px',
                      transformStyle: 'preserve-3d',
                      opacity: boxDisappearing ? 0 : 1,
                      transition: 'opacity 0.8s ease-out'
                    }}
                  >
                    {/* Idle items row behind the box */}
                    <div 
                      className="absolute inset-0 -z-20 flex items-center justify-center"
                      style={{ 
                        filter: 'blur(4px)', 
                        opacity: 0.42,
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 16%, black 84%, transparent)',
                        maskImage: 'linear-gradient(to right, transparent, black 16%, black 84%, transparent)'
                      }}
                    >
                      <div
                        className="flex items-center"
                        style={{
                          transform: `translateZ(-140px) translateX(calc(50% - ${idleOffset * 6}px))`,
                        }}
                      >
                        {Array.from({ length: 18 }).map((_, i) => {
                          const item = iphoneItems[i % iphoneItems.length]
                          return (
                            <div key={`idle-${i}`} className="w-20 h-20 mx-2 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: getRarityColor(item.rarity) + '20' }}
                            >
                              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" onError={(e)=>{e.currentTarget.src='/placeholder.svg'}} />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    {/* 3D Box Container */}
                    <div 
                      className="relative w-full h-full"
                      style={{
                        transformStyle: 'preserve-3d',
                        animation: boxDisappearing
                          ? 'boxDisappear 0.8s ease-in-out forwards'
                          : boxOpening
                          ? 'boxOpen 1.2s ease-in-out'
                          : 'dance3D 2.8s ease-in-out infinite'
                      }}
                    >
                      {/* Cube body */}
                      <div className="cube">
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/FRONT-200x200_WGO7E2Z.png')",
                          transform: 'translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/FRONT-200x200_WGO7E2Z.png')",
                          transform: 'rotateY(180deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/FRONT-200x200_WGO7E2Z.png')",
                          transform: 'rotateY(90deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/FRONT-200x200_WGO7E2Z.png')",
                          transform: 'rotateY(-90deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/FRONT-200x200_WGO7E2Z.png')",
                          transform: 'rotateX(90deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/FRONT-200x200_WGO7E2Z.png')",
                          transform: 'rotateX(-90deg) translateZ(100px)'
                        }} />
                      </div>
                      {/* Lid */}
                      <div className="lid" style={{ transform: 'translateZ(5px)' }}>
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/LID-200x55_evkfckW.png')",
                          transform: 'translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/LID-200x55_evkfckW.png')",
                          transform: 'rotateY(90deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/LID-200x55_evkfckW.png')",
                          transform: 'rotateY(-90deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/LID-200x55_evkfckW.png')",
                          transform: 'rotateY(180deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/LID-200x55_evkfckW.png')",
                          transform: 'rotateX(90deg) translateZ(100px)'
                        }} />
                        <div className="cube-face" style={{
                          backgroundImage: "url('https://cdn.rillabox.com/media/boxes/LID-200x55_evkfckW.png')",
                          transform: 'rotateX(-90deg) translateZ(100px)'
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Spinner Section - Only show when spinning */}
            {showSpinner && (
              <div 
                className="relative mb-8"
                style={{
                  animation: 'spinnerFadeIn 0.8s ease-out'
                }}
              >
                {/* Arrow pointing down to center */}
                <div className="flex justify-center mb-4">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-primary animate-pulse"></div>
                </div>
                
                {/* Horizontal Spinner Container */}
                <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg border-2 border-primary/20">
                  {/* Center Line Indicator */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary z-10 shadow-lg"></div>
                  
                  {/* Spinner Items */}
                  <div className="relative h-full">
                    <div 
                      className="flex items-center h-full transition-transform duration-100 ease-out"
                      style={{
                        transform: `translateX(calc(50% - ${currentSpinIndex * 120}px))`,
                        width: `${spinningItems.length * 120}px`
                      }}
                    >
                      {spinningItems.map((item, index) => {
                        const distanceFromCenter = Math.abs(index - currentSpinIndex)
                        const isCenter = index === currentSpinIndex
                        const isNearCenter = distanceFromCenter <= 2
                        
                        return (
                          <div 
                            key={`${item.id}-${index}`}
                            className={`flex-shrink-0 w-28 h-28 mx-2 rounded-xl flex items-center justify-center transition-all duration-200 ${
                              isCenter ? 'spinner-item-middle glow highlight' : ''
                            }`}
                            style={{
                              backgroundColor: getRarityColor(item.rarity) + (isCenter ? '50' : '20'),
                              boxShadow: isCenter ? `0 0 40px ${getRarityColor(item.rarity)}80, 0 0 20px ${getRarityColor(item.rarity)}60` : 
                                        isNearCenter ? `0 0 15px ${getRarityColor(item.rarity)}40` : 'none',
                              transform: isCenter ? 'scale(1.3)' : isNearCenter ? 'scale(1.1)' : 'scale(0.8)',
                              opacity: isCenter ? 1 : isNearCenter ? 0.8 : 0.4,
                              zIndex: isCenter ? 20 : isNearCenter ? 10 : 1
                            } as React.CSSProperties}
                          >
                            <div className="img-wrapper relative">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className={`object-contain transition-all duration-200 ${
                                  isCenter ? 'w-24 h-24' : isNearCenter ? 'w-20 h-20' : 'w-16 h-16'
                                }`}
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg"
                                }}
                              />
                              {isCenter && (
                                <div className="absolute inset-0 rounded-xl border-2 border-primary animate-pulse"></div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Control Panel - Exact Rillabox Style */}
            <div className="flex justify-center mb-8">
              <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full">
                    {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-6">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>100% Authentic & Secured by Provable Fairness</span>
                    </div>

                    {/* Payment Options */}
                <div className="flex justify-center space-x-3 mb-6">
                        <Button
                          variant={paymentMethod === "usd" ? "default" : "outline"}
                          size="lg"
                          onClick={() => setPaymentMethod("usd")}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                        >
                          $2.79 USD
                        </Button>
                        <Button
                          variant={paymentMethod === "coins" ? "default" : "outline"}
                          size="lg"
                          onClick={() => setPaymentMethod("coins")}
                          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                          disabled={!isAuthenticated}
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          70 Coins
                        </Button>
                      </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    onClick={handleDemoSpin}
                    size="lg"
                    className="bg-muted hover:bg-muted/90 text-muted-foreground px-6 py-3 font-bold"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Demo Spin
                  </Button>
                  <Button
                    onClick={handleRealSpin}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 font-bold"
                    disabled={!isAuthenticated}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Open for $2.79
                        </Button>
                      </div>

                      {/* Quantity Selection */}
                      <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4].map((num) => (
                          <Button
                            key={num}
                            variant={quantity === num ? "default" : "outline"}
                            size="sm"
                            onClick={() => setQuantity(num)}
                            className="w-12 h-12"
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
            {/* Items in Box - Exact Rillabox Style */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Drops in 1% iPhone (10)</h2>
              <p className="text-muted-foreground mb-6">Unbox to ship or exchange one of the products:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {iphoneItems.map((item) => (
                  <Card key={item.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-200">
                    <div 
                      className="border-t-2 border-b-2 p-4"
                      style={{ 
                        borderTopColor: getRarityColor(item.rarity), 
                        borderBottomColor: getRarityColor(item.rarity) 
                      }}
                    >
                      <div className="text-center">
                        <div className="w-28 h-28 mx-auto mb-3 rounded-xl flex items-center justify-center overflow-hidden hover:scale-110 transition-transform duration-300 group">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-2">{item.name}</h3>
                        <div className="text-lg font-bold text-primary mb-2">${item.value}</div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs mb-2 ${
                            item.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                            item.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                            item.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                            item.rarity === 'common' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {item.rarity}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{item.probability}%</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

        </div>
      </main>
    </div>
  )
}
