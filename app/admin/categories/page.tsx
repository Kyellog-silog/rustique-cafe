import { CategoryManagement } from "@/components/admin/category-management"

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Category Management</h1>
        <p className="text-muted-foreground mt-2">
          Organize your menu items with custom categories, colors, and icons.
        </p>
      </div>
      <CategoryManagement />
    </div>
  )
}
