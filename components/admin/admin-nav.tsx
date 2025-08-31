"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard,
  UtensilsCrossed, 
  BarChart3,
  ShoppingCart,
  Tags,
  Settings,
  Users,
  FileText
} from "lucide-react"

interface AdminNavProps {
  className?: string
}

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Overview and quick stats"
  },
  {
    title: "Menu Items",
    href: "/admin/menu",
    icon: UtensilsCrossed,
    description: "Manage your menu items"
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tags,
    description: "Organize menu categories"
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    description: "View and manage orders"
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Sales insights and reports"
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
    description: "Customer management"
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: FileText,
    description: "Generate detailed reports"
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Cafe settings and preferences"
  },
]

export function AdminNav({ className }: AdminNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            <div className="flex flex-col">
              <span>{item.title}</span>
              <span className="text-xs opacity-70 font-normal">{item.description}</span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
