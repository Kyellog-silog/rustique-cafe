-- Create menu_items table for the cafe management system
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL DEFAULT 'other',
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for menu_items
CREATE POLICY "Users can view their own menu items" 
  ON menu_items FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own menu items" 
  ON menu_items FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own menu items" 
  ON menu_items FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own menu items" 
  ON menu_items FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policy for public viewing (for the main menu page)
CREATE POLICY "Anyone can view available menu items" 
  ON menu_items FOR SELECT 
  USING (is_available = true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_user_id ON menu_items(user_id);
