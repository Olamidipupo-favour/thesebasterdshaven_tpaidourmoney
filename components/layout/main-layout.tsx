"use client"

import { Footer } from "@/components/layout/footer"

interface MainLayoutProps {
  children: React.ReactNode
  showSidebar?: boolean
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <main className="flex-1">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
