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
      {/* Navigation is rendered globally via RootLayout */}
      
      {/* Main Content Area - RillaBox Exact Layout */}
      <div className="flex">
        {/* Left Sidebar - RillaBox Style */}
        {showSidebar && (
          <div className="hidden xl:block w-80 flex-shrink-0 bg-sidebar border-r border-sidebar-border">
            <LiveDropsSidebar />
          </div>
        )}
        
        {/* Right Column: Main Content + Footer (footer aligned to the right of sidebar) */}
        <div className="flex-1 min-h-screen flex flex-col">
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
          {/* Footer appears only under the main content column */}
          <Footer />
        </div>
      </div>

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
