"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LiveDropsSidebar } from "@/components/live-drops-sidebar"
import { Footer } from "@/components/layout/footer"

interface OSortudoLayoutProps {
  children: React.ReactNode
}

export function OSortudoLayout({ children }: OSortudoLayoutProps) {
  // Start open on desktop, closed on mobile when explicitly toggled
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Navigation is rendered globally via RootLayout; header removed to avoid duplicates */}

      {/* Two-column layout with left Live Drops and right content */}
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - shared LiveDropsSidebar */}
        {sidebarOpen && (
          <div className={`bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out fixed inset-y-0 left-0 z-50 w-80 lg:static lg:h-screen lg:z-auto lg:transform-none`}>
            <LiveDropsSidebar />
            {/* Mobile close control inside sidebar */}
            <div className="p-3 border-t border-sidebar-border lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="w-full justify-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Hide
              </Button>
            </div>
          </div>
        )}

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Toggle arrow handle (desktop) */}
        <button
          type="button"
          aria-label={sidebarOpen ? "Collapse Live Drops" : "Expand Live Drops"}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`hidden lg:flex items-center justify-center fixed top-1/2 -translate-y-1/2 z-50 rounded-full border border-sidebar-border bg-card/90 hover:bg-card p-2 shadow transition ${sidebarOpen ? "left-80" : "left-2"}`}
        >
          {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Right column: main content and footer aligned to the right of sidebar */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}