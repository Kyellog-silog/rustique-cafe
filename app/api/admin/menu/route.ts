import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import type { MenuItemInput } from "@/lib/types/menu"

// GET /api/admin/menu - Get all menu items for admin
export async function GET() {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

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
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching admin menu items:", error)
      return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
    }

    return NextResponse.json({ menuItems })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/admin/menu - Create new menu item
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: MenuItemInput = await request.json()

    // Validate required fields
    if (!body.name || !body.price || !body.category_id) {
      return NextResponse.json({ error: "Missing required fields: name, price, category_id" }, { status: 400 })
    }

    const { data: menuItem, error } = await supabase
      .from("menu_items")
      .insert({
        ...body,
        user_id: user.id,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating menu item:", error)
      return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
    }

    return NextResponse.json({ menuItem }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
