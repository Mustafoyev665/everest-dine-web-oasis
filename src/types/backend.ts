
// Backend API uchun TypeScript interfaces

export interface BackendUser {
  _id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BackendOrder {
  _id: string;
  userId: string;
  userEmail: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
  deliveryInfo: {
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image?: string;
}

export interface BackendReservation {
  _id: string;
  userId?: string;
  userEmail?: string;
  reservationNumber: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  tableNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackendMenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isAvailable: boolean;
  ingredients?: string[];
  allergens?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface BackendContact {
  _id: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  adminReply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BackendAnalytics {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalReservations: number;
  recentOrders: BackendOrder[];
  popularDishes: {
    name: string;
    orders: number;
    revenue: number;
  }[];
  monthlyRevenue: {
    month: string;
    revenue: number;
    orders: number;
  }[];
  customerFeedback: {
    rating: number;
    comment: string;
    customerName: string;
    date: string;
  }[];
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
