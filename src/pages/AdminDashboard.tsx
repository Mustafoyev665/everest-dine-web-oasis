
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  delivery_address: string;
  order_items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

interface Reservation {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  special_requests: string;
  status: string;
  created_at: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    
    loadData();
  }, [isAdmin, navigate]);

  const loadData = async () => {
    try {
      const [ordersData, reservationsData, messagesData] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('reservations').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      ]);

      if (ordersData.data) {
        // Convert the Json type to OrderItem[] for proper typing
        const typedOrders = ordersData.data.map(order => ({
          ...order,
          order_items: order.order_items as unknown as OrderItem[]
        }));
        setOrders(typedOrders);
      }
      if (reservationsData.data) setReservations(reservationsData.data);
      if (messagesData.data) setMessages(messagesData.data);
    } catch (error) {
      toast({
        title: "Ma'lumotlarni yuklashda xatolik",
        description: "Iltimos, sahifani yangilang",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));

      toast({
        title: "Status yangilandi",
        description: "Buyurtma statusi muvaffaqiyatli yangilandi"
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Status yangilanmadi",
        variant: "destructive"
      });
    }
  };

  const updateReservationStatus = async (reservationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', reservationId);

      if (error) throw error;

      setReservations(reservations.map(reservation => 
        reservation.id === reservationId ? { ...reservation, status } : reservation
      ));

      toast({
        title: "Status yangilandi",
        description: "Bron statusi muvaffaqiyatli yangilandi"
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Status yangilanmadi",
        variant: "destructive"
      });
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(messages.map(message => 
        message.id === messageId ? { ...message, status: 'read' } : message
      ));
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Xabar holati yangilanmadi",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      pending: "outline",
      confirmed: "default",
      preparing: "secondary",
      delivered: "default",
      cancelled: "destructive",
      unread: "destructive",
      read: "default"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold gradient-text">
            Admin Panel
          </h1>
          <Button 
            variant="outline" 
            onClick={signOut}
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Chiqish
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Jami Buyurtmalar
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{orders.length}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Bronlar
              </CardTitle>
              <Calendar className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{reservations.length}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Xabarlar
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{messages.length}</div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Jami Daromad
              </CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${orders.reduce((sum, order) => sum + Number(order.total_amount), 0).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="orders" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900">
              Buyurtmalar
            </TabsTrigger>
            <TabsTrigger value="reservations" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900">
              Bronlar
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-slate-900">
              Xabarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{order.customer_name}</CardTitle>
                      <p className="text-gray-400">{order.customer_email}</p>
                      <p className="text-gray-400">{order.delivery_address}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status)}
                      <p className="text-yellow-400 font-bold mt-2">
                        ${Number(order.total_amount).toFixed(2)}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-white">Buyurtma mahsulotlari:</h4>
                    {order.order_items.map((item: OrderItem, index: number) => (
                      <div key={index} className="flex justify-between text-gray-300">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => updateOrderStatus(order.id, 'confirmed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Tasdiqlash
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Tayyorlanmoqda
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => updateOrderStatus(order.id, 'delivered')}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Yetkazildi
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Bekor qilish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reservations" className="space-y-4">
            {reservations.map((reservation) => (
              <Card key={reservation.id} className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{reservation.customer_name}</CardTitle>
                      <p className="text-gray-400">{reservation.customer_email}</p>
                      <p className="text-gray-400">{reservation.customer_phone}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(reservation.status)}
                      <p className="text-yellow-400 font-bold mt-2">
                        {reservation.party_size} kishi
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(reservation.created_at).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-300">
                      <strong>Sana:</strong> {reservation.reservation_date}
                    </p>
                    <p className="text-gray-300">
                      <strong>Vaqt:</strong> {reservation.reservation_time}
                    </p>
                    {reservation.special_requests && (
                      <p className="text-gray-300">
                        <strong>Maxsus so'rovlar:</strong> {reservation.special_requests}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Tasdiqlash
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Bekor qilish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{message.name}</CardTitle>
                      <p className="text-gray-400">{message.email}</p>
                      {message.phone && <p className="text-gray-400">{message.phone}</p>}
                    </div>
                    <div className="text-right">
                      {getStatusBadge(message.status)}
                      <p className="text-gray-400 text-sm">
                        {new Date(message.created_at).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {message.subject && (
                    <p className="text-gray-300 mb-2">
                      <strong>Mavzu:</strong> {message.subject}
                    </p>
                  )}
                  <p className="text-gray-300 mb-4">{message.message}</p>
                  {message.status === 'unread' && (
                    <Button 
                      size="sm" 
                      onClick={() => markMessageAsRead(message.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      O'qilgan deb belgilash
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
