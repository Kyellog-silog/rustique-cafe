"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ShoppingCart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  cartItems: number
  onCartClick: () => void
}

export function Header({ cartItems, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"

  useEffect(() => {
    // ✅ Always listen for scroll, even on other pages
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isHomePage
          ? isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border"
            : "bg-transparent border-transparent"
          : "bg-background border-border" // ✅ Always solid on other pages
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ✅ Logo behavior:
              - Home page → white at top, dark when scrolled
              - Other pages → always dark */}
          <Logo isScrolled={isHomePage ? isScrolled : true} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors font-medium pb-1",
                    pathname === item.href && "text-primary",
                    isHomePage
                      ? isScrolled
                        ? "text-foreground hover:text-primary"
                        : "text-white hover:text-mocha drop-shadow-sm"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
                {pathname === item.href && (
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-300",
                      isHomePage
                        ? isScrolled
                          ? "bg-mocha"
                          : "bg-white"
                        : "bg-mocha"
                    )}
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className={cn(
                "relative transition-all",
                isHomePage
                  ? isScrolled
                    ? "bg-transparent border-border text-foreground hover:bg-accent"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  : "bg-transparent border-border text-foreground hover:bg-accent"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItems > 0 && (
                <Badge
                  className={cn(
                    "absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 transition-colors",
                    isHomePage
                      ? isScrolled
                        ? "bg-accent text-accent-foreground"
                        : "bg-mocha text-white"
                      : "bg-accent text-accent-foreground"
                  )}
                >
                  {cartItems}
                </Badge>
              )}
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "md:hidden transition-colors",
                isHomePage
                  ? isScrolled
                    ? "text-foreground hover:bg-accent"
                    : "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-accent"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <nav
          className={cn(
            "md:hidden mt-4 pb-4 border-t border-border transition-all duration-300",
            isMenuOpen ? "block" : "hidden",
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-foreground hover:text-primary transition-colors",
                  pathname === item.href && "text-primary font-medium",
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
