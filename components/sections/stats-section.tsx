import { Users, Package } from "lucide-react"

export function StatsSection() {
  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-6 md:gap-10 relative">
      {/* Floating decorative elements (adapted from v0) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/helloween/star-object.svg"
          alt=""
          className="absolute top-10 left-[15%] w-8 h-8 opacity-40 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <img
          src="/images/helloween/star-object.svg"
          alt=""
          className="absolute top-32 right-[20%] w-7 h-7 opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <img
          src="/images/helloween/star-object.svg"
          alt=""
          className="absolute bottom-20 left-[25%] w-9 h-9 opacity-35 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <img
          src="/images/helloween/star-object.svg"
          alt=""
          className="absolute bottom-32 right-[15%] w-8 h-8 opacity-25 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <img
          src="/images/helloween/star-object.svg"
          alt=""
          className="absolute top-1/2 left-[10%] w-7 h-7 opacity-20 animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <img
          src="/images/helloween/star-object.svg"
          alt=""
          className="absolute top-1/3 right-[12%] w-7 h-7 opacity-30 animate-float"
          style={{ animationDelay: "2.5s" }}
        />
      </div>

      {/* Left shamrock */}
      <div className="hidden md:block flex-shrink-0 relative z-10">
        <div className="w-32 lg:w-40 h-32 lg:h-40 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <g transform="translate(50, 50)">
              <circle cx="-15" cy="-15" r="18" fill="#10b981" opacity="0.9" />
              <circle cx="15" cy="-15" r="18" fill="#059669" opacity="0.9" />
              <circle cx="0" cy="5" r="18" fill="#047857" opacity="0.9" />
              <path d="M 0 15 Q -3 25 -5 35" stroke="#065f46" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* Stats Card */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a120f] via-[#0c1411] to-[#0d1612] p-6 md:p-8 shadow-xl border border-emerald-700/30">
        {/* subtle glowing dots */}
        <div className="absolute top-8 left-12 w-2 h-2 bg-amber-300 rounded-full opacity-70 animate-pulse shadow-lg shadow-amber-400/50" />
        <div
          className="absolute top-16 right-20 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50 animate-pulse shadow-lg shadow-yellow-400/50"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-12 right-32 w-1 h-1 bg-amber-200 rounded-full opacity-60 animate-pulse shadow-lg shadow-amber-300/50"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-50 animate-pulse shadow-lg shadow-yellow-300/50"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-24 right-24 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse shadow-lg shadow-amber-400/50"
          style={{ animationDelay: "0.8s" }}
        />

        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Users Stat */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] mb-3 shadow-lg shadow-emerald-500/30">
              <Users className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-[family-name:var(--font-bebas)] text-white tracking-wide">
                993,881
              </div>
              <div className="text-sm md:text-base text-emerald-200 font-medium tracking-wide">Users</div>
            </div>
          </div>

          {/* Mystery Boxes Stat */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#059669] mb-3 shadow-lg shadow-emerald-500/30">
              <Package className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-4xl md:text-5xl font-[family-name:var(--font-bebas)] text-white tracking-wide">
                3,917,122
              </div>
              <div className="text-sm md:text-base text-emerald-200 font-medium tracking-wide">
                Mystery Boxes Opened
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
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

      {/* Right shamrock */}
      <div className="hidden md:block flex-shrink-0 relative z-10">
        <div className="w-24 lg:w-28 h-24 lg:h-28 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
            <g transform="translate(50, 50)">
              <circle cx="-15" cy="-15" r="18" fill="#10b981" opacity="0.9" />
              <circle cx="15" cy="-15" r="18" fill="#059669" opacity="0.9" />
              <circle cx="0" cy="5" r="18" fill="#047857" opacity="0.9" />
              <path d="M 0 15 Q -3 25 -5 35" stroke="#065f46" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}