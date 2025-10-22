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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const Box3D = dynamic(() => import("@/components/animations/box-3d").then(mod => ({ default: mod.Box3D })), {
  ssr: false,
  loading: () => <div className="w-[240px] h-[240px] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>
})

import iphoneItemsJson from "@/data/boxes/iphone-1pct.json"

// Lightweight overlays for win effects
const ConfettiBurst = ({ active, pieces = 90 }: { active: boolean; pieces?: number }) => {
  if (!active) return null;
  const colors = ["#22c55e", "#facc15", "#60a5fa", "#f472b6", "#34d399", "#f87171", "#a78bfa"];
  return (
    <>
      <div className="confetti-overlay">
        {Array.from({ length: pieces }).map((_, i) => {
          const delay = (Math.random() * 0.7).toFixed(2) + "s";
          const duration = (1.2 + Math.random() * 1.2).toFixed(2) + "s";
          const left = (Math.random() * 100).toFixed(2) + "%";
          const size = 5 + Math.floor(Math.random() * 7);
          const color = colors[i % colors.length];
          return (
            <span key={i} className="confetti-piece" style={{ left, width: size, height: size, backgroundColor: color, animationDelay: delay as any, animationDuration: duration as any } as any} />
          );
        })}
      </div>
      <style jsx>{`
        .confetti-overlay{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:60}
        .confetti-piece{position:absolute;top:20vh;opacity:0;border-radius:2px;animation-name:confetti-pop;animation-timing-function:ease-out}
        @keyframes confetti-pop{0%{transform:translateY(-5vh) rotate(0deg);opacity:0}10%{opacity:1}100%{transform:translateY(80vh) rotate(360deg);opacity:0}}
      `}</style>
    </>
  );
};

