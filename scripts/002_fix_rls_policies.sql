-- Drop existing policies to recreate them correctly
DROP POLICY IF EXISTS "Users can view their own menu items" ON menu_items;
DROP POLICY IF EXISTS "Users can insert their own menu items" ON menu_items;
DROP POLICY IF EXISTS "Users can update their own menu items" ON menu_items;
DROP POLICY IF EXISTS "Users can delete their own menu items" ON menu_items;
DROP POLICY IF EXISTS "Anyone can view available menu items" ON menu_items;

-- Create corrected RLS policies for menu_items
-- Public can view available items (for the main menu page)
CREATE POLICY "Public can view available menu items" 
  ON menu_items FOR SELECT 
  USING (is_available = true);

-- Authenticated users can view all their own menu items (for admin dashboard)
CREATE POLICY "Authenticated users can view their own menu items" 
  ON menu_items FOR SELECT 
  USING (auth.uid() = user_id);

-- Authenticated users can insert their own menu items
CREATE POLICY "Authenticated users can insert their own menu items" 
  ON menu_items FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can update their own menu items
CREATE POLICY "Authenticated users can update their own menu items" 
  ON menu_items FOR UPDATE 
  USING (auth.uid() = user_id);

-- Authenticated users can delete their own menu items
CREATE POLICY "Authenticated users can delete their own menu items" 
  ON menu_items FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert some sample data for testing
INSERT INTO menu_items (name, description, price, image_url, category, is_available, user_id) 
VALUES 
  ('Espresso', 'Rich and bold espresso shot', 2.50, '/cafe-menu-item.png', 'beverages', true, auth.uid()),
  ('Cappuccino', 'Creamy cappuccino with steamed milk', 4.00, '/cafe-menu-item.png', 'beverages', true, auth.uid()),
  ('Croissant', 'Buttery, flaky French pastry', 3.50, '/cafe-menu-item.png', 'pastries', true, auth.uid()),
  ('Avocado Toast', 'Fresh avocado on artisan bread', 8.00, '/cafe-menu-item.png', 'food', true, auth.uid()),
  ('Chocolate Muffin', 'Rich chocolate chip muffin', 4.50, '/cafe-menu-item.png', 'pastries', false, auth.uid())
ON CONFLICT DO NOTHING;
