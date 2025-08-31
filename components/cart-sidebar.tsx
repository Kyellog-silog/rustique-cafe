"use client"

import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import type { Product } from "./product-card"
import { CheckoutForm } from "./checkout-form"
import { OrderConfirmation } from "./order-confirmation"
import { useState } from "react"

export interface CartItem extends Product {
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export function CartSidebar({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onClearCart }: CartSidebarProps) {
  const [currentView, setCurrentView] = useState<"cart" | "checkout" | "confirmation">("cart")
  const [orderId, setOrderId] = useState<string>("")

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleProceedToCheckout = () => {
    setCurrentView("checkout")
  }

  const handleBackToCart = () => {
    setCurrentView("cart")
  }

  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId)
    setCurrentView("confirmation")
    onClearCart()
  }

  const handleNewOrder = () => {
    setCurrentView("cart")
    setOrderId("")
    onClose()
  }

  const handleClose = () => {
    setCurrentView("cart")
    setOrderId("")
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {currentView === "cart" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Your Cart</h2>
                {itemCount > 0 && <Badge variant="secondary">{itemCount}</Badge>}
              </div>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-card rounded-lg border border-border">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-card-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-muted rounded p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-medium text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.id)}
                              className="text-xs text-muted-foreground hover:text-destructive p-0 h-auto"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-accent">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleClose}>
                  Continue Shopping
                </Button>
              </div>
            )}
          </>
        )}

        {currentView === "checkout" && (
          <div className="flex-1 overflow-y-auto p-4">
            <CheckoutForm items={items} onBack={handleBackToCart} onOrderComplete={handleOrderComplete} />
          </div>
        )}

        {currentView === "confirmation" && (
          <div className="flex-1 overflow-y-auto p-4">
            <OrderConfirmation orderId={orderId} onNewOrder={handleNewOrder} />
          </div>
        )}
      </div>
    </>
  )
}
