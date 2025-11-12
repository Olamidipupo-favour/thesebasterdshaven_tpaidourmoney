"use client"

import Link from "next/link"
import { Gamepad2, Boxes, Trophy } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function MobileBottomNav() {
  const pathname = usePathname()
  const [gamesActive, setGamesActive] = useState(false)

  const openGamesMenu = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-games-menu"))
      setGamesActive(true)
    }
  }, [])
  const closeGamesMenu = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("close-games-menu"))
      setGamesActive(false)
    }
  }, [])

  // Keep Games tab highlighted while overlay is open
  useEffect(() => {
    const onOpen = () => setGamesActive(true)
    const onClose = () => setGamesActive(false)
    window.addEventListener("open-games-menu", onOpen as EventListener)
    window.addEventListener("close-games-menu", onClose as EventListener)
    return () => {
      window.removeEventListener("open-games-menu", onOpen as EventListener)
      window.removeEventListener("close-games-menu", onClose as EventListener)
    }
  }, [])

  // When the route changes (e.g., navigating to Prizes or Boxes),
  // clear the Games active highlight so only the current tab is green.
  useEffect(() => {
    setGamesActive(false)
  }, [pathname])

  const isBoxesActive = pathname?.startsWith("/boxes")
  const isPrizesActive = pathname === "/weekly-race" || pathname?.startsWith("/weekly-race")
  const showGamesActive = gamesActive && !isPrizesActive && !isBoxesActive

  // Keep bottom nav always visible even when Games overlay is open
  const hideNav = false

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-[100] xl:hidden bg-card border-t border-border`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-3 gap-2 py-2 pb-[env(safe-area-inset-bottom)]">
          <button onClick={openGamesMenu} className={`flex flex-col items-center gap-1 text-xs py-1 w-full ${showGamesActive ? 'text-[#22c55e]' : ''}`} aria-current={showGamesActive ? 'page' : undefined}>
            <Gamepad2 className={`w-5 h-5 ${showGamesActive ? 'text-[#22c55e]' : ''}`} />
            <span className={`${showGamesActive ? 'text-[#22c55e]' : ''}`}>Games</span>
          </button>
          <Link href="/weekly-race" className={`flex flex-col items-center gap-1 text-xs py-1 ${isPrizesActive ? 'text-[#22c55e]' : ''}`} onClick={closeGamesMenu} aria-current={isPrizesActive ? 'page' : undefined}>
            <Trophy className={`w-5 h-5 ${isPrizesActive ? 'text-[#22c55e]' : ''}`} />
            <span className={`${isPrizesActive ? 'text-[#22c55e]' : ''}`}>Prizes</span>
          </Link>
          <Link href="/boxes" className={`flex flex-col items-center gap-1 text-xs py-1 ${isBoxesActive ? 'text-[#22c55e]' : ''}`} onClick={closeGamesMenu} aria-current={isBoxesActive ? 'page' : undefined}>
            <Boxes className={`w-5 h-5 ${isBoxesActive ? 'text-[#22c55e]' : ''}`} />
            <span className={`${isBoxesActive ? 'text-[#22c55e]' : ''}`}>Boxes</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}