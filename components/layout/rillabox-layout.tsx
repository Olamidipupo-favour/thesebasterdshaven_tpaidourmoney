"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { LiveDropsSidebar } from "@/components/live-drops-sidebar"
import { Footer } from "@/components/layout/footer"

interface OSortudoLayoutProps {
  children: React.ReactNode
}

export function OSortudoLayout({ children }: OSortudoLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Navigation is rendered globally via RootLayout; header removed to avoid duplicates */}

      {/* Two-column layout with left Live Drops and right content */}
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - shared LiveDropsSidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 lg:h-screen lg:overflow-hidden`}>
          <LiveDropsSidebar />
          <div className="p-3 border-t border-sidebar-border lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="w-full justify-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

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