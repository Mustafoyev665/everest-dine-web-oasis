
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      console.log('Loading menu items...');
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name_en', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Raw data from Supabase:', data);

      if (data) {
        const transformedItems: MenuItem[] = data.map((item: any) => ({
          id: item.id,
          name: item.name_en || item.name_uz || 'Unnamed Item',
          description: item.description_en || item.description_uz || 'No description available',
          price: Number(item.price) || 0,
          category: item.category || 'Other',
          image: item.image || '/placeholder.svg',
          rating: Number(item.rating) || 4.0,
        }));
        
        console.log('Transformed items:', transformedItems);
        console.log('Total items loaded:', transformedItems.length);
        console.log('Categories found:', [...new Set(transformedItems.map(item => item.category))]);
        
        setMenuItems(transformedItems);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
      setMenuItems([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  return { menuItems, loading, refetch: loadMenuItems };
};
