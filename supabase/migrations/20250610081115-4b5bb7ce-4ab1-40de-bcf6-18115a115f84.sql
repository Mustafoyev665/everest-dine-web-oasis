
-- First, let's drop any existing problematic policies on admin_users table
DROP POLICY IF EXISTS "Admin users can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Admin users can delete admin users" ON admin_users;

-- Create simple, non-recursive policies for admin_users
CREATE POLICY "Enable read access for admin users" ON admin_users
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for admin users" ON admin_users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for admin users" ON admin_users
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for admin users" ON admin_users
    FOR DELETE USING (true);

-- Ensure menu_items table has proper policies for public access
DROP POLICY IF EXISTS "Enable read access for all users" ON menu_items;
CREATE POLICY "Enable read access for all users" ON menu_items
    FOR SELECT USING (is_active = true);

-- Also ensure the admin_users table RLS is enabled
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
