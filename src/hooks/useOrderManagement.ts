
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { useShoppingContext } from '@/context/ShoppingContext';

export const useOrderManagement = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useShoppingContext();
  const [loading, setLoading] = useState(false);

  const submitOrder = async (orderData: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    total: number;
  }) => {
    if (!user || !cartItems.length) {
      throw new Error('No user or cart items found');
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          customer_name: orderData.fullName,
          customer_email: orderData.email,
          delivery_address: `${orderData.address}, ${orderData.city}, ${orderData.state} ${orderData.zipCode}`,
          order_items: cartItems,
          total_amount: orderData.total,
          status: 'pending'
        });

      if (error) throw error;

      clearCart();
      toast({
        title: "Buyurtma muvaffaqiyatli yuborildi!",
        description: "Buyurtmangiz qabul qilindi va tez orada tayyorlanadi.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Xatolik yuz berdi",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const submitReservation = async (reservationData: {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    partySize: number;
    specialRequests?: string;
  }) => {
    if (!user) {
      throw new Error('User must be logged in to make a reservation');
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('reservations')
        .insert({
          user_id: user.id,
          customer_name: reservationData.name,
          customer_email: reservationData.email,
          customer_phone: reservationData.phone,
          reservation_date: reservationData.date,
          reservation_time: reservationData.time,
          party_size: reservationData.partySize,
          special_requests: reservationData.specialRequests,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Bron muvaffaqiyatli yuborildi!",
        description: "Stol broni qabul qilindi, tez orada tasdiqlash xabari keladi.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Xatolik yuz berdi",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const submitContactMessage = async (messageData: {
    name: string;
    email: string;
    message: string;
    phone?: string;
    subject?: string;
  }) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          user_id: user?.id || null,
          name: messageData.name,
          email: messageData.email,
          phone: messageData.phone,
          subject: messageData.subject,
          message: messageData.message,
          status: 'unread'
        });

      if (error) throw error;

      toast({
        title: "Xabar yuborildi!",
        description: "Sizning xabaringiz qabul qilindi, tez orada javob beramiz.",
      });

      return true;
    } catch (error: any) {
      toast({
        title: "Xatolik yuz berdi",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitOrder,
    submitReservation,
    submitContactMessage,
    loading
  };
};
