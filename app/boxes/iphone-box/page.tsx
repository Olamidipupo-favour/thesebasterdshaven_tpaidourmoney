"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Star, Zap, Users, Clock, ArrowLeft, Smartphone, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Footer } from "@/components/layout/footer"
import dynamic from "next/dynamic"

const Box3D = dynamic(() => import("@/components/animations/box-3d").then(mod => ({ default: mod.Box3D })), {
  ssr: false,
  loading: () => <div className="w-[240px] h-[240px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
})

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

// Function to get rarity-specific glow class
const getRarityGlowClass = (rarity: string) => {
  switch (rarity.toLowerCase()) {
    case 'legendary':
      return 'glow-legendary'
    case 'epic':
      return 'glow-epic'
    case 'rare':
      return 'glow-rare'
    case 'common':
      return 'glow-common'
    default:
      return ''
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
  const [boxOpening, setBoxOpening] = useState(false) // Start closed
  const [boxDisappearing, setBoxDisappearing] = useState(false)
  const [isGameInProgress, setIsGameInProgress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("coins")
  const [quantity, setQuantity] = useState(1)
  const [isBoxHovered, setIsBoxHovered] = useState(false)
  const [isSoundMuted, setIsSoundMuted] = useState(false)
  const [showBoxOnWinner, setShowBoxOnWinner] = useState(false)
  const [isFastSpin, setIsFastSpin] = useState(false)
  const timeouts = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout)
    }
  }, [])

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
    if (isSoundMuted) return
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

  const handleFastSpin = () => {
    setIsFastSpin(!isFastSpin)
  }

  // Demo spin function with enhanced animation sequence
  const handleDemoSpin = async () => {
    if (isGameInProgress) return

    // If there's already a prize showing, smoothly transition to new spin
    if (wonPrize) {
      // Smoothly hide the current winning box and info
      setWonPrize(null)
      // Small delay to let the winning box fade out before starting new spin
      setTimeout(() => {
        setBoxOpening(false)
        setBoxDisappearing(false)
        setTimeout(() => setBoxOpening(true), 0)
      }, 200)
    } else {
      // Reset animations for retriggering from initial state
      setWonPrize(null)
      setBoxOpening(false)
      setBoxDisappearing(false)
    }

    setIsGameInProgress(true)
    setIsDemoSpinning(true)
    // Force audio context to resume
    if (audioCtxRef.current) {
      try {
        await audioCtxRef.current.resume()
        console.log('Audio context resumed')
      } catch (e) {
        console.error('Failed to resume audio context:', e)
      }
    }
    
    // Determine initial delay based on current state
    const initialDelay = wonPrize ? 200 : 0
    
    // Step 1: Box opening animation (items stay in place)
    timeouts.current.push(window.setTimeout(() => {
      setBoxOpening(true)
      
      // Step 2: Wait 1.8 seconds then prepare for spinning
      timeouts.current.push(window.setTimeout(() => {
        setBoxDisappearing(true)
        
        // Step 3: Now set up the spinning items and start animation
        timeouts.current.push(window.setTimeout(() => {
          // Create a large array of items for smooth scrolling
          const extendedItems: typeof iphoneItems = []
          for (let i = 0; i < 30; i++) {
            extendedItems.push(...iphoneItems)
          }
          setSpinningItems(extendedItems)
          setCurrentSpinIndex(Math.floor(extendedItems.length / 2))
          setIsSpinning(true)
          startEnhancedSpinning(extendedItems, true)
        }, 800))
      }, 1800)) // 1.8 second delay to see items behind open box
    }, initialDelay)) // Dynamic delay based on current state
  }

  // Enhanced spinning: smooth animation that lands perfectly on one item
  const startEnhancedSpinning = (items: typeof iphoneItems, isDemo: boolean) => {
    let currentIndex = Math.floor(items.length / 2)
    let steps = 0
    const speedMultiplier = isFastSpin ? 0.3 : 1 // Fast spin is 3x faster
    let speed = 50 * speedMultiplier // Start fast
    const totalSteps = isFastSpin ? 60 : 80 // Fewer steps for fast spin
    const finalItem = Math.floor(Math.random() * iphoneItems.length)
    const center = Math.floor(items.length / 2)
    
    // Place the winning item at the center position in the extended items array
    const modifiedItems = [...items]
    modifiedItems[center] = iphoneItems[finalItem]
    setSpinningItems(modifiedItems)
    
    // Ensure the target lands exactly at the center position
    const targetIndex = center

    const tick = () => {
      setCurrentSpinIndex(currentIndex)
      playClick()
      steps++

      // Calculate progress (0 to 1)
      const progress = steps / totalSteps

        // Ease out: slow down gradually at the end
        if (progress < 0.7) {
          // Fast phase - move quickly through items
          currentIndex += 1
          speed = 40 * speedMultiplier
        } else {
          // Slow down phase - decelerate smoothly toward center
          const remainingSteps = totalSteps - steps
          const distanceToTarget = Math.abs(targetIndex - currentIndex)
          
          if (distanceToTarget > 0) {
            currentIndex += currentIndex < targetIndex ? 1 : -1
            // Exponential slow down
            speed = (50 + (remainingSteps * 8)) * speedMultiplier
          } else {
            // Landed on target - stop and show result
            const selectedItem = iphoneItems[finalItem]
            timeouts.current.push(window.setTimeout(() => {
              setWonPrize(selectedItem)
              setIsSpinning(false)
              
              if (isDemo) {
                setIsDemoSpinning(false)
                // Reset after 3 seconds for demo
                timeouts.current.push(window.setTimeout(() => {
                  resetGame()
                }, 3000))
              }
            }, 500))
            return
          }
        }

      // Keep in bounds
      if (currentIndex < 0) currentIndex = 0
      if (currentIndex >= items.length) currentIndex = items.length - 1

      // Continue ticking
      if (steps < totalSteps) {
        timeouts.current.push(window.setTimeout(tick, speed))
      } else {
        // Force land on target if we haven't reached it
        currentIndex = targetIndex
        setCurrentSpinIndex(currentIndex)
        const selectedItem = iphoneItems[finalItem]
        timeouts.current.push(window.setTimeout(() => {
          setWonPrize(selectedItem)
          setIsSpinning(false)
          
          if (isDemo) {
            setIsDemoSpinning(false)
            timeouts.current.push(window.setTimeout(() => {
              resetGame()
            }, 3000))
          }
        }, 500))
      }
    }

    tick()
  }

  // Real spin function
  const handleRealSpin = async () => {
    if (isGameInProgress) return

    // Reset animations for retriggering
    setWonPrize(null)
    setBoxOpening(false)
    setBoxDisappearing(false)

    setIsGameInProgress(true)

    if (!isAuthenticated) {
      alert("Please sign in to open boxes")
      setIsGameInProgress(false)
      return
    }

    setIsSpinning(true)
    try { audioCtxRef.current?.resume?.() } catch {}
    
    // Step 1: Box opening animation (items stay in place)
    timeouts.current.push(window.setTimeout(() => {
      setBoxOpening(true)
      
      // Step 2: Wait 1.8 seconds then prepare for spinning
      timeouts.current.push(window.setTimeout(() => {
        setBoxDisappearing(true)
        
        // Step 3: Now set up the spinning items and start animation
        timeouts.current.push(window.setTimeout(() => {
          // Create a large array of items for smooth scrolling
          const extendedItems: typeof iphoneItems = []
          for (let i = 0; i < 30; i++) {
            extendedItems.push(...iphoneItems)
          }
          setSpinningItems(extendedItems)
          setCurrentSpinIndex(Math.floor(extendedItems.length / 2))
          startEnhancedSpinning(extendedItems, false)
        }, 800))
      }, 1800)) // 1.8 second delay to see items behind open box
    }, 0)) // Using timeout to force re-trigger
  }

  const resetGame = () => {
    setWonPrize(null)
    setSpinningItems([])
    setCurrentSpinIndex(0)
    setBoxOpening(false)
    setBoxDisappearing(false)
    setShowBoxOnWinner(false)
    setIsGameInProgress(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1729] via-[#1a1b3d] to-[#2d1b4e]">
      <style jsx>{`
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
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.3;
          }
          50% { 
            opacity: 0.6;
          }
        }
        @keyframes boxReappear {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .spinner-item-middle {
          position: relative;
          z-index: 10;
        }
        .glow {
          animation: glow 0.5s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { box-shadow: 0 0 30px currentColor, 0 0 50px currentColor; }
          to { box-shadow: 0 0 50px currentColor, 0 0 80px currentColor, 0 0 100px currentColor; }
        }
      `}</style>
        {/* Global Navigation is provided via RootLayout */}
      
      {/* Main Content - Exact Rillabox Layout */}
      <main className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header - Exact Rillabox Style */}
            <div className="mb-4 flex items-center justify-between">
          <Link href="/boxes" className="inline-flex items-center text-white/70 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Boxes
          </Link>
          
          {/* Sound toggle button */}
          <Button
            onClick={() => setIsSoundMuted(!isSoundMuted)}
            size="icon"
            className="bg-[#2d3548] hover:bg-[#353d52] text-white rounded-lg border-0 w-10 h-10"
          >
            {isSoundMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </Button>
        </div>

             {/* Unified Game Animation Container */}
             <div 
                className="relative mb-8 h-[450px] rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 41, 0.95) 0%, rgba(26, 27, 61, 0.95) 50%, rgba(45, 27, 78, 0.95) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Center arrows */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex justify-center z-10">
                  <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-white animate-pulse"></div>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center z-10">
                  <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-white animate-pulse"></div>
                </div>
                
                {/* Item Strip - Now handles both idle and spinning states */}
                <div 
                  className="absolute inset-0 flex items-center overflow-hidden"
                  style={{ 
                    filter: 'none', 
                    opacity: 1.0,
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
                  }}
                >
                  <div 
                    className={`flex items-center ${isSpinning ? 'transition-transform duration-100 ease-out' : ''}`}
                    style={{
                      transform: isSpinning 
                        ? `translateX(calc(50% - ${currentSpinIndex * 120}px - 60px))` // Perfect center alignment: 120px width / 2 = 60px
                        : 'translateX(calc(50% - 1200px))', // Adjusted for perfect centering
                      width: isSpinning ? `${spinningItems.length * 120}px` : 'auto'
                    }}
                  >
                    {(isSpinning ? spinningItems : Array.from({ length: 20 }).map((_, i) => iphoneItems[i % iphoneItems.length])).map((item, index) => {
                      const rarityColor = getRarityColor(item.rarity)
                      const isWinningItem = wonPrize && item.id === wonPrize.id && index === currentSpinIndex

                      return (
                        <div key={`item-${index}`} className="w-24 h-24 mx-3 rounded-xl flex items-center justify-center shrink-0 relative"
                          style={{ 
                            backgroundColor: isWinningItem ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(8px)',
                            border: `1px solid ${rarityColor}80`,
                            boxShadow: isWinningItem 
                              ? `0 0 40px ${rarityColor}, 0 0 60px ${rarityColor}cc, 0 0 80px ${rarityColor}80`
                              : `0 0 25px ${rarityColor}, 0 0 40px ${rarityColor}80, 0 0 60px ${rarityColor}40, 0 4px 12px rgba(0,0,0,0.5)`
                          }}
                        >
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain opacity-90" onError={(e)=>{e.currentTarget.src='/placeholder.svg'}} />
                          <div 
                            className="absolute inset-0 rounded-xl pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at center, ${rarityColor}40 0%, ${rarityColor}20 40%, transparent 70%)`
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 3D Box - Manages its own appearance */}
                {!wonPrize && !boxDisappearing && (
                  <div 
                    className="flex h-full justify-center items-center cursor-pointer relative z-20"
                    onMouseEnter={() => setIsBoxHovered(true)}
                    onMouseLeave={() => setIsBoxHovered(false)}
                  >
                    <Suspense fallback={<div className="w-[240px] h-[240px]"></div>}>
                      <Box3D 
                        isHovered={isBoxHovered}
                        boxOpening={boxOpening}
                        boxDisappearing={boxDisappearing}
                      />
                    </Suspense>
                  </div>
                )}
                
                {/* Box and winning item info container */}
                {wonPrize && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center"
                    style={{
                      animation: 'boxReappear 0.8s ease-out forwards'
                    }}
                  >
                    {/* 3D Box */}
                    <div className="mb-4">
                      <Suspense fallback={<div className="w-[240px] h-[240px]"></div>}>
                        <Box3D 
                          isHovered={false}
                          boxOpening={false}
                          boxDisappearing={false}
                        />
                      </Suspense>
                    </div>
                    
                    {/* Winning item info directly under the box */}
                    <div className="text-center">
                      <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                        <p className="text-white font-bold text-lg mb-1">You Won!</p>
                        <p className="text-green-400 font-semibold text-xl">${wonPrize.value}</p>
                        <p className="text-white/80 text-sm">{wonPrize.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            {/* Control Panel - Exact Layout Match */}
            <div className="flex flex-col items-center mb-8 space-y-4">
              {/* Security Badge */}
              <div className="flex items-center space-x-2 text-sm text-white/70">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>100% Authentic & Secured by Provable Fairness</span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleDemoSpin}
                  className="bg-[#2d3548] hover:bg-[#353d52] text-white px-6 py-3 text-sm font-medium rounded-lg border-0"
                  disabled={isGameInProgress}
                >
                  DEMO SPIN
                </Button>
                <Button
                  onClick={handleRealSpin}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-3 text-sm font-medium rounded-lg border-0 shadow-lg shadow-green-500/30"
                  disabled={!isAuthenticated || isGameInProgress}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Open for $2.79
                </Button>
                <Button
                  onClick={handleFastSpin}
                  className={`px-3 py-3 rounded-lg border-0 transition-all ${
                    isFastSpin 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                      : 'bg-[#2d3548] hover:bg-[#353d52] text-white'
                  }`}
                >
                  <Zap className={`w-4 h-4 ${isFastSpin ? 'animate-pulse' : ''}`} />
                </Button>
              </div>

              {/* Quantity Selection */}
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((num) => (
                  <Button
                    key={num}
                    onClick={() => setQuantity(num)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                      quantity === num 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-0' 
                        : 'bg-[#2d3548] hover:bg-[#353d52] text-white/80 border-0'
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            {/* Items in Box - Exact Rillabox Style */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-blue-400 mb-2">Drops in 1% iPhone (15)</h2>
              <p className="text-white/60 mb-8 text-base">Unbox to ship or exchange one of the products:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {iphoneItems.map((item) => (
                  <Card key={item.id} className="bg-[#2a3142] border-[#3d4558] overflow-hidden hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/60">
                    <div 
                      className="border-t-[6px] p-4"
                      style={{ 
                        borderTopColor: getRarityColor(item.rarity),
                        boxShadow: `0 0 15px ${getRarityColor(item.rarity)}40`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 25px ${getRarityColor(item.rarity)}80, 0 0 40px ${getRarityColor(item.rarity)}40`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 15px ${getRarityColor(item.rarity)}40`
                      }}
                    >
                      <div className="text-center">
                        <div className="w-full aspect-square mx-auto mb-3 rounded-lg flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-300 bg-[#1e2333]">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-4/5 h-4/5 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                        <h3 className="text-xs font-semibold text-white/90 mb-2 line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
                        <div className="text-base font-bold text-green-400 mb-2">${item.value}</div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs mb-2 font-semibold ${
                            item.rarity === 'legendary' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            item.rarity === 'epic' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                            item.rarity === 'rare' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            item.rarity === 'common' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}
                        >
                          {item.rarity.toUpperCase()}
                        </Badge>
                        <div className="text-xs text-white/50">{item.probability}%</div>
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
