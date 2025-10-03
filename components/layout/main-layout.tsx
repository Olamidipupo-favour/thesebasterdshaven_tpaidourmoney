"use client"

import { Navigation } from "@/components/navigation"
import { LiveDropsSidebar } from "@/components/live-drops-sidebar"
import { Footer } from "@/components/layout/footer"
import { useState } from "react"

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Main Content Area - RillaBox Exact Layout */}
      <div className="flex">
        {/* Left Sidebar - RillaBox Style */}
        {showSidebar && (
          <div className="hidden xl:block w-80 flex-shrink-0 bg-sidebar border-r border-sidebar-border">
            <LiveDropsSidebar />
          </div>
        )}
        
        {/* Main Content - Full width on mobile, with sidebar on desktop */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Sidebar Overlay */}
      {showSidebar && sidebarOpen && (
        <div className="xl:hidden fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-80 bg-sidebar border-r border-sidebar-border">
            <LiveDropsSidebar />
          </div>
        </div>
      )}
    </div>
  )
}
