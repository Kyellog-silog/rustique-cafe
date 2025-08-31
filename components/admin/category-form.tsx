"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Cookie, Sandwich, Glasses as Glass, Utensils, Cake } from "lucide-react"

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  display_order: number
  is_active: boolean
}

interface CategoryFormProps {
  category?: Category | null
  onSave: (data: Partial<Category>) => void
  onCancel: () => void
}

const colorOptions = [
  { name: "Espresso", value: "#4b2e2a" },
  { name: "Mocha", value: "#c89f72" },
  { name: "Latte", value: "#d7bfae" },
  { name: "Coffee Brown", value: "#8B4513" },
  { name: "Orange", value: "#D2691E" },
  { name: "Sandy Brown", value: "#CD853F" },
  { name: "Steel Blue", value: "#4682B4" },
  { name: "Forest Green", value: "#228B22" },
]

const iconOptions = [
  { name: "Coffee", icon: Coffee, value: "Coffee" },
  { name: "Cookie", icon: Cookie, value: "Cookie" },
  { name: "Sandwich", icon: Sandwich, value: "Sandwich" },
  { name: "Glass", icon: Glass, value: "Glass" },
  { name: "Utensils", icon: Utensils, value: "Utensils" },
  { name: "Cake", icon: Cake, value: "Cake" },
]

export function CategoryForm({ category, onSave, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#4b2e2a",
    icon: "Coffee",
    is_active: true,
  })

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        is_active: category.is_active,
      })
    }
  }, [category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{category ? "Edit Category" : "Add New Category"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Coffee, Pastries"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this category"
                rows={3}
              />
            </div>

            <div>
              <Label>Color</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-12 h-12 rounded-lg border-2 ${
                      formData.color === color.value ? "border-primary" : "border-border"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setFormData({ ...formData, color: color.value })}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label>Icon</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {iconOptions.map((iconOption) => {
                  const IconComponent = iconOption.icon
                  return (
                    <button
                      key={iconOption.value}
                      type="button"
                      className={`p-3 rounded-lg border-2 flex items-center justify-center ${
                        formData.icon === iconOption.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setFormData({ ...formData, icon: iconOption.value })}
                    >
                      <IconComponent className="w-5 h-5" />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Active</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {category ? "Update" : "Create"} Category
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
