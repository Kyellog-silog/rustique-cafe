"use client"

import { useState } from "react"
import { ProductCard, type Product } from "./product-card"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const categories = ["All", "Coffee", "Pastries", "Merchandise"]

const products: Product[] = [
  {
    id: "1",
    name: "Signature Espresso Blend",
    description: "Rich, full-bodied espresso with notes of dark chocolate and caramel",
    price: 4.5,
    image: "/espresso-coffee-cup-rustic-wooden-table.png",
    category: "Coffee",
    popular: true,
  },
  {
    id: "2",
    name: "Artisan Croissant",
    description: "Buttery, flaky croissant baked fresh daily with French butter",
    price: 3.25,
    image: "/golden-croissant-rustic-bakery-display.png",
    category: "Pastries",
  },
  {
    id: "3",
    name: "Cold Brew Coffee",
    description: "Smooth, refreshing cold brew steeped for 12 hours",
    price: 4.0,
    image: "/cold-brew-coffee-glass-ice-rustic.png",
    category: "Coffee",
    popular: true,
  },
  {
    id: "4",
    name: "Rustic Blend Coffee Beans",
    description: "Take home our signature blend - 12oz bag of freshly roasted beans",
    price: 16.99,
    image: "/coffee-beans-bag-rustic-packaging.png",
    category: "Merchandise",
  },
  {
    id: "5",
    name: "Cinnamon Roll",
    description: "Warm, gooey cinnamon roll with cream cheese glaze",
    price: 4.75,
    image: "/cinnamon-roll-glaze-rustic-plate.png",
    category: "Pastries",
  },
  {
    id: "6",
    name: "Cappuccino",
    description: "Perfect balance of espresso, steamed milk, and velvety foam",
    price: 4.25,
    image: "/cappuccino-foam-art-rustic-cup.png",
    category: "Coffee",
  },
]

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void
}

export function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProducts =
    activeCategory === "All" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <section id="menu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-balance">Our Menu</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover our carefully curated selection of premium coffees, fresh pastries, and artisanal merchandise.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={cn("transition-all duration-300", activeCategory === category && "shadow-md")}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
