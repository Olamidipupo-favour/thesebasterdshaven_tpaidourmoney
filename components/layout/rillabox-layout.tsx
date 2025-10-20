"use client"

import { useEffect, useState } from "react"
import { Footer } from "@/components/layout/footer"
import { LiveDropsTopbar } from "@/components/live-drops-topbar"

interface OSortudoLayoutProps {
  children: React.ReactNode
}

export function OSortudoLayout({ children }: OSortudoLayoutProps) {

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Navigation is rendered globally via RootLayout; header removed to avoid duplicates */}

      {/* Single-column layout with top Live Drops bar and main content */}
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
              <LiveDropsTopbar />
              <div className="mt-4">
                {children}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}