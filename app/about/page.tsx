"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSidebar, type CartItem } from "@/components/cart-sidebar"
import { StorySection } from "@/components/story-section"

export default function AboutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-cream relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso/5 via-mocha/8 to-latte/10" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at top left, rgba(75, 46, 42, 0.08) 0%, transparent 50%),
                           radial-gradient(ellipse at bottom right, rgba(200, 159, 114, 0.12) 0%, transparent 50%),
                           radial-gradient(circle at center, rgba(215, 191, 174, 0.06) 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(75, 46, 42, 0.02) 60deg, transparent 120deg),
                           repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(200, 159, 114, 0.03) 80px, rgba(200, 159, 114, 0.03) 160px)`,
          }}
        />
        {/* Coffee bean pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(ellipse 3px 6px at 20px 30px, rgba(75, 46, 42, 0.1), transparent),
                           radial-gradient(ellipse 3px 6px at 80px 90px, rgba(75, 46, 42, 0.08), transparent),
                           radial-gradient(ellipse 3px 6px at 140px 50px, rgba(75, 46, 42, 0.06), transparent),
                           radial-gradient(ellipse 3px 6px at 200px 120px, rgba(75, 46, 42, 0.1), transparent)`,
            backgroundSize: "240px 160px",
          }}
        />
      </div>

      <div className="relative z-10">
        <Header cartItems={totalItems} onCartClick={() => setIsCartOpen(true)} />

        <main className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 py-16 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-espresso/8 via-mocha/5 to-transparent rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-latte/10 to-transparent rounded-3xl" />
              <div className="absolute -inset-4 bg-gradient-to-br from-mocha/5 to-espresso/5 rounded-[2rem] blur-2xl" />

              <div className="relative z-10">
                <h1 className="font-serif text-5xl md:text-7xl font-bold text-espresso mb-6 tracking-tight">
                  Our Story
                </h1>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px bg-mocha flex-1 max-w-16" />
                  <div className="w-2 h-2 bg-mocha rounded-full" />
                  <div className="h-px bg-mocha flex-1 max-w-16" />
                </div>
                <p className="text-xl text-espresso/80 max-w-3xl mx-auto leading-relaxed font-light">
                  From humble beginnings to a community cornerstone, discover the passion and dedication behind{" "}
                  <span className="text-mocha font-medium">Rustique Cafe</span>.
                </p>
              </div>
            </div>

            <StorySection />
          </div>
        </main>

        <Footer />

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={() => {}}
          onRemoveItem={() => {}}
          onClearCart={() => setCartItems([])}
        />
      </div>
    </div>
  )
}
