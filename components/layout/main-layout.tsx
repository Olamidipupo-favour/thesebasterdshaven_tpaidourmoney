"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LiveDropsSidebar } from "@/components/live-drops-sidebar"
import { Footer } from "@/components/layout/footer"

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  // Sidebar starts open on desktop for quick access
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar - desktop */}
        {showSidebar && sidebarOpen && (
          <div className="hidden xl:block w-80 h-screen overflow-hidden flex-shrink-0 bg-sidebar border-r border-sidebar-border">
            <LiveDropsSidebar />
          </div>
        )}

        {/* Mobile Sidebar overlay */}
        {showSidebar && sidebarOpen && (
          <div className="xl:hidden fixed inset-y-0 left-0 z-50 w-80 bg-sidebar border-r border-sidebar-border">
            <LiveDropsSidebar />
            <div className="p-3 border-t border-sidebar-border">
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

        {/* Mobile overlay background */}
        {showSidebar && sidebarOpen && (
          <div
            className="xl:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Toggle arrow handle (desktop) */}
        {showSidebar && (
          <button
            type="button"
            aria-label={sidebarOpen ? "Collapse Live Drops" : "Expand Live Drops"}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`hidden xl:flex items-center justify-center fixed top-1/2 -translate-y-1/2 z-50 rounded-full border border-sidebar-border bg-card/90 hover:bg-card p-2 shadow transition ${sidebarOpen ? "left-80" : "left-2"}`}
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}

        {/* Right column: main content and footer */}
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
