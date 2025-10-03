"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <img src="https://rillabox.com/logo/rillabox-logo.png" alt="O SORTUDO" className="h-8 w-auto" />
            </div>
          </div>

          {/* Legal Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">Legal</h2>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Shipping & Return Policy
              </Link>
              <Link href="/aml" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                AML Policy
              </Link>
            </div>
          </div>

          {/* Games Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">Games</h2>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mystery Boxes
              </Link>
              <Link href="/battles" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Battles
              </Link>
              <Link href="/crash" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Crash
              </Link>
              <Link href="/plinko" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Plinko
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">Help</h2>
            <div className="space-y-2">
              <Link href="/help/deposit" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                'How can I deposit on O Sortudo?'
              </Link>
              <Link href="/help/fairness" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                'How does Provable Fairness work?'
              </Link>
              <Link href="/help/shipping" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                'How does shipping work?'
              </Link>
              <Link href="/help/countries" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                'Which countries does O Sortudo ship to?'
              </Link>
            </div>
          </div>

          {/* Follow Us & Contact Section */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              {/* Follow Us */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/rillaboxofficial/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center hover:bg-muted/40 transition-colors">
                    <img src="https://rillabox.com/icons/instagram-filled.svg" alt="Instagram" className="w-4 h-4" />
                  </a>
                  <a href="https://www.facebook.com/people/RillaBox/100094306086732/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center hover:bg-muted/40 transition-colors">
                    <img src="https://rillabox.com/icons/facebook-filled.svg" alt="Facebook" className="w-4 h-4" />
                  </a>
                  <a href="https://t.me/+SfKiB6OCwzdmNmU0" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center hover:bg-muted/40 transition-colors">
                    <img src="https://rillabox.com/icons/telegram-filled.svg" alt="Telegram" className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com/RillaBox" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-muted/20 rounded-full flex items-center justify-center hover:bg-muted/40 transition-colors">
                    <img src="https://rillabox.com/icons/twitter-filled.svg" alt="Twitter" className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For any inquiries, contact us at support@rillabox.com. We're here to assist you!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              © 2025 O Sortudo. All Rights Reserved
            </p>
            <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
              O Sortudo is a brand name of TechNexus Ltd, Reg No: HE 449023, Having its registered address at 25 Voukourestiou Street, Neptune House, Limassol, 3045 Cyprus
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}