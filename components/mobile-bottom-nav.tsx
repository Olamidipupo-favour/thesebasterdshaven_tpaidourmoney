"use client"

import Link from "next/link"
import { Gamepad2, Boxes } from "lucide-react"
import { useCallback } from "react"

export function MobileBottomNav() {
  const openGamesMenu = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-games-menu"))
    }
  }, [])
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          <button onClick={openGamesMenu} className="flex flex-col items-center gap-1 text-xs py-1 w-full">
            <Gamepad2 className="w-5 h-5" />
            <span>Games</span>
          </button>
          <Link href="/boxes" className="flex flex-col items-center gap-1 text-xs py-1">
            <Boxes className="w-5 h-5" />
            <span>Boxes</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}