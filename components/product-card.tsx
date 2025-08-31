"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  popular?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Smooth animation
    onAddToCart(product, quantity)
    setIsAdding(false)
    setQuantity(1)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.popular && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">Popular</Badge>
          )}
        </div>

        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-card-foreground text-lg">{product.name}</h3>
            <span className="text-lg font-bold text-accent">${product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground text-pretty">{product.description}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center gap-3">
        <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-8 w-8 p-0">
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={cn("flex-1 transition-all duration-300", isAdding && "scale-95")}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
