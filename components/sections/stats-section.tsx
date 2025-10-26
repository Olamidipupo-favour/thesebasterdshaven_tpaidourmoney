import { Users, Package } from "lucide-react"

export function StatsSection() {
  return (
    <div className="w-full max-w-[400px] sm:max-w-[480px] md:max-w-4xl mx-auto flex items-center justify-center gap-4 md:gap-10 relative px-3">
      {/* Decorative coins (static, local assets) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* <img
          src="/new/coin stacked.png"
          alt="Coins"
          className="absolute bottom-4 left-6 w-28 h-auto opacity-70"
        />
        <img
          src="/new/coin stacked.png"
          alt="Coins"
          className="absolute bottom-6 right-8 w-24 h-auto opacity-60"
        /> */}
      </div>

      {/* Left mascot */}
      {/* <div className="hidden md:block flex-shrink-0 relative z-10">
        <div className="w-32 lg:w-40 h-32 lg:h-40 flex items-center justify-center">
          <img src="/new/mascot.png" alt="Mascot Left" className="w-full h-full object-contain drop-shadow-2xl rounded-lg" />
        </div>
      </div> */}

      {/* Stats Card */}
      <div className="relative w-full max-w-[380px] sm:max-w-[480px] md:max-w-2xl overflow-visible rounded-2xl bg-gradient-to-br from-[#0a120f] via-[#0c1411] to-[#0d1612] p-3 sm:p-4 md:p-8 shadow-xl border border-emerald-700/30">
        {/* decorative coin image (static) */}
        {/* <img
          src="/new/coin floor.png"
          alt=""
          className="absolute bottom-2 left-4 w-28 h-auto opacity-70 pointer-events-none"
        /> */}

        {/* Side decorations behind text */}
        <img
          src="/add/win gold plate.png"
          alt="Win ticket"
          className="absolute -left-6 sm:-left-8 md:-left-16 bottom-5 sm:bottom-6 md:bottom-8 w-16 sm:w-20 md:w-36 h-auto opacity-90 drop-shadow-xl pointer-events-none z-[1]"
        />
        <img
          src="/add/coin, cash stash.png"
          alt="Cash stack"
          className="absolute -right-6 sm:-right-8 md:-right-14 bottom-4 sm:bottom-6 w-16 sm:w-20 md:w-36 h-auto opacity-90 drop-shadow-xl pointer-events-none z-[1]"
        />

        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Users Stat */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] mb-2 sm:mb-3 shadow-lg shadow-emerald-500/30">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-bebas)] text-white tracking-wide">
                993,881
              </div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-200 font-medium tracking-wide">Users</div>
            </div>
          </div>

          {/* Mystery Boxes Stat */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] mb-2 sm:mb-3 shadow-lg shadow-emerald-500/30">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-5xl font-[family-name:var(--font-bebas)] text-white tracking-wide">
                3,917,122
              </div>
              <div className="text-xs sm:text-sm md:text-base text-emerald-200 font-medium tracking-wide">
                Mystery Boxes Opened
              </div>
            </div>
          </div>
        </div>
        

        {/* Bottom Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-5 sm:h-6 md:h-10 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z"
              fill="#047857"
              opacity="0.6"
            />
            <path
              d="M0,80 C200,100 400,60 600,80 C800,100 1000,60 1200,80 L1200,120 L0,120 Z"
              fill="#059669"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>



      {/* Right mascot */}
      {/* <div className="hidden md:block flex-shrink-0 relative z-10">
        <div className="w-32 lg:w-40 h-32 lg:h-40 flex items-center justify-center">
          <img src="/new/mascot.png" alt="Mascot Right" className="w-full h-full object-contain drop-shadow-2xl rounded-lg" />
        </div>

      </div> */}
    </div>
  )
}