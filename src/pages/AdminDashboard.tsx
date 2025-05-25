
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, DollarSign, TrendingUp, LogOut, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    const adminEmail = localStorage.getItem('adminEmail');
    
    if (!adminAuth || adminEmail !== 'mustafoyev7788@gmail.com') {
      navigate('/admin/login');
      return;
    }

    // Load demo orders (in real app, this would be from API)
    const demoOrders: Order[] = [
      {
        id: '001',
        customerName: 'Aziz Karimov',
        email: 'aziz@example.com',
        address: 'Tashkent, Yunusobod tumani, 123-uy',
        items: [
          { name: 'Osh', quantity: 2, price: 25000 },
          { name: 'Manti', quantity: 1, price: 15000 }
        ],
        total: 65000,
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '002',
        customerName: 'Malika Abdullayeva',
        email: 'malika@example.com',
        address: 'Samarkand, Registon ko\'chasi, 45-uy',
        items: [
          { name: 'Lagman', quantity: 1, price: 20000 },
          { name: 'Somsa', quantity: 3, price: 8000 }
        ],
        total: 44000,
        status: 'confirmed',
        createdAt: '2024-01-15T09:15:00Z'
      },
      {
        id: '003',
        customerName: 'Bobur Rahimov',
        email: 'bobur@example.com',
        address: 'Bukhara, Navoi ko\'chasi, 78-uy',
        items: [
          { name: 'Shashlik', quantity: 2, price: 30000 }
        ],
        total: 60000,
        status: 'preparing',
        createdAt: '2024-01-15T08:45:00Z'
      }
    ];
    
    setOrders(demoOrders);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/admin/login');
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Order updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { label: 'Kutilmoqda', color: 'bg-yellow-500' },
      confirmed: { label: 'Tasdiqlangan', color: 'bg-blue-500' },
      preparing: { label: 'Tayyorlanmoqda', color: 'bg-orange-500' },
      delivered: { label: 'Yetkazilgan', color: 'bg-green-500' },
      cancelled: { label: 'Bekor qilingan', color: 'bg-red-500' }
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'preparing': return <Package className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-gray-400">Buyurtmalarni boshqarish</p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-gray-300 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Jami buyurtmalar</p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <Package className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Bajarilgan</p>
                <p className="text-2xl font-bold text-white">{completedOrders}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Jami daromad</p>
                <p className="text-2xl font-bold text-white">{totalRevenue.toLocaleString()} so'm</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">O'rtacha buyurtma</p>
                <p className="text-2xl font-bold text-white">
                  {orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : 0} so'm
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="glass-card">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-display font-bold text-white">Buyurtmalar ro'yxati</h2>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-300">ID</TableHead>
                  <TableHead className="text-gray-300">Mijoz</TableHead>
                  <TableHead className="text-gray-300">Manzil</TableHead>
                  <TableHead className="text-gray-300">Jami</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Vaqt</TableHead>
                  <TableHead className="text-gray-300">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-white/10">
                    <TableCell className="text-white font-mono">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white font-medium">{order.customerName}</p>
                        <p className="text-gray-400 text-sm">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 max-w-xs truncate">
                      {order.address}
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      {order.total.toLocaleString()} so'm
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString('uz-UZ')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setSelectedOrder(order)}
                          className="text-gray-300 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        {order.status === 'pending' && (
                          <Button 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Tasdiqlash
                          </Button>
                        )}
                        
                        {order.status === 'confirmed' && (
                          <Button 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            Tayyorlash
                          </Button>
                        )}
                        
                        {order.status === 'preparing' && (
                          <Button 
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Yetkazildi
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-display font-bold text-white">
                  Buyurtma tafsilotlari #{selectedOrder.id}
                </h3>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Mijoz ma'lumotlari</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300"><span className="text-gray-400">Ism:</span> {selectedOrder.customerName}</p>
                    <p className="text-gray-300"><span className="text-gray-400">Email:</span> {selectedOrder.email}</p>
                    <p className="text-gray-300"><span className="text-gray-400">Manzil:</span> {selectedOrder.address}</p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Status:</span> {getStatusBadge(selectedOrder.status)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Buyurtma ma'lumotlari</h4>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-gray-400">Vaqt:</span> {new Date(selectedOrder.createdAt).toLocaleString('uz-UZ')}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-gray-400">Jami:</span> {selectedOrder.total.toLocaleString()} so'm
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Buyurtma tarkibi</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-white/10">
                      <div>
                        <span className="text-white">{item.name}</span>
                        <span className="text-gray-400 ml-2">× {item.quantity}</span>
                      </div>
                      <span className="text-white font-medium">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
