
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';

interface Stats {
  totalOrders: number;
  totalReservations: number;
  totalMessages: number;
  totalRevenue: number;
  pendingOrders: number;
  unreadMessages: number;
}

const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalReservations: 0,
    totalMessages: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [ordersData, reservationsData, messagesData] = await Promise.all([
        supabase.from('orders').select('total_amount, status'),
        supabase.from('reservations').select('status'),
        supabase.from('contact_messages').select('status')
      ]);

      const orders = ordersData.data || [];
      const reservations = reservationsData.data || [];
      const messages = messagesData.data || [];

      const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      const pendingOrders = orders.filter(order => order.status === 'pending').length;
      const unreadMessages = messages.filter(msg => msg.status === 'unread').length;

      setStats({
        totalOrders: orders.length,
        totalReservations: reservations.length,
        totalMessages: messages.length,
        totalRevenue,
        pendingOrders,
        unreadMessages,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Jami Buyurtmalar',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-500'
    },
    {
      title: 'Jami Daromad',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Bronlar',
      value: stats.totalReservations,
      icon: Calendar,
      color: 'text-purple-500'
    },
    {
      title: 'Xabarlar',
      value: stats.totalMessages,
      icon: MessageSquare,
      color: 'text-orange-500'
    },
    {
      title: 'Kutilayotgan Buyurtmalar',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'text-yellow-500'
    },
    {
      title: 'O\'qilmagan Xabarlar',
      value: stats.unreadMessages,
      icon: Users,
      color: 'text-red-500'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Everest Rest boshqaruv paneli</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">So'nggi faoliyat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-300">Yangi buyurtma qabul qilindi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-300">Stol broni tasdiqlandi</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-300">Yangi xabar keldi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Tezkor harakatlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                • {stats.pendingOrders} ta buyurtma kutilmoqda
              </p>
              <p className="text-gray-300 text-sm">
                • {stats.unreadMessages} ta yangi xabar
              </p>
              <p className="text-gray-300 text-sm">
                • Bugungi daromad: ${(stats.totalRevenue * 0.1).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
