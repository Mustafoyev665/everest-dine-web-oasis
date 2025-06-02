
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
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      if (data) {
        const transformedItems: MenuItem[] = data.map((item: any) => ({
          id: item.id,
          name: item.name_en, // Default to English
          description: item.description_en || '', // Default to English
          price: Number(item.price),
          category: item.category,
          image: item.image || '/placeholder.svg',
          rating: Number(item.rating),
        }));
        setMenuItems(transformedItems);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  return { menuItems, loading, refetch: loadMenuItems };
};
