import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const { customer_name, customer_email, customer_phone, order_type, notes, items } = body

    // Calculate total amount
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          customer_email,
          customer_phone,
          total_amount: totalAmount,
          order_type: order_type || "dine-in",
          notes,
          status: "confirmed",
          user_id: user.id
        },
      ])
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Error creating order items:", itemsError)
      // Try to delete the order if items failed
      await supabase.from("orders").delete().eq("id", order.id)
      return NextResponse.json({ error: "Failed to create order items" }, { status: 500 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Error in orders POST:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
