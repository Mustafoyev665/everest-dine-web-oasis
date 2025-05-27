
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useShoppingContext } from '@/context/ShoppingContext';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export const useSupabaseSync = () => {
  const { user } = useAuth();
  const { 
    cartItems, 
    likedItems, 
    setCartItems, 
    setLikedItems 
  } = useShoppingContext();

  // Sync cart items to Supabase
  const syncCartToSupabase = async () => {
    if (!user) return;

    try {
      // Clear existing cart items
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert current cart items
      if (cartItems.length > 0) {
        const cartData = cartItems.map(item => ({
          user_id: user.id,
          item_id: item.id,
          item_name: item.name,
          item_description: item.description,
          item_price: item.price,
          item_category: item.category,
          quantity: item.quantity || 1,
        }));

        await supabase
          .from('cart_items')
          .insert(cartData);
      }
    } catch (error) {
      console.error('Error syncing cart to Supabase:', error);
    }
  };

  // Sync liked items to Supabase
  const syncLikedToSupabase = async () => {
    if (!user) return;

    try {
      // Clear existing liked items
      await supabase
        .from('liked_items')
        .delete()
        .eq('user_id', user.id);

      // Insert current liked items
      if (likedItems.length > 0) {
        const likedData = likedItems.map(item => ({
          user_id: user.id,
          item_id: item.id,
          item_name: item.name,
          item_description: item.description,
          item_price: item.price,
          item_category: item.category,
        }));

        await supabase
          .from('liked_items')
          .insert(likedData);
      }
    } catch (error) {
      console.error('Error syncing liked items to Supabase:', error);
    }
  };

  // Load data from Supabase
  const loadFromSupabase = async () => {
    if (!user) return;

    try {
      // Load cart items
      const { data: cartData } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (cartData) {
        const cartItems = cartData.map(item => ({
          id: item.item_id,
          name: item.item_name,
          description: item.item_description,
          price: item.item_price,
          category: item.item_category,
          quantity: item.quantity,
        }));
        setCartItems(cartItems);
      }

      // Load liked items
      const { data: likedData } = await supabase
        .from('liked_items')
        .select('*')
        .eq('user_id', user.id);

      if (likedData) {
        const likedItems = likedData.map(item => ({
          id: item.item_id,
          name: item.item_name,
          description: item.item_description,
          price: item.item_price,
          category: item.item_category,
        }));
        setLikedItems(likedItems);
      }
    } catch (error) {
      console.error('Error loading data from Supabase:', error);
    }
  };

  // Load data when user signs in
  useEffect(() => {
    if (user) {
      loadFromSupabase();
    }
  }, [user]);

  // Sync cart when it changes
  useEffect(() => {
    if (user && cartItems.length >= 0) {
      const timeoutId = setTimeout(() => {
        syncCartToSupabase();
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [cartItems, user]);

  // Sync liked items when they change
  useEffect(() => {
    if (user && likedItems.length >= 0) {
      const timeoutId = setTimeout(() => {
        syncLikedToSupabase();
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [likedItems, user]);

  return {
    syncCartToSupabase,
    syncLikedToSupabase,
    loadFromSupabase,
  };
};