const LeavesCoinsRain = ({ active }: { active: boolean }) => {
  if (!active) return null;
  const leaves = Array.from({ length: 10 }).map((_, i) => ({
    src: "/leaves/leaves 1.png",
    left: (Math.random() * 100).toFixed(2) + "%",
    delay: (Math.random() * 1.2).toFixed(2) + "s",
    duration: (6 + Math.random() * 3).toFixed(2) + "s",
    size: 22 + Math.floor(Math.random() * 18),
    key: `leaf-${i}`,
  }));
  const coins = Array.from({ length: 7 }).map((_, i) => ({
    src: "/new/box_coin.png",
    left: (Math.random() * 100).toFixed(2) + "%",
    delay: (Math.random() * 1.2).toFixed(2) + "s",
    duration: (5.5 + Math.random() * 3).toFixed(2) + "s",
    size: 20 + Math.floor(Math.random() * 16),
    key: `coin-${i}`,
  }));
  const items = [...leaves, ...coins];
  return (
    <>
      <div className="rain-overlay">
        {items.map((it) => (
          <img key={it.key} src={it.src} className="rain-item" style={{ left: it.left, animationDelay: it.delay as any, animationDuration: it.duration as any, width: it.size, height: "auto" } as any} alt="" />
        ))}
      </div>
      <style jsx>{`
        .rain-overlay{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:50}
        .rain-item{position:absolute;top:-12vh;opacity:.9;filter:drop-shadow(0 4px 10px rgba(0,0,0,.35));animation-name:fall-sway;animation-timing-function:linear;animation-iteration-count:1}
        @keyframes fall-sway{0%{transform:translateY(-12vh) translateX(0) rotate(0deg);opacity:0}10%{opacity:1}100%{transform:translateY(112vh) translateX(30px) rotate(360deg);opacity:0}}
      `}</style>
    </>
  );
};

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
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
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
      try { audioCtxRef.current?.close() } catch { }
    }
  }, [])

  // Open win modal when prizes are set
  useEffect(() => {
    if (wonPrizes.length > 0) {
      setIsWinModalOpen(true)
    }
  }, [wonPrizes])

  const playClick = () => {
    if (isSoundMuted) return
    const ctx = audioCtxRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()
    const base = 850
    const jitter = Math.random() * 120
    osc.type = 'triangle'
    osc.frequency.value = base + jitter
    filter.type = 'lowpass'
    filter.frequency.value = 1200
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.28, ctx.currentTime + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.08)
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

      // Step 2: Wait 0.9 seconds then prepare for spinning
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
            for (let i = 0; i < 18; i++) {
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
        }, 300))
      }, 900)) // faster delay to bring up spin quicker
    }, initialDelay)) // Dynamic delay based on current state
  }

  // Multi-column spinning: orchestrates multiple vertical columns spinning simultaneously
  const startMultiColumnSpinning = (columnsData: any[][], isDemo: boolean) => {
    const numColumns = columnsData.length
    const startIndices = columnsData.map(col => Math.floor(col.length / 2))
    const currentIndices = [...startIndices]

    // Smooth timing using easing from fast to slow
    const totalSteps = isFastSpin ? 40 : 60
    const minInterval = isFastSpin ? 14 : 18
    const maxInterval = isFastSpin ? 70 : 95
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

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

    // Determine forward landing target ahead of the start index for a natural stop
    const baseOffset = isFastSpin ? 22 : 32
    const targetIndices: number[] = []

    const modifiedColumnsData = columnsData.map((columnArray, colIndex) => {
      const modified = [...columnArray]
      const start = startIndices[colIndex]
      const offset = baseOffset + Math.floor(Math.random() * 6) // slight variance per column
      let target = start + offset
      if (target >= columnArray.length - 2) target = columnArray.length - 3
      targetIndices.push(target)
      modified[target] = iphoneItems[finalItems[colIndex]]
      return modified
    })

    setColumnItems(modifiedColumnsData)

    let steps = 0
    const tick = () => {
      // Advance indices towards their targets
      let allLanded = true
      for (let col = 0; col < numColumns; col++) {
        if (currentIndices[col] < targetIndices[col]) {
          currentIndices[col] += 1
          allLanded = false
        } else {
          currentIndices[col] = targetIndices[col]
        }
      }

      setColumnSpinIndices([...currentIndices])
      playClick()

      steps++
      const progress = Math.min(1, steps / totalSteps)
      const interval = Math.max(16, minInterval + (maxInterval - minInterval) * easeOutCubic(progress))

      if (allLanded || steps >= totalSteps) {
        const winningItems = targetIndices.map((tIdx, ci) => modifiedColumnsData[ci][tIdx])
        timeouts.current.push(window.setTimeout(() => {
          setWonPrizes(winningItems)
          setIsSpinning(false)
          if (isDemo) setIsDemoSpinning(false)
        }, 400))
        return
      }

      timeouts.current.push(window.setTimeout(tick, interval))
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
    try { audioCtxRef.current?.resume?.() } catch { }

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

  const handleOpenAnotherFromModal = () => {
    setIsWinModalOpen(false)
    if (isAuthenticated) {
      handleRealSpin()
    } else {
      handleDemoSpin()
    }
  }

  const handleSellPrize = () => {
    const prize = wonPrizes[0]
    if (prize) {
      try {
        alert(`Sold for $${Number(prize.value).toFixed(2)}`)
      } catch { }
    }
    setIsWinModalOpen(false)
  }

  const handleWinModalOpenChange = (open: boolean) => {
    setIsWinModalOpen(open)
    if (!open) {
      resetGame()
    }
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
          <div className="mb-4 grid grid-cols-3 items-center">
            <Link href="/boxes" className="inline-flex items-center text-white/70 hover:text-white text-sm justify-self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Boxes
            </Link>
            <div className="justify-self-center flex items-center gap-2 text-white font-bold text-lg">
              <img src="/box.png" alt="iPhone Box" className="w-6 h-6 object-contain" />
              <span>1% iPhone</span>
            </div>
            <Button
              onClick={() => setIsSoundMuted(!isSoundMuted)}
              size="icon"
              className="bg-[#2d3548] hover:bg-[#353d52] text-white rounded-lg border-0 w-10 h-10 justify-self-end"
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
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-white animate-pulse"></div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center z-10">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-white animate-pulse"></div>
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
                  className={`flex items-center ${(isSpinning || wonPrizes.length > 0) ? 'transition-transform duration-100 ease-out' : ''}`}
                  style={{
                    transform: (isSpinning || wonPrizes.length > 0) && columnSpinIndices[0] !== undefined
                      ? `translateX(calc(50% - ${columnSpinIndices[0] * 120}px - 60px))`
                      : 'translateX(calc(50% - 1200px))',
                    width: ((isSpinning || wonPrizes.length > 0) && columnItems[0]) ? `${columnItems[0].length * 120}px` : 'auto'
                  }}
                >
                  {(((isSpinning || wonPrizes.length > 0) && columnItems[0]) ? columnItems[0] : Array.from({ length: 20 }).map((_, i) => iphoneItems[i % iphoneItems.length])).map((item, index) => {
                    const rarityColor = getRarityColor(item.rarity)
                    const isWinningItem = wonPrizes.some(prize => prize.id === item.id) && columnSpinIndices[0] === index

                    return (
                      <div key={`item-${index}`} className="w-24 h-24 mx-3 rounded-xl flex items-center justify-center shrink-0 relative"
                        style={{
                          backgroundColor: isWinningItem ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(8px)',
                          border: isWinningItem ? `2px solid ${rarityColor}` : `1px solid ${rarityColor}80`,
                          boxShadow: isWinningItem
                            ? `0 0 60px ${rarityColor}, 0 0 100px ${rarityColor}cc, 0 0 140px ${rarityColor}80`
                            : `0 0 25px ${rarityColor}, 0 0 40px ${rarityColor}80, 0 0 60px ${rarityColor}40, 0 4px 12px rgba(0,0,0,0.5)`,
                          transform: isWinningItem ? 'scale(1.12)' : 'scale(1)',
                          transition: 'transform 250ms ease, box-shadow 250ms ease',
                          zIndex: isWinningItem ? 50 : 'auto'
                        }}
                      >
                        <img src={item.image} alt={item.name} className={`w-16 h-16 object-contain ${isWinningItem ? 'opacity-100' : 'opacity-90'}`} onError={(e) => { e.currentTarget.src = '/placeholder.svg' }} />
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${rarityColor}50 0%, ${rarityColor}25 40%, transparent 70%)`
                          }}
                        />
                        {isWinningItem && (
                          <div
                            className="absolute -inset-1 rounded-2xl pointer-events-none animate-pulse"
                            style={{ boxShadow: `0 0 40px ${rarityColor}, 0 0 90px ${rarityColor}aa` }}
                          />
                        )}
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
                  className={`grid ${quantity === 2 ? 'grid-cols-2 gap-4 sm:gap-8' :
                      quantity === 3 ? 'grid-cols-3 gap-3 sm:gap-6' :
                        'grid-cols-4 gap-2 sm:gap-4'
                    } max-w-full mx-auto`}
                >
                  {Array.from({ length: quantity }).map((_, displayIndex) => {
                    // Use shuffled column order if available, otherwise sequential
                    const columnIndex = columnOrder.length > 0 ? columnOrder[displayIndex] : displayIndex

                    const columnItemsArray = (isSpinning || wonPrizes.length > 0) && columnItems[columnIndex]
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
                          className={`flex flex-col items-center ${(isSpinning || wonPrizes.length > 0) ? 'transition-transform duration-100 ease-out' : ''}`}
                          style={{
                            transform: (isSpinning || wonPrizes.length > 0)
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
                                  backgroundColor: isWinningItem ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                  backdropFilter: 'blur(8px)',
                                  border: isWinningItem ? `2px solid ${rarityColor}` : `1px solid ${rarityColor}80`,
                                  boxShadow: isWinningItem
                                    ? `0 0 60px ${rarityColor}, 0 0 100px ${rarityColor}cc, 0 0 140px ${rarityColor}80`
                                    : `0 0 25px ${rarityColor}, 0 0 40px ${rarityColor}80, 0 0 60px ${rarityColor}40, 0 4px 12px rgba(0,0,0,0.5)`,
                                  transform: isWinningItem ? 'scale(1.08)' : 'scale(1)',
                                  transition: 'transform 250ms ease, box-shadow 250ms ease',
                                  zIndex: isWinningItem ? 50 : 'auto'
                                }}
                              >
                                <img src={item.image} alt={item.name} className={`w-20 h-20 sm:w-24 sm:h-24 object-contain ${isWinningItem ? 'opacity-100' : 'opacity-90'}`} onError={(e) => { e.currentTarget.src = '/placeholder.svg' }} />
                                <div
                                  className="absolute inset-0 rounded-xl pointer-events-none"
                                  style={{
                                    background: `radial-gradient(circle at center, ${rarityColor}50 0%, ${rarityColor}25 40%, transparent 70%)`
                                  }}
                                />
                                {isWinningItem && (
                                  <div
                                    className="absolute -inset-1 rounded-2xl pointer-events-none animate-pulse"
                                    style={{ boxShadow: `0 0 50px ${rarityColor}, 0 0 110px ${rarityColor}aa` }}
                                  />
                                )}
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
            {showBoxOnWinner && wonPrizes.length > 0 && (
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
                className={`px-3 py-3 rounded-lg border-0 transition-all ${isFastSpin
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-[#2d3548] hover:bg-[#353d52] text-white'
                  }`}
              >
                <Zap className={`w-4 h-4 ${isFastSpin ? 'animate-pulse' : ''}`} />
              </Button>
            </div>

            {/* Quantity Selection */}
            {/* <div className="flex space-x-2">
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
              </div> */}
          </div>
          {/* Items in Box - Exact Rillabox Style */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-400 mb-2">Drops in 1% iPhone (15)</h2>
            <p className="text-white/60 mb-8 text-base">Unbox to ship or exchange one of the products:</p>

            <div className="boxes-container landing-boxes grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {iphoneItems.map((item) => (
                <div key={item.id} className="box-item relative">
                  {/* Decorative vector like homepage */}
                  {/* <img
                      src="/images/helloween/vector-3.svg"
                      alt=""
                      className="vector-halloween"
                    /> */}

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
                    className="pointer-events-none absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: getRarityColor(item.rarity),
                      filter: 'none'
                    }}
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{
                      background: getRarityColor(item.rarity),
                      filter: 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Similar Boxes - Homepage Card Design */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Similar Boxes</h2>
            <p className="text-white/60 mb-6 text-sm">Explore other boxes in a similar price range or niche</p>

            <div className="boxes-container landing-boxes grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {similarBoxes.map((box) => (
                <Link key={box.id} href={`/boxes/${box.id}`} className="box-item relative">
                  {/* <img src="/images/helloween/vector-3.svg" alt="" className="vector-halloween" /> */}
                  <span className="box-name line-clamp-2">{box.name}</span>
                  <img src={box.image} alt={box.name} className="prod-img" onError={(e) => { e.currentTarget.src = '/placeholder.svg' }} />

                  <div className="price-container">
                    <div className="current-price">
                      <span>$</span>
                      <span>{box.currentPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <span
                    className="pointer-events-none absolute top-0 left-0 right-0 h-[3px]"
                    style={{
                      background: box.borderColor,
                      filter: 'none'
                    }}
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px]"
                    style={{
                      background: box.borderColor,
                      filter: 'none'
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>

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

          {/* Payment Methods Bar - Green theme */}
          <section className="mb-10">
            <div className="rounded-xl border border-[#1f6b4a] bg-gradient-to-r from-[#0a1b14] via-[#0d241b] to-[#0a1b14] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#22c55e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line></svg>
                  </div>
                  <span className="text-sm md:text-base font-semibold text-foreground">Payment Methods</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap justify-end">
                  {[
                    { name: "Visa", icon: "https://rillabox.com/icons/visa-image.png" },
                    { name: "Master Card", icon: "https://rillabox.com/icons/mastercard-icon.png" },
                    { name: "Skirlls", icon: "https://rillabox.com/icons/skirlls.png" },
                    { name: "Google Pay", icon: "https://rillabox.com/icons/google-pay.png" },
                    { name: "Tether", icon: "https://rillabox.com/icons/tether.png" },
                    { name: "Bitcoin", icon: "https://rillabox.com/icons/bitcoin.png" },
                    { name: "Ethereum", icon: "https://rillabox.com/icons/ethereum.png" },
                    { name: "Solana", icon: "https://rillabox.com/icons/solana.png" }
                  ].map((method) => (
                    <div key={method.name} className="w-14 h-14 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner hover:border-[#28da6a] hover:bg-[#123323] transition-colors">
                      <img src={method.icon} alt={method.name} className="w-10 h-10 object-contain brightness-110 contrast-110" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* Win Effects */}
      {isWinModalOpen && (
        <>
          <LeavesCoinsRain active={true} />
          <ConfettiBurst active={true} />
        </>
      )}

      {/* Win Modal */}
      <Dialog open={isWinModalOpen} onOpenChange={handleWinModalOpenChange}>
        <DialogContent className="relative overflow-hidden bg-gradient-to-b from-[#0a121f] to-[#0f1a28] text-white max-w-md rounded-2xl border border-white/10 shadow-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl ring-1 ring-white/10">
          <div className="absolute inset-0 pointer-events-none opacity-80" style={{ background: 'radial-gradient(40% 40% at 50% 40%, rgba(34,197,94,.25), transparent 60%), radial-gradient(30% 30% at 30% 70%, rgba(59,130,246,.18), transparent 60%), radial-gradient(30% 30% at 70% 70%, rgba(250,204,21,.15), transparent 60%)', filter: 'blur(20px)' }} />

          <div className="absolute inset-0 pointer-events-none z-0">
            <img src="/leaves/leave%204.png" alt="" className="absolute w-8 opacity-80 top-3 left-3 -rotate-[15deg]" />
            <img src="/leaves/leave%204.png" alt="" className="absolute w-7 opacity-70 top-2 right-6 rotate-[12deg]" />
            <img src="/leaves/leave%204.png" alt="" className="absolute w-10 opacity-80 bottom-6 left-4 rotate-[8deg]" />
            <img src="/leaves/leave%204.png" alt="" className="absolute w-9 opacity-75 bottom-4 right-5 -rotate-12" />
          </div>

          <DialogHeader className="relative z-10">
            <DialogTitle>
              <div className="bg-[#22c55e] text-black font-extrabold text-center py-3 rounded-xl shadow-[0_2px_10px_rgba(34,197,94,0.35)]">YOU WON</div>
            </DialogTitle>
          </DialogHeader>

          {/* Prize preview */}
          <div className="flex flex-col items-center justify-center mt-4">
            {wonPrizes[0] && (
              <>
                <div className="relative w-40 h-40 mb-3 flex items-center justify-center">
                  <img src={wonPrizes[0].image} alt={wonPrizes[0].name} className="w-full h-full object-contain" />
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#22c55e] text-black font-bold px-3 py-1 rounded-full shadow-lg">
                    ${Number(wonPrizes[0].value).toFixed(2)}
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mb-6 text-center">
                  {wonPrizes[0].name}
                </p>
              </>
            )}
          </div>

          <DialogFooter className="mt-2 flex flex-col gap-3">
            <Button onClick={handleOpenAnotherFromModal} className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold w-full">
              Open Another
            </Button>
            <Button onClick={handleSellPrize} className="bg-[#2d3548] hover:bg-[#353d52] text-white w-full">
              Sell for ${wonPrizes[0] ? Number(wonPrizes[0].value).toFixed(2) : "0.00"}
            </Button>
            <Link href="/boxes" className="w-full">
              <Button variant="ghost" className="w-full text-white/80 hover:text-white hover:bg-white/10">
                Return to Boxes
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </OSortudoLayout>
  )
}
