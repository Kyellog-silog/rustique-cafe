"use client"

import { MenuCard } from "./menu-card"
import type { Product } from "./product-card"

interface MenuGridProps {
  onAddToCart: (product: Product, quantity: number) => void
  filteredItems?: (Product & { category: string })[]
}

export function MenuGrid({ onAddToCart, filteredItems = [] }: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredItems.map((item) => (
        <MenuCard key={item.id} product={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  )
}
