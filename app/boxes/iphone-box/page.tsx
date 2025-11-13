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
import WinningModal from "@/components/winning-modal"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const Box3D = dynamic(() => import("@/components/animations/box-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-[240px] h-[240px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  )
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

  // Horizontal single-row spinner constants (qty = 1)
  // Item container w-24 (96px) + mx-3 on both sides (24px total) = 120px per step
  const H_ITEM_BOX_PX = 96
  const H_ITEM_MARGIN_X_TOTAL_PX = 24
  const H_ITEM_STEP_PX = H_ITEM_BOX_PX + H_ITEM_MARGIN_X_TOTAL_PX // 120
  const H_HALF_ITEM_STEP_PX = H_ITEM_STEP_PX / 2 // 60

  const { user, isAuthenticated } = useAuth()
  const [isSpinning, setIsSpinning] = useState(false)
  const [isDemoSpinning, setIsDemoSpinning] = useState(false)
  const [wonPrizes, setWonPrizes] = useState<any[]>([])
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const [columnSpinIndices, setColumnSpinIndices] = useState<number[]>([])
  const [columnItems, setColumnItems] = useState<any[][]>([])
  const [columnOrder, setColumnOrder] = useState<number[]>([])
  // Match transform transition duration to current step interval for continuous glide
  const [spinStepDurationMs, setSpinStepDurationMs] = useState<number>(100)
  const [boxOpening, setBoxOpening] = useState(false) // Start closed
  const [boxDisappearing, setBoxDisappearing] = useState(false)
  const [isGameInProgress, setIsGameInProgress] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"usd" | "coins">("coins")
  const [quantity, setQuantity] = useState(1)
  const [isBoxHovered, setIsBoxHovered] = useState(false)
  const [isSoundMuted, setIsSoundMuted] = useState(false)
  const isSoundMutedRef = useRef<boolean>(false)
  const [showBoxOnWinner, setShowBoxOnWinner] = useState(false)
  const [isFastSpin, setIsFastSpin] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [winningHighlightActive, setWinningHighlightActive] = useState(false)
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

  // Keep a live ref of mute state so sounds can be silenced mid-spin
  useEffect(() => {
    isSoundMutedRef.current = isSoundMuted
  }, [isSoundMuted])

  // Delay opening win modal to spotlight the winner with a bright effect
  useEffect(() => {
    if (wonPrizes.length > 0) {
      setWinningHighlightActive(true)
      const t = window.setTimeout(() => {
        setIsWinModalOpen(true)
        setWinningHighlightActive(false)
      }, 1600) // ~1.6s pause before modal
      return () => window.clearTimeout(t)
    }
  }, [wonPrizes])

  const playClick = () => {
    if (isSoundMutedRef.current) return
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
    gain.gain.exponentialRampToValueAtTime(0.20, ctx.currentTime + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.030)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.034)
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
            // Ensure a long track so a 5s fast phase has room
            const replicateCount = 100 // ~1500 items (15 * 100)
            for (let i = 0; i < replicateCount; i++) {
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

    // Timing tuned for device and demo vs real spins
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches
    // Demo on mobile: slower intervals and longer deceleration for visibility
    const fastIntervalMs = isDemo && isMobile ? 40 : 16
    const fastDurationMs = isDemo && isMobile ? 2500 : 3000
    const fastSteps = Math.floor(fastDurationMs / fastIntervalMs)

    const decelDurationMs = isDemo && isMobile ? 5200 : 4000
    const endMaxIntervalMs = isDemo && isMobile ? 380 : 280 // slower final step interval for more natural stop
    // Faster early reduction: easeOutExpo grows quickly at the start
    const easeOutExpo = (t: number) => (t === 0 ? 0 : 1 - Math.pow(2, -10 * t))
    // Build deceleration interval schedule and scale to exactly decelDurationMs
    const slowSteps = isDemo && isMobile ? 105 : 85 // more steps during deceleration for smoother, longer slowdown
    const rawIntervals = Array.from({ length: slowSteps }, (_, i) => {
      const t = i / (slowSteps - 1)
      return fastIntervalMs + (endMaxIntervalMs - fastIntervalMs) * easeOutExpo(t)
    })
    const rawSum = rawIntervals.reduce((sum, v) => sum + v, 0)
    const scale = decelDurationMs / rawSum
    const decelIntervals = rawIntervals.map(v => Math.max(8, v * scale))
    // Final tail to bring perceived speed near-zero without feeling abrupt
    const tailIntervals = isDemo && isMobile ? [340, 380, 420] : [300, 340, 380]
    const totalSlowSteps = slowSteps + tailIntervals.length

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

    // Determine landing target so total distance ~= fastSteps + totalSlowSteps
    const targetIndices: number[] = []
    const modifiedColumnsData = columnsData.map((columnArray, colIndex) => {
      const modified = [...columnArray]
      const start = startIndices[colIndex]
      // small random padding so it doesn't feel mechanical
      const padding = 6 + Math.floor(Math.random() * 6)
      let target = start + fastSteps + totalSlowSteps + padding
      if (target >= columnArray.length - 2) target = columnArray.length - 3
      targetIndices.push(target)
      modified[target] = iphoneItems[finalItems[colIndex]]
      return modified
    })

    setColumnItems(modifiedColumnsData)

    let step = 0
    const tick = () => {
      let allLanded = true

      if (step < fastSteps) {
        // Phase 1: very fast constant speed
        for (let col = 0; col < numColumns; col++) {
          currentIndices[col] += 1
          if (currentIndices[col] < targetIndices[col]) allLanded = false
        }
      } else {
        // Phase 2: smooth deceleration toward target
        for (let col = 0; col < numColumns; col++) {
          if (currentIndices[col] < targetIndices[col]) {
            currentIndices[col] += 1
            allLanded = false
          } else {
            currentIndices[col] = targetIndices[col]
          }
        }
      }

      setColumnSpinIndices([...currentIndices])
      // Only play the tick sound while the columns are still moving.
      // This prevents an extra click right after the winning item lands.
      if (!allLanded) {
        playClick()
      }

      // Compute next interval based on phase
      let nextInterval = fastIntervalMs
      if (step >= fastSteps) {
        const decIndex = step - fastSteps
        if (decIndex < slowSteps) {
          nextInterval = decelIntervals[Math.max(0, decIndex)]
        } else {
          const tailIdx = Math.min(decIndex - slowSteps, tailIntervals.length - 1)
          nextInterval = tailIntervals[tailIdx]
        }
      }

      // Match transition duration to interval at all phases to avoid mid-spin speed bumps
      setSpinStepDurationMs(Math.min(460, Math.max(16, Math.floor(nextInterval))))

      step++

      if (allLanded) {
        const winningItems = currentIndices.map((idx, ci) => modifiedColumnsData[ci][idx])
        timeouts.current.push(window.setTimeout(() => {
          setWonPrizes(winningItems)
          setIsSpinning(false)
          if (isDemo) setIsDemoSpinning(false)
        }, 400))
        return
      }

      timeouts.current.push(window.setTimeout(tick, Math.max(8, nextInterval)))
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
            // Longer track for real spins to accommodate extended timing
            const replicateCount = 120 // ~1800 items
            for (let i = 0; i < replicateCount; i++) {
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
        @keyframes boxContinuousShake {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-0.6deg) translateY(-0.5px); }
          30% { transform: rotate(0.5deg) translateX(0.6px); }
          45% { transform: rotate(-0.4deg) translateY(0.5px); }
          60% { transform: rotate(0.4deg) translateX(-0.5px); }
          75% { transform: rotate(-0.3deg); }
          90% { transform: rotate(0.2deg); }
        }
        .box-shake {
          animation: boxContinuousShake 2.6s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }
        .box-aura {
          position: absolute;
          inset: -24px;
          border-radius: 30px;
          background: radial-gradient(circle at center, rgba(34,197,94,0.30) 0%, rgba(34,197,94,0.15) 38%, transparent 70%);
          filter: blur(14px);
          pointer-events: none;
          z-index: -1;
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
                  className={`flex items-center`}
                  style={{
                    position: 'relative',
                    left: '50%',
                    transform: (isSpinning || wonPrizes.length > 0) && columnSpinIndices[0] !== undefined
                      ? `translate3d(calc(-${columnSpinIndices[0] * H_ITEM_STEP_PX}px - ${H_HALF_ITEM_STEP_PX}px), 0, 0)`
                      : `translate3d(calc(-${10 * H_ITEM_STEP_PX}px - ${H_HALF_ITEM_STEP_PX}px), 0, 0)`,
                    width: ((isSpinning || wonPrizes.length > 0) && columnItems[0]) ? `${columnItems[0].length * H_ITEM_STEP_PX}px` : 'auto',
                    transitionProperty: (isSpinning || wonPrizes.length > 0) ? 'transform' : undefined,
                    transitionTimingFunction: (isSpinning || wonPrizes.length > 0) ? 'cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
                    transitionDuration: (isSpinning || wonPrizes.length > 0) ? `${spinStepDurationMs}ms` : undefined,
                    willChange: (isSpinning || wonPrizes.length > 0) ? 'transform' : undefined
                  }}
                >
                  {(((isSpinning || wonPrizes.length > 0) && columnItems[0]) ? columnItems[0] : Array.from({ length: 20 }).map((_, i) => iphoneItems[i % iphoneItems.length])).map((item, index) => {
                    const rarityColor = getRarityColor(item.rarity)
                    const isWinningItem = wonPrizes.some(prize => prize.id === item.id) && columnSpinIndices[0] === index

                    return (
                      <div
                        key={`item-${index}`}
                        className="w-24 h-24 mx-3 flex items-center justify-center shrink-0 relative"
                        style={{
                          backgroundColor: 'transparent',
                          backdropFilter: 'none',
                          border: 'none',
                          boxShadow: 'none',
                          transform: isWinningItem ? 'scale(1.12)' : 'scale(1)',
                          transition: 'transform 250ms ease',
                          zIndex: isWinningItem ? 60 : 'auto'
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={`w-16 h-16 object-contain ${isWinningItem ? 'opacity-100' : 'opacity-95'}`}
                          onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
                          style={{ filter: `drop-shadow(0 0 14px ${rarityColor}80) drop-shadow(0 0 28px ${rarityColor}40)` }}
                        />
                        {isWinningItem && (
                          <>
                            <div
                              className="absolute inset-0 pointer-events-none rounded-xl"
                              style={{
                                background: `radial-gradient(circle at center, ${rarityColor}55 0%, ${rarityColor}30 45%, transparent 70%)`
                              }}
                            />
                            <div
                              className="absolute -inset-1 rounded-2xl pointer-events-none animate-pulse"
                              style={{ boxShadow: `0 0 50px ${rarityColor}, 0 0 110px ${rarityColor}aa` }}
                            />
                            {winningHighlightActive && (
                              <div
                                className="absolute inset-0 pointer-events-none rounded-xl animate-pulse"
                                style={{
                                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.70) 0%, rgba(255,255,255,0.40) 45%, transparent 70%)'
                                }}
                              />
                            )}
                            {winningHighlightActive && (
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ boxShadow: '0 0 40px rgba(255,255,255,0.75), 0 0 120px rgba(255,255,255,0.55)' }}
                              />
                            )}
                            <div
                              className="absolute inset-0 rounded-xl border-2"
                              style={{ borderColor: `${rarityColor}` }}
                            />
                          </>
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
                          className={`flex flex-col items-center`}
                          style={{
                            transform: (isSpinning || wonPrizes.length > 0)
                              ? `translate3d(0, calc(50% - ${spinIndex * ITEM_STEP_PX}px - ${HALF_ITEM_STEP_PX}px), 0)`
                              : `translate3d(0, calc(50% - ${halfList}px), 0)`,
                            transitionProperty: (isSpinning || wonPrizes.length > 0) ? 'transform' : undefined,
                            transitionTimingFunction: (isSpinning || wonPrizes.length > 0) ? 'cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
                            transitionDuration: (isSpinning || wonPrizes.length > 0) ? `${spinStepDurationMs}ms` : undefined,
                            willChange: (isSpinning || wonPrizes.length > 0) ? 'transform' : undefined
                          }}
                        >
                          {columnItemsArray.map((item, index) => {
                            const rarityColor = getRarityColor(item.rarity)
                            const isWinningItem = wonPrizes.some(prize => prize.id === item.id) && spinIndex === index

                            return (
                              <div
                                key={`item-${columnIndex}-${index}`}
                                className="w-28 h-28 sm:w-36 sm:h-36 my-6 sm:my-8 flex items-center justify-center shrink-0 relative"
                                style={{
                                  backgroundColor: 'transparent',
                                  backdropFilter: 'none',
                                  border: 'none',
                                  boxShadow: 'none',
                                  transform: isWinningItem ? 'scale(1.10)' : 'scale(1)',
                                  transition: 'transform 250ms ease',
                                  zIndex: isWinningItem ? 60 : 'auto'
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className={`w-20 h-20 sm:w-24 sm:h-24 object-contain ${isWinningItem ? 'opacity-100' : 'opacity-95'}`}
                                  onError={(e) => { e.currentTarget.src = '/placeholder.svg' }}
                                  style={{ filter: `drop-shadow(0 0 16px ${rarityColor}80) drop-shadow(0 0 32px ${rarityColor}40)` }}
                                />
                                <div
                                  className="absolute inset-0 rounded-xl pointer-events-none"
                                  style={{
                                    background: `radial-gradient(circle at center, ${rarityColor}60 0%, ${rarityColor}35 40%, transparent 70%)`
                                  }}
                                />
                                {isWinningItem && (
                                  <>
                                    <div
                                      className="absolute -inset-1 rounded-2xl pointer-events-none animate-pulse"
                                      style={{ boxShadow: `0 0 65px ${rarityColor}, 0 0 130px ${rarityColor}bb` }}
                                    />
                                    {winningHighlightActive && (
                                      <div
                                        className="absolute inset-0 rounded-xl pointer-events-none animate-pulse"
                                        style={{
                                          background: 'radial-gradient(circle at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.45) 40%, transparent 70%)'
                                        }}
                                      />
                                    )}
                                    {winningHighlightActive && (
                                      <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{ boxShadow: '0 0 48px rgba(255,255,255,0.80), 0 0 140px rgba(255,255,255,0.60)' }}
                                      />
                                    )}
                                  </>
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
                <div className="relative box-shake">
                  <div className="box-aura" />
                  <Suspense fallback={<div className="w-[240px] h-[240px]"></div>}>
                    <Box3D
                      isHovered={isBoxHovered}
                      boxOpening={boxOpening}
                      boxDisappearing={boxDisappearing}
                    />
                  </Suspense>
                </div>
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

            {/* Action Buttons Row - prevent horizontal overflow on small screens */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-2">
              <Button
                onClick={handleDemoSpin}
                className="bg-[#2d3548] hover:bg-[#353d52] text-white px-5 sm:px-6 py-3 text-sm font-medium rounded-lg border-0 w-full sm:w-auto"
                disabled={isGameInProgress}
              >
                DEMO SPIN
              </Button>
              <Button
                onClick={handleRealSpin}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-5 sm:px-6 py-3 text-sm font-medium rounded-lg border-0 shadow-lg shadow-green-500/30 w-full sm:w-auto"
                disabled={!isAuthenticated || isGameInProgress}
              >
                <Gift className="w-4 h-4 mr-2" />
                Open for ${(2.79 * quantity).toFixed(2)}
              </Button>
              {/* <Button
                onClick={handleFastSpin}
                className={`px-3 py-3 rounded-lg border-0 transition-all sm:w-auto ${isFastSpin
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                    : 'bg-[#2d3548] hover:bg-[#353d52] text-white'
                  }`}
              >
                <Zap className={`w-4 h-4 ${isFastSpin ? 'animate-pulse' : ''}`} />
              </Button> */}
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
                <Link key={box.id} href={`#`} className="box-item relative">
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 sm:mb-0 mx-auto sm:mx-0">
                  <div className="w-14 h-14 md:w-10 md:h-10 rounded-lg bg-[#22c55e] border border-[#1f6b4a] flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line></svg>
                  </div>
                  <span className="text-xl md:text-base font-semibold text-foreground text-center sm:text-left">Payment Methods</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
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

      {/* Win Effects removed per request: no falling particles */}

      {/* Win Modal */}
      {isWinModalOpen && wonPrizes[0] && (
        <WinningModal
          onClose={() => handleWinModalOpenChange(false)}
          productName={wonPrizes[0].name}
          productPrice={`$${Number(wonPrizes[0].value).toFixed(2)}`}
          productImage={wonPrizes[0].image}
        />
      )}
    </OSortudoLayout>
  )
}
