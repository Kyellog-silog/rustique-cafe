export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string
  category_id: string | null
  is_available: boolean
  created_at: string
  updated_at: string
  user_id: string
  categories?: {
    id: string
    name: string
    color: string
  }
}

export interface MenuItemInput {
  name: string
  description?: string
  price: number
  image_url?: string
  category: string
  category_id?: string
  is_available: boolean
}
