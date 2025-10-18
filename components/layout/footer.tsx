"use client"

import Link from "next/link"
import { Instagram, Facebook, MessageCircle, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-16 rounded-t-2xl bg-gradient-to-b from-[#0a1b14] via-[#0d241b] to-[#0a1b14] border-t border-[#1f6b4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo/OSORTUDO LOGO 1.png" alt="O Sortudo" className="w-32 h-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The ultimate gaming platform for skill-based games and real prizes
            </p>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">LEGAL</h2>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Shipping & Return Policy</Link>
              <Link href="/aml" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">AML Policy</Link>
            </div>
          </div>

          {/* Games */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">GAMES</h2>
            <div className="space-y-2">
              <Link href="/boxes" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Mystery Boxes</Link>
              <Link href="/battles" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Find the Prize</Link>
              <Link href="/crash" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Climb to the Top</Link>
              <Link href="/plinko" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Chicken Road</Link>
            </div>
          </div>

          {/* Help */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-foreground mb-4">HELP</h2>
            <div className="space-y-2">
              <Link href="/help/deposit" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">How can I deposit on O Sortudo?</Link>
              <Link href="/help/fairness" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">How does Provable Fairness work?</Link>
              <Link href="/help/shipping" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">How does shipping work?</Link>
              <Link href="/help/countries" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">Which countries does O Sortudo ship to?</Link>
            </div>
          </div>

          {/* Follow Us & Contact */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">FOLLOW US</h2>
                <div className="flex space-x-3">
                  <a href="https://www.instagram.com/osortudo/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center text-[#22c55e] shadow-inner hover:border-[#28da6a]">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com/osortudo" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center text-[#22c55e] shadow-inner hover:border-[#28da6a]">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://wa.me/+351964329237" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center text-[#22c55e] shadow-inner hover:border-[#28da6a]">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a href="https://www.facebook.com/osortudo/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-md bg-[#0f2a1f] border border-[#1f6b4a] flex items-center justify-center text-[#22c55e] shadow-inner hover:border-[#28da6a]">
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">CONTACT US</h2>
                <div className="space-y-1 text-sm">
                  <a href="mailto:support@osortudo.com" className="block text-[#22c55e] hover:underline">support@osortudo.com</a>
                  <a href="tel:+1234567890" className="block text-muted-foreground hover:text-foreground">+351 964 329 237</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#1f6b4a]/40 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 O Sortudo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}