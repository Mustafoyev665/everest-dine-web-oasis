
import { useState } from 'react';
import { useAuth } from './useAuth';

// Backend API bilan ishlash uchun hook
export const useBackendAPI = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Backend bilan sync qilish uchun tayyorlangan ma'lumotlar
  const getUserData = () => {
    return {
      id: user?.id,
      email: user?.email,
      fullName: user?.user_metadata?.full_name,
      createdAt: user?.created_at,
    };
  };

  // Orders uchun backend API format
  const formatOrderForBackend = (order: any) => {
    return {
      userId: user?.id,
      userEmail: user?.email,
      items: order.items,
      totalAmount: order.total,
      status: 'pending',
      customerInfo: order.customerInfo,
      deliveryInfo: order.deliveryInfo,
      paymentMethod: order.paymentMethod,
      createdAt: new Date().toISOString(),
    };
  };

  // Reservations uchun backend API format
  const formatReservationForBackend = (reservation: any) => {
    return {
      userId: user?.id,
      userEmail: user?.email,
      guestName: reservation.name,
      guestPhone: reservation.phone,
      guestEmail: reservation.email,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      specialRequests: reservation.specialRequests,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  };

  // Contact messages uchun backend API format
  const formatContactForBackend = (contact: any) => {
    return {
      userId: user?.id || null,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
  };

  // Backend API endpoints (Node.js + MongoDB)
  const API_ENDPOINTS = {
    // Users
    users: '/api/users',
    userProfile: '/api/users/profile',
    
    // Orders
    orders: '/api/orders',
    userOrders: '/api/orders/user',
    adminOrders: '/api/admin/orders',
    
    // Reservations
    reservations: '/api/reservations',
    userReservations: '/api/reservations/user',
    adminReservations: '/api/admin/reservations',
    
    // Menu
    menu: '/api/menu',
    menuCategories: '/api/menu/categories',
    
    // Contact
    contact: '/api/contact',
    adminMessages: '/api/admin/messages',
    
    // Analytics
    analytics: '/api/admin/analytics',
    revenue: '/api/admin/revenue',
    
    // Auth
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
  };

  return {
    loading,
    setLoading,
    getUserData,
    formatOrderForBackend,
    formatReservationForBackend,
    formatContactForBackend,
    API_ENDPOINTS,
  };
};
