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
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-[#22c55e]" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground">Payment Methods</h2>
          </div>

          {/* Payment Methods Grid styled to match the green card tiles */}
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center shadow-inner hover:border-[#28da6a] hover:bg-[#123323] transition-colors"
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain brightness-110 contrast-110"
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
