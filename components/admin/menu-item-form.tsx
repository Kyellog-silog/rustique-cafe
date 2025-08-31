"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload"
import { MenuAPI } from "@/lib/api/menu"
import type { MenuItem, MenuItemInput } from "@/lib/types/menu"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: string
  name: string
  color: string
}

interface MenuItemFormData {
  name: string
  description?: string
  price: string | number
  image_url?: string
  category: string
  category_id?: string
  is_available: boolean
}

interface MenuItemFormProps {
  item?: MenuItem | null
  onSuccess: () => void
  onCancel: () => void
}

export function MenuItemForm({ item, onSuccess, onCancel }: MenuItemFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [imageUploading, setImageUploading] = useState(false)
  const [formData, setFormData] = useState<MenuItemFormData>({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price?.toString() || "",
    image_url: item?.image_url || "",
    category: item?.category || "",
    category_id: item?.category_id || "",
    is_available: item?.is_available ?? true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // Load categories on component mount
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoadingCategories(true)
      const response = await fetch("/api/admin/categories")
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("Error loading categories:", error)
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive"
      })
    } finally {
      setLoadingCategories(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (imageUploading) {
      toast({
        title: "Please wait",
        description: "Image is still uploading. Please wait for it to complete.",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)

    try {
      // Convert string price to number for API
      const submitData = {
        ...formData,
        price: typeof formData.price === 'string' ? parseFloat(formData.price) || 0 : formData.price
      }
      
      if (item) {
        await MenuAPI.updateMenuItem(item.id, submitData)
        toast({
          title: "Success",
          description: "Menu item updated successfully",
        })
      } else {
        await MenuAPI.createMenuItem(submitData)
        toast({
          title: "Success",
          description: "Menu item created successfully",
        })
      }
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save menu item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof MenuItemInput, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
          <DialogDescription>
            {item ? "Update the details of your menu item." : "Add a new item to your menu."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter item description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={(value) => handleInputChange("category_id", value)}
                disabled={loadingCategories}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingCategories ? "Loading categories..." : "Select category"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-categories" disabled>
                      No categories available. Create categories first.
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {categories.length === 0 && !loadingCategories && (
                <p className="text-xs text-muted-foreground">
                  No categories found. Please create categories in the Categories section first.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              value={formData.image_url}
              onChange={(url) => handleInputChange("image_url", url)}
              onRemove={() => handleInputChange("image_url", "")}
              onUploadingChange={setImageUploading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_available"
              checked={formData.is_available}
              onCheckedChange={(checked) => handleInputChange("is_available", checked)}
            />
            <Label htmlFor="is_available">Available for customers</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || imageUploading || !formData.name || !formData.price || !formData.category_id}
            >
              {imageUploading ? "Uploading image..." : loading ? "Saving..." : item ? "Update Item" : "Create Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
