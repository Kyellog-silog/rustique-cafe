"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NavigationLink() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <Button asChild variant="outline" size="sm">
        <Link href="/admin">Admin</Link>
      </Button>
    </div>
  )
}
