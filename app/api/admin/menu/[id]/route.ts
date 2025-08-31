import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"
import type { MenuItemInput } from "@/lib/types/menu"

// PUT /api/admin/menu/[id] - Update menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const body: Partial<MenuItemInput> = await request.json()
    const { id } = await params

    // Validate ID
    if (!id) {
      return NextResponse.json({ error: "Menu item ID is required" }, { status: 400 })
    }

    const { data: menuItem, error } = await supabase
      .from("menu_items")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id) // Ensure user can only update their own items
      .select()
      .single()

    if (error) {
      console.error("Error updating menu item:", error)
      return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
    }

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json({ menuItem })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE /api/admin/menu/[id] - Delete menu item
export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    // Validate ID
    if (!id) {
      return NextResponse.json({ error: "Menu item ID is required" }, { status: 400 })
    }

    const { error } = await supabase.from("menu_items").delete().eq("id", id).eq("user_id", user.id) // Ensure user can only delete their own items

    if (error) {
      console.error("Error deleting menu item:", error)
      return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
    }

    return NextResponse.json({ message: "Menu item deleted successfully" })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
