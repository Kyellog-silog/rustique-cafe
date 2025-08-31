import type { MenuItem, MenuItemInput } from "@/lib/types/menu"

// Client-side API functions for menu operations
export class MenuAPI {
  // Get all available menu items with categories (public)
  static async getPublicMenuItems(): Promise<{ items: MenuItem[], categories: { id: string, name: string, color: string, items: MenuItem[] }[] }> {
    const response = await fetch("/api/menu")
    if (!response.ok) {
      throw new Error("Failed to fetch menu items")
    }
    const data = await response.json()
    return data
  }

  // Get all menu items for admin
  static async getAdminMenuItems(): Promise<MenuItem[]> {
    const response = await fetch("/api/admin/menu")
    if (!response.ok) {
      throw new Error("Failed to fetch admin menu items")
    }
    const data = await response.json()
    return data.menuItems
  }

  // Create new menu item
  static async createMenuItem(item: MenuItemInput): Promise<MenuItem> {
    const response = await fetch("/api/admin/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create menu item")
    }
    const data = await response.json()
    return data.menuItem
  }

  // Update menu item
  static async updateMenuItem(id: string, item: Partial<MenuItemInput>): Promise<MenuItem> {
    const response = await fetch(`/api/admin/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update menu item")
    }
    const data = await response.json()
    return data.menuItem
  }

  // Delete menu item
  static async deleteMenuItem(id: string): Promise<void> {
    const response = await fetch(`/api/admin/menu/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete menu item")
    }
  }
}
