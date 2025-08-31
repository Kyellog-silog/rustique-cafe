"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MenuAPI } from "@/lib/api/menu"
import type { MenuItem } from "@/lib/types/menu"
import { useToast } from "@/hooks/use-toast"

interface DeleteConfirmDialogProps {
  item: MenuItem | { id: string; name: string }
  onSuccess: () => void
  onCancel: () => void
  type?: 'menu-item' | 'category'
  onDelete?: (id: string) => Promise<void>
}

export function DeleteConfirmDialog({ 
  item, 
  onSuccess, 
  onCancel, 
  type = 'menu-item',
  onDelete 
}: DeleteConfirmDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setLoading(true)
    try {
      if (onDelete) {
        // Use custom delete function
        await onDelete(item.id)
      } else {
        // Default menu item delete
        await MenuAPI.deleteMenuItem(item.id)
      }
      
      toast({
        title: "Success",
        description: `${type === 'category' ? 'Category' : 'Menu item'} deleted successfully`,
      })
      onSuccess()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${type === 'category' ? 'category' : 'menu item'}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={true} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete {type === 'category' ? 'Category' : 'Menu Item'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{item?.name}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
