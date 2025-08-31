import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// GET /api/menu - Public endpoint to get all available menu items
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: menuItems, error } = await supabase
      .from("menu_items")
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .eq("is_available", true)
      .not("category_id", "is", null)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Group items by category and create category list with item counts
    const categoriesMap = new Map<string, {
      id: string
      name: string
      color: string
      items: any[]
    }>()

    menuItems.forEach((item: any) => {
      if (item.categories) {
        const categoryId = item.categories.id
        if (!categoriesMap.has(categoryId)) {
          categoriesMap.set(categoryId, {
            id: item.categories.id,
            name: item.categories.name,
            color: item.categories.color,
            items: []
          })
        }
        categoriesMap.get(categoryId)?.items.push(item)
      }
    })

    // Convert map to array for easier frontend handling
    const categories = Array.from(categoriesMap.values())

    return NextResponse.json({ 
      items: menuItems,
      categories: categories
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
