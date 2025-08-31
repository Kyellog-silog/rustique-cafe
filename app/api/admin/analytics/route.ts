import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabase
      .from("orders")
      .select("total_amount, created_at")
      .eq("status", "completed")

    if (revenueError) {
      console.error("Error fetching revenue data:", revenueError)
    }

    // Get total orders
    const { data: ordersData, error: ordersError } = await supabase.from("orders").select("id, status, created_at")

    if (ordersError) {
      console.error("Error fetching orders data:", ordersError)
    }

    // Get popular items
    const { data: popularItems, error: popularError } = await supabase.from("order_items").select(`
        menu_item_id,
        quantity,
        menu_items (
          name,
          price
        )
      `)

    if (popularError) {
      console.error("Error fetching popular items:", popularError)
    }

    // Get category performance
    const { data: categoryData, error: categoryError } = await supabase.from("order_items").select(`
        quantity,
        total_price,
        menu_items (
          category_id,
          categories (
            name,
            color
          )
        )
      `)

    if (categoryError) {
      console.error("Error fetching category data:", categoryError)
    }

    // Process the data
    const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0
    const totalOrders = ordersData?.length || 0
    const completedOrders = ordersData?.filter((order) => order.status === "completed").length || 0
    const averageOrderValue = totalOrders > 0 ? totalRevenue / completedOrders : 0

    // Process popular items
    const itemSales = popularItems?.reduce((acc: any, item) => {
      const menuItem = item.menu_items as any
      if (menuItem) {
        const key = menuItem.name
        if (!acc[key]) {
          acc[key] = { name: key, quantity: 0, revenue: 0 }
        }
        acc[key].quantity += item.quantity
        acc[key].revenue += item.quantity * Number(menuItem.price)
      }
      return acc
    }, {})

    const topItems = Object.values(itemSales || {})
      .sort((a: any, b: any) => b.quantity - a.quantity)
      .slice(0, 5)

    // Process category performance
    const categoryPerformance = categoryData?.reduce((acc: any, item) => {
      const menuItem = item.menu_items as any
      if (menuItem?.categories) {
        const categoryName = menuItem.categories.name
        const categoryColor = menuItem.categories.color
        if (!acc[categoryName]) {
          acc[categoryName] = {
            name: categoryName,
            color: categoryColor,
            quantity: 0,
            revenue: 0,
          }
        }
        acc[categoryName].quantity += item.quantity
        acc[categoryName].revenue += Number(item.total_price)
      }
      return acc
    }, {})

    // Process daily sales for chart
    const dailySales = revenueData?.reduce((acc: any, order) => {
      const date = new Date(order.created_at).toISOString().split("T")[0]
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, orders: 0 }
      }
      acc[date].revenue += Number(order.total_amount)
      acc[date].orders += 1
      return acc
    }, {})

    const salesTrend = Object.values(dailySales || {})
      .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30) // Last 30 days

    return NextResponse.json({
      summary: {
        totalRevenue,
        totalOrders,
        completedOrders,
        averageOrderValue,
      },
      topItems,
      categoryPerformance: Object.values(categoryPerformance || {}),
      salesTrend,
    })
  } catch (error) {
    console.error("Error in analytics GET:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
