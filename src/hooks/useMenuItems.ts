
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';

interface MenuItemDB {
  id: number;
  name_uz: string;
  name_en: string;
  name_ru: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  is_active: boolean;
}

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
  const { currentLanguage } = useLanguage();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMenuItems();
  }, [currentLanguage]);

  const loadMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;

      if (data) {
        const transformedItems: MenuItem[] = data.map((item: MenuItemDB) => ({
          id: item.id,
          name: item[`name_${currentLanguage}` as keyof MenuItemDB] as string,
          description: item[`description_${currentLanguage}` as keyof MenuItemDB] as string,
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
