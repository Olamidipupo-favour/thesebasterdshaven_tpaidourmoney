"use client"

import { Card } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

const paymentMethods = [
  { name: "Visa", logo: "/payment-logos/visa.png" },
  { name: "Master Card", logo: "/payment-logos/mastercard.png" },
  { name: "Skirlls", logo: "/payment-logos/skirlls.png" },
  { name: "Google Pay", logo: "/payment-logos/google-pay.png" },
  { name: "Tether", logo: "/payment-logos/tether.png" },
  { name: "Bitcoin", logo: "/payment-logos/bitcoin.png" },
  { name: "Ethereum", logo: "/payment-logos/ethereum.png" },
  { name: "Solana", logo: "/payment-logos/solana.png" }
]

export function PaymentMethodsSection() {
  return (
    <section className="mb-8 md:mb-12">
      <Card className="bg-card border-border overflow-hidden">
        <div className="px-4 py-5 md:px-8 md:py-7">
          {/* Header aligned like screenshot: icon + label on one line */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-5 mx-auto md:mx-0">
            <div className="w-10 h-10 md:w-8 md:h-8 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center">
              <CreditCard className="w-6 h-6 md:w-4 md:h-4 text-[#22c55e]" />
            </div>
            <h2 className="text-2xl md:text-xl font-semibold text-foreground text-center md:text-left">Payment Methods</h2>
          </div>
          {/* Mobile (<= md) – compact 4x2 layout with reduced logo size */}
          <div className="md:hidden">
            <div className="grid grid-cols-4 gap-2">
              {paymentMethods.slice(0, 4).map((method) => (
                <div key={method.name} className="rounded-md border border-[#1f6b4a] bg-[#0f2a1f] px-2 py-2 flex items-center justify-center">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-7 h-7 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {paymentMethods.slice(4).map((method) => (
                <div key={method.name} className="rounded-md border border-[#1f6b4a] bg-[#0f2a1f] px-2 py-2 flex items-center justify-center">
                  <img
                    src={method.logo}
                    alt={method.name}
                    className="w-7 h-7 object-contain"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop (>= md) – retain existing grid */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="w-14 h-14 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner hover:border-[#28da6a] hover:bg-[#123323] transition-colors"
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="w-10 h-10 object-contain brightness-110 contrast-110"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.svg" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  )
}
