"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Coffee, Cookie, Sandwich, Glasses as Glass, Utensils, Cake } from "lucide-react"
import { CategoryForm } from "./category-form"
import { DeleteConfirmDialog } from "./delete-confirm-dialog"

interface Category {
  id: string
  name: string
  description: string
  color: string
  icon: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

const iconMap = {
  Coffee: Coffee,
  Cookie: Cookie,
  Sandwich: Sandwich,
  Glass: Glass,
  Utensils: Utensils,
  Cake: Cake,
}

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      const data = await response.json()
      if (data.categories) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error("Error loading categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    try {
      if (editingCategory) {
        // Update existing category
        const response = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoryData),
        })

        if (response.ok) {
          await loadCategories()
        }
      } else {
        // Create new category
        const response = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...categoryData,
            display_order: categories.length,
          }),
        })

        if (response.ok) {
          await loadCategories()
        }
      }

      setShowForm(false)
      setEditingCategory(null)
    } catch (error) {
      console.error("Error saving category:", error)
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading categories...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            {categories.length} Categories
          </Badge>
        </div>
        <Button onClick={() => setShowForm(true)} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Coffee

          return (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: category.color }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge variant={category.is_active ? "default" : "secondary"} className="text-xs">
                        {category.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteCategory(category)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{category.description || "No description provided"}</p>
                <div className="mt-3 text-xs text-muted-foreground">Order: {category.display_order}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {categories.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Coffee className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
            <p className="text-muted-foreground mb-4">Create your first category to organize your menu items.</p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Category
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Category Form Dialog */}
      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => {
            setShowForm(false)
            setEditingCategory(null)
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteCategory && (
        <DeleteConfirmDialog
          item={deleteCategory}
          type="category"
          onSuccess={() => {
            loadCategories()
            setDeleteCategory(null)
          }}
          onCancel={() => setDeleteCategory(null)}
          onDelete={async (id) => {
            const response = await fetch(`/api/admin/categories/${id}`, {
              method: "DELETE",
            })
            if (!response.ok) {
              throw new Error("Failed to delete category")
            }
          }}
        />
      )}
    </div>
  )
}
