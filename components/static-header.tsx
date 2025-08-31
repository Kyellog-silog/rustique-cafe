"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ShoppingCart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface StaticHeaderProps {
  cartItems: number
  onCartClick: () => void
}

export function StaticHeader({ cartItems, onCartClick }: StaticHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-espresso/95 backdrop-blur supports-[backdrop-filter]:bg-espresso/90 border-b border-espresso">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo isScrolled={true} />

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors font-medium text-cream hover:text-white pb-1",
                    pathname === item.href && "text-white",
                  )}
                >
                  {item.label}
                </Link>
                {pathname === item.href && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-mocha" />}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative bg-transparent border-cream text-cream hover:bg-mocha hover:text-white hover:border-mocha"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-mocha text-white">
                  {cartItems}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-cream hover:bg-mocha hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <nav
          className={cn(
            "md:hidden mt-4 pb-4 border-t border-cream/30 transition-all duration-300",
            isMenuOpen ? "block" : "hidden",
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-cream hover:text-white transition-colors",
                  pathname === item.href && "text-white font-medium",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
