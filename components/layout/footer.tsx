"use client"

import Link from "next/link"
import { Instagram, Facebook, MessageCircle, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-emerald-950/50 border-t border-emerald-800/50 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍀</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sortudo</h1>
                <p className="text-xs text-emerald-400">
                  The ultimate gaming platform for skill-based games and real prizes
                </p>
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-white mb-4 uppercase">Legal</h2>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/shipping"
                className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                Shipping & Return Policy
              </Link>
              <Link href="/aml" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                AML Policy
              </Link>
            </div>
          </div>

          {/* Games Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-white mb-4 uppercase">Games</h2>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                Mystery Boxes
              </Link>
              <Link href="/battles" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                Battles
              </Link>
              <Link href="/crash" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                Crash
              </Link>
              <Link href="/plinko" className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors">
                Plinko
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold text-white mb-4 uppercase">Help</h2>
            <div className="space-y-2">
              <Link
                href="/help/deposit"
                className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                How can I deposit on RillaBox?
              </Link>
              <Link
                href="/help/fairness"
                className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                How does Provable Fairness work?
              </Link>
              <Link
                href="/help/shipping"
                className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                How does shipping work?
              </Link>
              <Link
                href="/help/countries"
                className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                Which countries does RillaBox ship to?
              </Link>
            </div>
          </div>

          {/* Follow Us & Contact Section */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              {/* Follow Us */}
              <div>
                <h2 className="text-lg font-bold text-white mb-4 uppercase">Follow Us</h2>
                <div className="flex space-x-3">
                  <a
                    href="https://www.instagram.com/osortudo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-emerald-800/50 rounded-full flex items-center justify-center hover:bg-emerald-700/50 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-emerald-300" />
                  </a>
                  <a
                    href="https://www.facebook.com/osortudo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-emerald-800/50 rounded-full flex items-center justify-center hover:bg-emerald-700/50 transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-emerald-300" />
                  </a>
                  <a
                    href="https://t.me/osortudo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-emerald-800/50 rounded-full flex items-center justify-center hover:bg-emerald-700/50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-300" />
                  </a>
                  <a
                    href="https://twitter.com/osortudo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-emerald-800/50 rounded-full flex items-center justify-center hover:bg-emerald-700/50 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-emerald-300" />
                  </a>
                </div>
              </div>

              {/* Contact Us */}
              <div>
                <h2 className="text-lg font-bold text-white mb-4 uppercase">Contact Us</h2>
                <div className="space-y-2">
                  <a
                    href="mailto:support@osortudo.com"
                    className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                  >
                    support@osortudo.com
                  </a>
                  <a
                    href="tel:+12345678890"
                    className="block text-sm text-emerald-300 hover:text-emerald-200 transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-emerald-800/50 mt-8 pt-8 text-center">
          <p className="text-sm text-emerald-400">© 2025 O Sortudo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
