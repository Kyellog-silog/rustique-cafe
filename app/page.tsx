"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AlternatingSection } from "@/components/alternating-section"
import { Footer } from "@/components/footer"
import { CartSidebar, type CartItem } from "@/components/cart-sidebar"
import { NavigationLink } from "@/components/navigation-link"

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-cream">
      <Header cartItems={totalItems} onCartClick={() => setIsCartOpen(true)} />
      <NavigationLink />

      <main>
        <HeroSection />

        <div className="bg-cream">
          <AlternatingSection
            title="Coffee. Forward."
            content="We carefully source only specialty grade coffee beans from local roasters who observe the highest standards to ensure that each cup of coffee reaches its potential."
            subtitle="We are dedicated to constantly educating ourselves and making beverages that put our coffee at the forefront."
            imageUrl="/coffee-forward.jpg"
            imagePosition="right"
            backgroundColor="latte"
          />
        </div>

        <div className="bg-latte">
          <AlternatingSection
            title="Crafted with Passion"
            content="Every cup tells a story of dedication, from bean selection to the final pour. Our baristas are artisans who understand that great coffee is both science and art."
            subtitle="Experience the difference that passion and precision make in every sip."
            imageUrl="/barista-crafting-latte-art-in-rustic-coffee-shop.jpg"
            imagePosition="left"
            backgroundColor="cream"
          />
        </div>

        <div className="bg-cream">
          <AlternatingSection
            title="Community Rooted"
            content="More than just a coffee shop, we're a gathering place where stories are shared, connections are made, and the community comes together over exceptional coffee."
            subtitle="Join us in creating moments that matter, one cup at a time."
            imageUrl="/cozy-coffee-shop-interior-with-people-chatting.jpg"
            imagePosition="right"
            backgroundColor="latte"
          />
        </div>
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id: string, quantity: number) =>
          setCartItems(prev =>
            prev.map(item => (item.id === id ? { ...item, quantity } : item))
          )
        }
        onRemoveItem={(id: string) => setCartItems(prev => prev.filter(item => item.id !== id))}
        onClearCart={() => setCartItems([])}
      />
    </div>
  )
}
