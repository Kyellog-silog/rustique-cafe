import type React from "react"
import { AdminHeader } from "@/components/admin/admin-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-sidebar-foreground mb-4">Menu Management</h2>
            <nav className="space-y-2">
              <a
                href="/admin"
                className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-primary bg-sidebar-accent/10 rounded-md"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                All Items
              </a>
              <a
                href="/admin/categories"
                className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/10 rounded-md"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                </svg>
                Categories
              </a>
              <a
                href="/admin/analytics"
                className="flex items-center px-3 py-2 text-sm font-medium text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/10 rounded-md"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analytics
              </a>
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
