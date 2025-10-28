"use client"

import { useState, useEffect, useRef } from "react"
import { X, Sparkles } from "lucide-react"

interface WinningModalProps {
  onClose: () => void
  productName?: string
  productPrice?: string
  productImage?: string
}

export default function WinningModal({
  onClose,
  productName = "Premium Prize",
  productPrice = "$599.99",
  productImage = "/luxury-product-gold-theme.jpg",
}: WinningModalProps) {
  const [isShaking, setIsShaking] = useState(true)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; type: string }>>([])
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [isCompact, setIsCompact] = useState(false)
  const [scale, setScale] = useState(1)
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const confettiParticles = Array.from({ length: 50 }, (_, i) => {
      // Use gold assets for coins and pot of gold
      const types = [
        "🍀",
        "img:/new/coin stacked.png",
        "✨",
        "🌈",
        "⭐",
        "🍯",
      ]
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        type: types[Math.floor(Math.random() * types.length)],
      }
    })
    setConfetti(confettiParticles)

    const floatingParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      delay: Math.random() * 0.6,
    }))
    setParticles(floatingParticles)

    // Keep shaking continuously (no timer to stop)
 
    const checkCompact = () => setIsCompact(window.innerHeight < 740)
    const computeScale = () => {
      const el = contentRef.current
      if (!el) return
      const vh = window.innerHeight
      const max = vh * 0.82
      const contentHeight = el.scrollHeight
      const ratio = contentHeight / max
      const nextScale = ratio > 1 ? Math.max(0.55, 1 / ratio) : 1
      setScale(nextScale)
      setWrapperHeight(Math.min(max, contentHeight * nextScale))
    }
 
    checkCompact()
    computeScale()
    window.addEventListener('resize', checkCompact)
    window.addEventListener('resize', computeScale)
 
    return () => {
      window.removeEventListener('resize', checkCompact)
      window.removeEventListener('resize', computeScale)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-50">
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none animate-confetti-premium"
          style={{
            left: `${particle.left}%`,
            top: "-20px",
            animationDelay: `${particle.delay}s`,
          }}
        >
          {particle.type.startsWith('img:') ? (
            <img
              src={particle.type.replace('img:', '')}
              alt="confetti"
              className="h-8 w-8 drop-shadow-lg"
            />
          ) : (
            <span className="text-4xl drop-shadow-lg">{particle.type}</span>
          )}
        </div>
      ))}

      {particles.map((particle) => (
        <div
          key={`particle-${particle.id}`}
          className="fixed pointer-events-none animate-float-particle"
          style={{
            left: `calc(50% + ${particle.x}px)`,
            top: `calc(50% + ${particle.y}px)`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-gold to-emerald-400 rounded-full blur-sm opacity-60" />
        </div>
      ))}

      <div
        ref={wrapperRef}
        style={{ height: wrapperHeight ? `${wrapperHeight}px` : undefined }}
        className={`relative w-full ${isCompact ? 'max-w-sm' : 'max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl'} bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 rounded-3xl shadow-2xl overflow-hidden border-2 border-gold/50 ${
          isShaking ? "animate-shake-premium" : ""
        }`}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400 via-gold via-emerald-300 to-emerald-400 p-0.5 pointer-events-none opacity-80">
          <div className="absolute inset-0.5 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950" />
        </div>

        <div className="absolute -inset-20 bg-gradient-to-r from-gold/20 via-emerald-400/20 to-gold/20 blur-3xl rounded-full pointer-events-none animate-pulse" />

        <button
          onClick={onClose}
          className={`absolute ${isCompact ? 'top-4 right-4 p-1.5' : 'top-6 right-6 p-2'} z-20 bg-gradient-to-br from-gold to-yellow-300 hover:from-yellow-300 hover:to-gold text-emerald-900 rounded-full transition-all hover:scale-125 shadow-xl hover:shadow-2xl`}
        >
          <X size={isCompact ? 22 : 28} className="font-bold" />
        </button>

        <div ref={contentRef} style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }} className={`relative z-10 ${isCompact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'} text-center`}>
            <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <div className="inline-block">
              <h1 className={`font-playfair ${isCompact ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-6xl'} font-black text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-500 to-gold drop-shadow-2xl animate-title-glow`}>
                YOU WON!
              </h1>
            </div>
            <div className="flex gap-2 justify-center">
              <div className="h-1.5 w-16 bg-gradient-to-r from-transparent to-gold rounded-full" />
              <div className="h-1.5 w-24 bg-gradient-to-r from-gold via-emerald-300 to-gold rounded-full" />
              <div className="h-1.5 w-16 bg-gradient-to-r from-gold to-transparent rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
            <span className="font-poppins font-bold text-emerald-100 text-2xl sm:text-3xl">Congratulations</span>
            {/* Inline SVG fireworks with gold gradient */}
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="fw-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF6D5" />
                  <stop offset="55%" stopColor="#FFD54F" />
                  <stop offset="100%" stopColor="#FFC107" />
                </radialGradient>
              </defs>
              <g className="firework-burst">
                <circle cx="32" cy="32" r="3" fill="url(#fw-grad)" />
                <g stroke="url(#fw-grad)" strokeWidth="3" strokeLinecap="round">
                  <path d="M32 8 L32 18" />
                  <path d="M32 46 L32 56" />
                  <path d="M8 32 L18 32" />
                  <path d="M46 32 L56 32" />
                  <path d="M14 14 L22 22" />
                  <path d="M42 42 L50 50" />
                  <path d="M14 50 L22 42" />
                  <path d="M42 22 L50 14" />
                </g>
                <g fill="url(#fw-grad)">
                  <circle cx="32" cy="12" r="2" />
                  <circle cx="32" cy="52" r="2" />
                  <circle cx="12" cy="32" r="2" />
                  <circle cx="52" cy="32" r="2" />
                  <circle cx="19" cy="19" r="1.8" />
                  <circle cx="45" cy="45" r="1.8" />
                  <circle cx="19" cy="45" r="1.8" />
                  <circle cx="45" cy="19" r="1.8" />
                </g>
              </g>
              <g className="firework-burst2">
                <circle cx="32" cy="32" r="2.5" fill="url(#fw-grad)" />
                <g stroke="url(#fw-grad)" strokeWidth="2" strokeLinecap="round" transform="rotate(22 32 32)">
                  <path d="M32 10 L32 18" />
                  <path d="M32 46 L32 54" />
                  <path d="M10 32 L18 32" />
                  <path d="M46 32 L54 32" />
                </g>
              </g>
            </svg>
          </div>

          <div className={`${isCompact ? 'mb-5 sm:mb-6' : 'mb-6 sm:mb-8'} relative`}>
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-emerald-300 to-gold rounded-3xl blur-2xl opacity-60 animate-pulse-glow-premium" />
            <div className={`relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl ${isCompact ? 'p-4' : 'p-6'} shadow-2xl border-3 border-gold/80 flex items-center justify-center`}>
              <img
                src={productImage || "/placeholder.svg"}
                alt={productName}
                className={`max-w-full ${isCompact ? 'h-32 sm:h-40 md:h-44' : 'h-40 sm:h-48 md:h-56'} object-contain rounded-2xl shadow-lg`}
              />
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <div className={`inline-block bg-gradient-to-r from-gold via-yellow-500 to-gold text-emerald-900 rounded-full font-poppins font-bold shadow-2xl border-3 border-emerald-900 transform hover:scale-105 transition-transform ${isCompact ? 'px-4 py-2.5 text-xl sm:text-2xl' : 'px-6 py-3 text-2xl sm:text-3xl'}`}>
              {productPrice}
            </div>
          </div>

          <p className={`font-poppins text-emerald-100 font-semibold tracking-wide ${isCompact ? 'text-sm sm:text-base mb-4 sm:mb-6' : 'text-base sm:text-lg mb-6 sm:mb-8'}`}>{productName}</p>

          {/* {isCompact ? null : (
            <div className="flex justify-center gap-6 sm:gap-8 mb-6 sm:mb-8 text-2xl sm:text-3xl">
              <span className="animate-bounce-delayed-2">🪙</span>
              <span className="text-5xl sm:text-6xl animate-spin-slow">🍯</span>
              <span className="animate-bounce-delayed-1">🪙</span>
            </div>
          )} */}

          <div className="space-y-4">
            <button className={`w-full bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-500 hover:via-gold hover:to-yellow-500 text-emerald-900 font-poppins font-bold rounded-full transition-all hover:shadow-2xl hover:scale-105 shadow-xl border-2 border-emerald-900 transform active:scale-95 ${isCompact ? 'py-2.5 px-5 text-base sm:text-lg' : 'py-3 px-6 text-lg sm:text-xl'}`}>
              Claim Prize
            </button>
            <button
              onClick={onClose}
              className={`w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-poppins font-bold rounded-full transition-all hover:shadow-xl shadow-lg transform active:scale-95 ${isCompact ? 'py-2.5 px-5 text-sm sm:text-base' : 'py-3 px-6 text-base sm:text-lg'}`}
            >
              Return to Boxes
            </button>
          </div>

          <div className={`flex items-center justify-center gap-2 text-emerald-200 font-poppins font-semibold ${isCompact ? 'mt-4 text-xs sm:text-sm' : 'mt-6 text-sm'}`}>
            <Sparkles size={16} className="text-gold" />
            <span>100% Authentic & Secured by Irish Luck</span>
            <Sparkles size={16} className="text-gold" />
          </div>
          <div className="mt-3 flex justify-center">
            <img src="/another/corrected white image.png" alt="Mascot holding coin" className="h-20 sm:h-24 w-auto drop-shadow-lg" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Gold utility */
        .text-gold { color: #FFC107; }
        .bg-gold { background-color: #FFC107; }
        .border-gold { border-color: #FFC107; }
        .via-gold { --tw-gradient-stops: var(--tw-gradient-from), #FFC107, var(--tw-gradient-to); }
        .from-gold { --tw-gradient-from: #FFC107; --tw-gradient-to: color-mix(in oklab, #FFC107 0%, transparent); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-gold { --tw-gradient-to: #FFC107; }
        .border-3 { border-width: 3px; }

        /* Fonts */
        .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
        .font-poppins { font-family: 'Poppins', system-ui, sans-serif; }

        /* Animations */
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .animate-bounce-delayed-1 { animation: bouncePremium 2.2s ease-in-out infinite; animation-delay: 0.1s; }
        .animate-bounce-delayed-2 { animation: bouncePremium 2.2s ease-in-out infinite; animation-delay: 0.25s; }
        .animate-bounce-delayed-3 { animation: bouncePremium 2.2s ease-in-out infinite; animation-delay: 0.4s; }
        @keyframes bouncePremium { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

        .animate-title-glow { animation: titleGlow 1.8s ease-in-out infinite alternate; }
        @keyframes titleGlow {
          0% { text-shadow: 0 0 12px rgba(247,216,124,0.65), 0 0 28px rgba(247,216,124,0.45), 0 0 48px rgba(34,197,94,0.35); filter: brightness(1); }
          100% { text-shadow: 0 0 22px rgba(247,216,124,0.95), 0 0 52px rgba(247,216,124,0.65), 0 0 78px rgba(34,197,94,0.5); filter: brightness(1.05); }
        }

        .animate-shake-premium { animation: shakePremium 0.9s ease-in-out infinite; }
        @keyframes shakePremium {
          0% { transform: translate3d(0,0,0) rotate(0); }
          10% { transform: translate3d(-2px, -1px, 0) rotate(-0.5deg); }
          20% { transform: translate3d(3px, 1px, 0) rotate(0.6deg); }
          30% { transform: translate3d(-3px, 2px, 0) rotate(-0.6deg); }
          40% { transform: translate3d(2px, -2px, 0) rotate(0.5deg); }
          50% { transform: translate3d(0, 0, 0) rotate(0); }
          60% { transform: translate3d(2px, 1px, 0) rotate(0.4deg); }
          70% { transform: translate3d(-2px, -1px, 0) rotate(-0.4deg); }
          80% { transform: translate3d(1px, 2px, 0) rotate(0.3deg); }
          90% { transform: translate3d(-1px, -2px, 0) rotate(-0.3deg); }
          100% { transform: translate3d(0,0,0) rotate(0); }
        }

        .animate-confetti-premium { animation: confettiPremium 3.5s linear infinite; }
        @keyframes confettiPremium {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        .animate-pulse-glow-premium { animation: pulseGlowPremium 2.5s ease-in-out infinite; }
        @keyframes pulseGlowPremium {
          0% { opacity: 0.45; transform: scale(0.98); }
          50% { opacity: 0.85; transform: scale(1.03); }
          100% { opacity: 0.45; transform: scale(0.98); }
        }

        /* Fireworks animation */
        .firework-burst { transform-origin: center; animation: fireworkBurst 1.8s ease-in-out infinite; }
        .firework-burst2 { transform-origin: center; animation: fireworkBurst 1.8s ease-in-out infinite; animation-delay: 0.5s; }
        @keyframes fireworkBurst {
          0% { transform: scale(0.8); opacity: 0.6; }
          35% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.85); opacity: 0.7; }
        }

        .animate-float-particle { animation: floatParticle 6s ease-in-out infinite; }
        @keyframes floatParticle {
          0% { transform: translate(-10px, -10px) scale(1); }
          50% { transform: translate(10px, 12px) scale(1.2); }
          100% { transform: translate(-10px, -10px) scale(1); }
        }
      `}</style>
    </div>
  )
}