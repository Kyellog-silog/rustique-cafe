"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import type { Product } from "./product-card"

interface MenuCardProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
}

export function MenuCard({ product, onAddToCart }: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div
            className={`transition-all duration-300 ${
              isHovered ? "bg-black/60 backdrop-blur-sm rounded-lg p-4 -m-4" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-gray-200 text-sm mb-3 leading-relaxed">{product.description}</p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</span>

              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(product, 1)
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
