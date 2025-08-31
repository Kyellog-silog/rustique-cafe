"use client"

import { useState, useMemo, useEffect } from "react"
import { Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartSidebar, type CartItem } from "@/components/cart-sidebar"
import { MenuGrid } from "@/components/menu-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "@/components/product-card"
import type { MenuItem } from "@/lib/types/menu"
import { MenuAPI } from "@/lib/api/menu"
import { useToast } from "@/hooks/use-toast"

function menuItemToProduct(item: MenuItem): Product & { category: string } {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    description: item.description || "",
    image: item.image_url || "/cafe-menu-item.png",
    category: item.categories?.name || "Uncategorized",
  }
}

export default function MenuPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [menuItems, setMenuItems] = useState<(Product & { category: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>(["All"])
  const { toast } = useToast()

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const menuData = await MenuAPI.getPublicMenuItems()
        const products = menuData.items.map(menuItemToProduct)
        setMenuItems(products)

        // Generate categories from the API response - only show categories that have items
        const categoryNames = ["All", ...menuData.categories.map(cat => cat.name)]
        setCategories(categoryNames)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load menu items",
          variant: "destructive",
        })
        // Fallback to empty array if API fails
        setMenuItems([])
      } finally {
        setLoading(false)
      }
    }

    loadMenuItems()
  }, [toast])

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, menuItems])

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)

      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      }

      return [...prev, { ...product, quantity }]
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          {/* Base gradient layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-mocha/15 via-latte/10 to-cream/20" />
          <div className="absolute inset-0 bg-gradient-to-tl from-espresso/8 via-transparent to-mocha/12" />

          {/* Coffee bean inspired circular patterns */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(ellipse 120px 60px at 20% 30%, rgba(200, 159, 114, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 100px 50px at 80% 20%, rgba(215, 191, 174, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse 140px 70px at 30% 80%, rgba(75, 46, 42, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 90px 45px at 70% 70%, rgba(200, 159, 114, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 110px 55px at 15% 60%, rgba(215, 191, 174, 0.09) 0%, transparent 50%)
              `,
            }}
          />

          {/* Geometric coffee-inspired patterns */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(30deg, transparent, transparent 80px, rgba(200, 159, 114, 0.03) 80px, rgba(200, 159, 114, 0.03) 160px),
                repeating-linear-gradient(-30deg, transparent, transparent 100px, rgba(215, 191, 174, 0.02) 100px, rgba(215, 191, 174, 0.02) 200px)
              `,
            }}
          />

          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(200, 159, 114, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 75% 75%, rgba(215, 191, 174, 0.04) 0%, transparent 40%),
                radial-gradient(circle at 50% 10%, rgba(75, 46, 42, 0.03) 0%, transparent 60%),
                radial-gradient(circle at 10% 90%, rgba(200, 159, 114, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 90% 40%, rgba(215, 191, 174, 0.03) 0%, transparent 45%)
              `,
            }}
          />
        </div>

        <div className="relative z-10">
          <Header cartItems={totalItems} onCartClick={() => setIsCartOpen(true)} />

          <main className="pt-8">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 relative">
                <div className="absolute inset-0 -mx-8 bg-gradient-to-r from-transparent via-cream/30 to-transparent rounded-3xl blur-3xl" />
                <div className="absolute inset-0 -mx-4 bg-gradient-to-b from-mocha/10 via-transparent to-latte/15 rounded-2xl" />
                <div className="relative z-10 py-8">
                  <h1 className="font-serif text-5xl md:text-7xl font-bold text-espresso mb-6 tracking-tight">
                    Our Menu
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                    Discover our carefully curated selection of premium coffees, artisanal pastries, and seasonal specialties.
                  </p>
                </div>
              </div>

              <div className="text-center py-12">
                <div className="text-lg text-muted-foreground">Loading menu...</div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        {/* Base gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-mocha/15 via-latte/10 to-cream/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-espresso/8 via-transparent to-mocha/12" />

        {/* Coffee bean inspired circular patterns */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 120px 60px at 20% 30%, rgba(200, 159, 114, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 100px 50px at 80% 20%, rgba(215, 191, 174, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 140px 70px at 30% 80%, rgba(75, 46, 42, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 90px 45px at 70% 70%, rgba(200, 159, 114, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 110px 55px at 15% 60%, rgba(215, 191, 174, 0.09) 0%, transparent 50%)
            `,
          }}
        />

        {/* Geometric coffee-inspired patterns */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(30deg, transparent, transparent 80px, rgba(200, 159, 114, 0.03) 80px, rgba(200, 159, 114, 0.03) 160px),
              repeating-linear-gradient(-30deg, transparent, transparent 100px, rgba(215, 191, 174, 0.02) 100px, rgba(215, 191, 174, 0.02) 200px)
            `,
          }}
        />

        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(200, 159, 114, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 75% 75%, rgba(215, 191, 174, 0.04) 0%, transparent 40%),
              radial-gradient(circle at 50% 10%, rgba(75, 46, 42, 0.03) 0%, transparent 60%),
              radial-gradient(circle at 10% 90%, rgba(200, 159, 114, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 90% 40%, rgba(215, 191, 174, 0.03) 0%, transparent 45%)
            `,
          }}
        />
      </div>

      <div className="relative z-10">
        <Header cartItems={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <main className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 -mx-8 bg-gradient-to-r from-transparent via-cream/30 to-transparent rounded-3xl blur-3xl" />
            <div className="absolute inset-0 -mx-4 bg-gradient-to-b from-mocha/10 via-transparent to-latte/15 rounded-2xl" />
            <div className="relative z-10 py-8">
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-espresso mb-6 tracking-tight">
                Our Menu
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Discover our carefully curated selection of premium coffees, artisanal pastries, and seasonal specialties.
              </p>
            </div>
          </div>

          <div className="mb-8 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category ? "bg-accent text-accent-foreground" : "bg-card hover:bg-accent/50"
                  } transition-colors`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
            </div>
          </div>

          {menuItems.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">Menu Coming Soon</h3>
              <p className="text-muted-foreground">We're updating our menu. Please check back later!</p>
            </div>
          ) : (
            <MenuGrid onAddToCart={handleAddToCart} filteredItems={filteredItems} />
          )}
        </div>
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
      </div>
    </div>
  );
}
