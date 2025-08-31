"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Package, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MenuAPI } from "@/lib/api/menu"
import type { MenuItem } from "@/lib/types/menu"
import { MenuItemForm } from "./menu-item-form"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"
import { useToast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = async () => {
    try {
      const items = await MenuAPI.getAdminMenuItems()
      setMenuItems(items)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load menu items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateItem = () => {
    setEditingItem(null)
    setShowForm(true)
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setShowForm(true)
  }

  const handleDeleteItem = (item: MenuItem) => {
    setDeletingItem(item)
  }

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await MenuAPI.updateMenuItem(item.id, {
        is_available: !item.is_available,
      })
      await loadMenuItems()
      toast({
        title: "Success",
        description: `Item ${item.is_available ? "hidden" : "made available"}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item availability",
        variant: "destructive",
      })
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingItem(null)
    loadMenuItems()
  }

  const handleDeleteSuccess = () => {
    setDeletingItem(null)
    loadMenuItems()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-lg text-muted-foreground">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Menu Management</h1>
          <p className="text-muted-foreground">Manage your cafe's menu items and availability</p>
        </div>
        <Button onClick={handleCreateItem} size="lg" className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{menuItems.length}</div>
            <p className="text-xs text-muted-foreground">All menu items</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {menuItems.filter((item) => item.is_available).length}
            </div>
            <p className="text-xs text-muted-foreground">Visible to customers</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hidden</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {menuItems.filter((item) => !item.is_available).length}
            </div>
            <p className="text-xs text-muted-foreground">Not visible to customers</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              $
              {menuItems.length > 0
                ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2)
                : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Average item price</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleAvailability(item)}
                    className="h-8 w-8 p-0 hover:bg-accent"
                  >
                    {item.is_available ? (
                      <Eye className="w-4 h-4 text-green-600" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditItem(item)}
                    className="h-8 w-8 p-0 hover:bg-accent"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {item.image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={item.is_available ? "default" : "secondary"}
                      className={item.is_available ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {item.is_available ? "Available" : "Hidden"}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {menuItems.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No menu items yet</h3>
                <p className="text-muted-foreground max-w-sm">
                  Get started by adding your first menu item to showcase your delicious offerings
                </p>
              </div>
              <Button onClick={handleCreateItem} size="lg" className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Menu Item
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Modal */}
      {showForm && (
        <MenuItemForm
          item={editingItem}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingItem(null)
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deletingItem && (
        <DeleteConfirmDialog
          item={deletingItem}
          onSuccess={handleDeleteSuccess}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  )
}
