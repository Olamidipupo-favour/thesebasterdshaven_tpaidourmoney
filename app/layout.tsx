import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SocketProvider } from "@/components/socket-provider"
import { RillaboxHeader } from "@/components/rillabox-header"
import { TawkWidget } from "@/components/tawk-widget"

export const metadata: Metadata = {
  title: "O Sortudo - Irish Gaming Platform",
  description: "Experience the luck of the Irish with mystery boxes, live drops, and exciting games!",
  generator: "v0.app",
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
        <Analytics />
        {/* Global Tawk.to chat widget */}
        <TawkWidget />
      </body>
    </html>
  )
}
