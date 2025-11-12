import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SocketProvider } from "@/components/socket-provider"
import { RillaboxHeader } from "@/components/rillabox-header"
import { TawkWidget } from "@/components/tawk-widget"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"

export const metadata: Metadata = {
  title: "O Sortudo - Irish Gaming Platform",
  description: "Experience the luck of the Irish with mystery boxes, live drops, and exciting games!",
  generator: "v0.app",
}

// Ensure iOS safe area is handled and content can extend to the edges
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased overflow-x-hidden`}>
        <SocketProvider>
          <RillaboxHeader />
          <Suspense fallback={null}>{children}</Suspense>
        </SocketProvider>
        {/* Mobile bottom navigation */}
        <MobileBottomNav />
        <Analytics />
        {/* Global Tawk.to chat widget */}
        <TawkWidget />
      </body>
    </html>
  )
}
