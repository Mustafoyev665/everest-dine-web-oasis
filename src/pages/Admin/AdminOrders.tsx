
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
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

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const typedOrders = data.map(order => ({
          ...order,
          order_items: order.order_items as unknown as OrderItem[]
        }));
        setOrders(typedOrders);
      }
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Buyurtmalarni yuklashda xatolik yuz berdi",
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
        title: "Muvaffaqiyat",
        description: "Buyurtma statusi yangilandi"
      });
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Status yangilanmadi",
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
      cancelled: "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

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
        <h1 className="text-3xl font-bold text-white mb-2">Buyurtmalar</h1>
        <p className="text-gray-400">Barcha buyurtmalarni boshqaring</p>
      </div>

      <div className="space-y-4">
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
              <div className="flex gap-2 flex-wrap">
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
      </div>
    </div>
  );
};

export default AdminOrders;
