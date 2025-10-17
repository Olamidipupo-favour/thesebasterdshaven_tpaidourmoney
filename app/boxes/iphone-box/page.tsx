"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Star, Zap, Users, Clock, ArrowLeft, Smartphone, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { OSortudoLayout } from "@/components/layout/rillabox-layout"
import dynamic from "next/dynamic"

const Box3D = dynamic(() => import("@/components/animations/box-3d").then(mod => ({ default: mod.Box3D })), {
  ssr: false,
  loading: () => <div className="w-[240px] h-[240px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
})

import iphoneItemsJson from "@/data/boxes/iphone-1pct.json"

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

// Fisher-Yates shuffle algorithm for randomizing item order per column
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// First 10 items from Rillabox HTML - now sourced from JSON
type RawItem = {
  id: string
  name: string
  image: string
  value: number
  probability: number
  category?: string
}

type BoxItem = RawItem & { rarity: string }

const categorizeByPrice = (value: number): string => {
  if (value >= 700) return 'legendary'
  if (value >= 200) return 'epic'
  if (value >= 50) return 'rare'
  if (value >= 20) return 'common'
  return 'basic' // grey
}

const iphoneItems: BoxItem[] = (iphoneItemsJson as RawItem[]).map((item) => ({
  ...item,
  rarity: item.category ? item.category : categorizeByPrice(item.value),
}))

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
  // Item step constants for vertical columns
  const ITEM_BOX_PX = 144 // h-36
  const ITEM_MARGIN_Y_TOTAL_PX = 64 // my-8 top+bottom
  const ITEM_STEP_PX = ITEM_BOX_PX + ITEM_MARGIN_Y_TOTAL_PX // 208
  const HALF_ITEM_STEP_PX = ITEM_STEP_PX / 2 // 104

  const { user, isAuthenticated } = useAuth()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isDemoSpinning, setIsDemoSpinning] = useState(false)
  const [wonPrizes, setWonPrizes] = useState<any[]>([])
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const [columnSpinIndices, setColumnSpinIndices] = useState<number[]>([])
  const [columnItems, setColumnItems] = useState<any[][]>([])
  const [columnOrder, setColumnOrder] = useState<number[]>([])
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

  // Demo spin function with enhanced animation sequence - Multi-column version
  const handleDemoSpin = async () => {
    if (isGameInProgress) return

    // If there's already prizes showing, smoothly transition to new spin
    if (wonPrizes.length > 0) {
      // Smoothly hide the current winning box and info
      setWonPrizes([])
      // Small delay to let the winning box fade out before starting new spin
      setTimeout(() => {
        setBoxOpening(false)
        setBoxDisappearing(false)
        setTimeout(() => setBoxOpening(true), 0)
      }, 200)
    } else {
      // Reset animations for retriggering from initial state
      setWonPrizes([])
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
    const initialDelay = wonPrizes.length > 0 ? 200 : 0
    
    // Step 1: Box opening animation (items stay in place)
    timeouts.current.push(window.setTimeout(() => {
      setBoxOpening(true)
      
      // Step 2: Wait 1.8 seconds then prepare for spinning
      timeouts.current.push(window.setTimeout(() => {
        setBoxDisappearing(true)
        
        // Step 3: Now set up the spinning items and start animation
        timeouts.current.push(window.setTimeout(() => {
          // Create column data - one shuffled array per column
          const columnsData: any[][] = []
          const centerIndices: number[] = []
          
          for (let col = 0; col < quantity; col++) {
          const extendedItems: typeof iphoneItems = []
            const shuffledItems = shuffleArray(iphoneItems)
          for (let i = 0; i < 30; i++) {
              extendedItems.push(...shuffledItems)
            }
            columnsData.push(extendedItems)
            centerIndices.push(Math.floor(extendedItems.length / 2))
          }
          
          // Create shuffled column order for display
          const randomOrder = Array.from({ length: quantity }, (_, i) => i)
          setColumnOrder(shuffleArray(randomOrder))
          
          setColumnItems(columnsData)
          setColumnSpinIndices(centerIndices)
          setIsSpinning(true)
          startMultiColumnSpinning(columnsData, true)
        }, 800))
      }, 1800)) // 1.8 second delay to see items behind open box
    }, initialDelay)) // Dynamic delay based on current state
  }

  // Multi-column spinning: orchestrates multiple vertical columns spinning simultaneously
  const startMultiColumnSpinning = (columnsData: any[][], isDemo: boolean) => {
    const numColumns = columnsData.length
    const currentIndices = columnsData.map(col => Math.floor(col.length / 2))
    let steps = 0
    const speedMultiplier = isFastSpin ? 0.3 : 1
    let speed = 50 * speedMultiplier
    const totalSteps = isFastSpin ? 60 : 80
    
    // Select different winning items for each column
    const usedItems = new Set<string>()
    const finalItems: number[] = []
    for (let col = 0; col < numColumns; col++) {
      let randomIndex: number
      let attempts = 0
      do {
        randomIndex = Math.floor(Math.random() * iphoneItems.length)
        attempts++
      } while (usedItems.has(iphoneItems[randomIndex].id) && attempts < 50)
      
      finalItems.push(randomIndex)
      usedItems.add(iphoneItems[randomIndex].id)
    }
    
    // Place winning items at center positions
    const modifiedColumnsData = columnsData.map((columnArray, colIndex) => {
      const modified = [...columnArray]
      const center = Math.floor(columnArray.length / 2)
      modified[center] = iphoneItems[finalItems[colIndex]]
      return modified
    })
    setColumnItems(modifiedColumnsData)
    
    // Target indices for each column
    const targetIndices = modifiedColumnsData.map(col => Math.floor(col.length / 2))

    const tick = () => {
      setColumnSpinIndices([...currentIndices])
      playClick()
      steps++

      const progress = steps / totalSteps

      // Update all columns simultaneously
        if (progress < 0.7) {
        // Fast phase
        for (let col = 0; col < numColumns; col++) {
          currentIndices[col] += 1
        }
          speed = 40 * speedMultiplier
        } else {
        // Slow down phase
          const remainingSteps = totalSteps - steps
        let allLanded = true
        
        for (let col = 0; col < numColumns; col++) {
          const distanceToTarget = Math.abs(targetIndices[col] - currentIndices[col])
          
          if (distanceToTarget > 0) {
            allLanded = false
            currentIndices[col] += currentIndices[col] < targetIndices[col] ? 1 : -1
          }
        }
        
            speed = (50 + (remainingSteps * 8)) * speedMultiplier
        
        if (allLanded) {
          // All columns landed - collect prizes
          const winningItems = finalItems.map(idx => iphoneItems[idx])
            timeouts.current.push(window.setTimeout(() => {
            setWonPrizes(winningItems)
              setIsSpinning(false)
              
              if (isDemo) {
                setIsDemoSpinning(false)
                timeouts.current.push(window.setTimeout(() => {
                  resetGame()
                }, 3000))
              }
            }, 500))
            return
          }
        }

      // Keep in bounds for all columns
      for (let col = 0; col < numColumns; col++) {
        if (currentIndices[col] < 0) currentIndices[col] = 0
        if (currentIndices[col] >= columnsData[col].length) {
          currentIndices[col] = columnsData[col].length - 1
        }
      }

      // Continue ticking
      if (steps < totalSteps) {
        timeouts.current.push(window.setTimeout(tick, speed))
      } else {
        // Force land on targets
        for (let col = 0; col < numColumns; col++) {
          currentIndices[col] = targetIndices[col]
        }
        setColumnSpinIndices([...currentIndices])
        const winningItems = finalItems.map(idx => iphoneItems[idx])
        timeouts.current.push(window.setTimeout(() => {
          setWonPrizes(winningItems)
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

  // Real spin function - Multi-column version
  const handleRealSpin = async () => {
    if (isGameInProgress) return

    // Reset animations for retriggering
    setWonPrizes([])
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
          // Create column data - one shuffled array per column
          const columnsData: any[][] = []
          const centerIndices: number[] = []
          
          for (let col = 0; col < quantity; col++) {
          const extendedItems: typeof iphoneItems = []
            const shuffledItems = shuffleArray(iphoneItems)
          for (let i = 0; i < 30; i++) {
              extendedItems.push(...shuffledItems)
            }
            columnsData.push(extendedItems)
            centerIndices.push(Math.floor(extendedItems.length / 2))
          }
          
          // Create shuffled column order for display
          const randomOrder = Array.from({ length: quantity }, (_, i) => i)
          setColumnOrder(shuffleArray(randomOrder))
          
          setColumnItems(columnsData)
          setColumnSpinIndices(centerIndices)
          startMultiColumnSpinning(columnsData, false)
        }, 800))
      }, 1800)) // 1.8 second delay to see items behind open box
    }, 0)) // Using timeout to force re-trigger
  }

  const resetGame = () => {
    setWonPrizes([])
    setSpinningItems([])
    setColumnSpinIndices([])
    setColumnItems([])
    setColumnOrder([])
    setBoxOpening(false)
    setBoxDisappearing(false)
    setShowBoxOnWinner(false)
    setIsGameInProgress(false)
  }

  return (
    <OSortudoLayout>
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
        {/* Main Content - Exact Rillabox Layout */}
      <div>
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

             {/* Unified Game Animation Container - Horizontal (qty=1) or Multi-Column Vertical (qty>1) */}
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
                
                {/* Conditional Layout: Horizontal for qty=1, Vertical Columns for qty>1 */}
                {quantity === 1 ? (
                  // Original Horizontal Layout for quantity = 1
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
                        transform: isSpinning && columnSpinIndices[0] !== undefined
                          ? `translateX(calc(50% - ${columnSpinIndices[0] * 120}px - 60px))`
                          : 'translateX(calc(50% - 1200px))',
                        width: isSpinning && columnItems[0] ? `${columnItems[0].length * 120}px` : 'auto'
                      }}
                    >
                      {(isSpinning && columnItems[0] ? columnItems[0] : Array.from({ length: 20 }).map((_, i) => iphoneItems[i % iphoneItems.length])).map((item, index) => {
                        const rarityColor = getRarityColor(item.rarity)
                        const isWinningItem = wonPrizes.some(prize => prize.id === item.id) && columnSpinIndices[0] === index

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
                ) : (
                  // Multi-Column Vertical Layout for quantity > 1
                  <div 
                    className="absolute inset-0 flex items-center justify-center overflow-x-auto overflow-y-hidden px-2 sm:px-4"
                    style={{ 
                      filter: 'none', 
                      opacity: 1.0
                    }}
                  >
                    <div 
                      className={`grid ${
                        quantity === 2 ? 'grid-cols-2 gap-4 sm:gap-8' :
                        quantity === 3 ? 'grid-cols-3 gap-3 sm:gap-6' :
                        'grid-cols-4 gap-2 sm:gap-4'
                      } max-w-full mx-auto`}
                    >
                      {Array.from({ length: quantity }).map((_, displayIndex) => {
                        // Use shuffled column order if available, otherwise sequential
                        const columnIndex = columnOrder.length > 0 ? columnOrder[displayIndex] : displayIndex
                        
                        const columnItemsArray = isSpinning && columnItems[columnIndex] 
                          ? columnItems[columnIndex] 
                          : Array.from({ length: 10 }).map((_, i) => iphoneItems[i % iphoneItems.length])
                        
                        const spinIndex = columnSpinIndices[columnIndex] || 0
                        const halfList = (columnItemsArray.length * ITEM_STEP_PX) / 2
                        
                        return (
                          <div 
                            key={`column-${columnIndex}`}
                            className="flex flex-col items-center overflow-hidden h-[550px]"
                            style={{
                              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                            }}
                          >
                            <div 
                              className={`flex flex-col items-center ${isSpinning ? 'transition-transform duration-100 ease-out' : ''}`}
                              style={{
                                transform: isSpinning 
                                  ? `translateY(calc(50% - ${spinIndex * ITEM_STEP_PX}px - ${HALF_ITEM_STEP_PX}px))`
                                  : `translateY(calc(50% - ${halfList}px))`
                              }}
                            >
                              {columnItemsArray.map((item, index) => {
                                const rarityColor = getRarityColor(item.rarity)
                                const isWinningItem = wonPrizes.some(prize => prize.id === item.id) && spinIndex === index

                                return (
                                  <div 
                                    key={`item-${columnIndex}-${index}`} 
                                    className="w-28 h-28 sm:w-36 sm:h-36 my-6 sm:my-8 rounded-xl flex items-center justify-center shrink-0 relative"
                                    style={{ 
                                      backgroundColor: isWinningItem ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                                      backdropFilter: 'blur(8px)',
                                      border: `1px solid ${rarityColor}80`,
                                      boxShadow: isWinningItem 
                                        ? `0 0 40px ${rarityColor}, 0 0 60px ${rarityColor}cc, 0 0 80px ${rarityColor}80`
                                        : `0 0 25px ${rarityColor}, 0 0 40px ${rarityColor}80, 0 0 60px ${rarityColor}40, 0 4px 12px rgba(0,0,0,0.5)`
                                    }}
                                  >
                                    <img src={item.image} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-contain opacity-90" onError={(e)=>{e.currentTarget.src='/placeholder.svg'}} />
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
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* 3D Box - Centered and overlapping columns */}
                {wonPrizes.length === 0 && !boxDisappearing && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
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
                
                {/* Box and winning items info container */}
                {wonPrizes.length > 0 && (
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
                    
                    {/* Winning items info directly under the box */}
                    <div className="text-center">
                      <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
                        <p className="text-white font-bold text-lg mb-1">You Won!</p>
                        <p className="text-green-400 font-semibold text-xl">
                          ${wonPrizes.reduce((sum, prize) => sum + prize.value, 0).toFixed(2)}
                        </p>
                        <p className="text-white/80 text-sm">{wonPrizes.length} items won!</p>
                        {wonPrizes.length <= 3 && (
                          <div className="mt-2 text-xs text-white/70 space-y-1">
                            {wonPrizes.map((prize, idx) => (
                              <div key={idx}>{prize.name}</div>
                            ))}
                          </div>
                        )}
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
                  Open for ${(2.79 * quantity).toFixed(2)}
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
              
              <div className="boxes-container landing-boxes grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {iphoneItems.map((item) => (
                  <div key={item.id} className="box-item relative">
                    {/* Decorative vector like homepage */}
                    <img
                      src="/images/helloween/vector-3.svg"
                      alt=""
                      className="vector-halloween"
                    />

                    {/* Name like homepage featured box */}
                    <span className="box-name line-clamp-2">{item.name}</span>

                    {/* Product image using homepage prod-img class */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="prod-img"
                      onError={(e) => { e.currentTarget.src = "/placeholder.svg" }}
                    />

                    {/* Price container exactly like homepage */}
                    <div className="price-container">
                      <div className="original-price">
                        <span>$</span>
                        <span>{(item.value * 1.15).toFixed(2)}</span>
                      </div>
                      <div className="current-price">
                        <span>$</span>
                        <span>{item.value.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Top/bottom color light pop based on rarity */}
                    <span
                      className="pointer-events-none absolute top-0 left-0 right-0 h-[6px]"
                      style={{
                        background: `linear-gradient(to bottom, ${getRarityColor(item.rarity)}80, transparent)`,
                        filter: 'blur(2px)'
                      }}
                    />
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[6px]"
                      style={{
                        background: `linear-gradient(to top, ${getRarityColor(item.rarity)}80, transparent)`,
                        filter: 'blur(2px)'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

        </div>
      </div>
    </OSortudoLayout>
  )
}
