
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { useShoppingContext } from '@/context/ShoppingContext';
import { useOrderManagement } from '@/hooks/useOrderManagement';
import { useAuth } from '@/hooks/useAuth';
import { CreditCard, Home, ShoppingBag, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cartItems, cartTotal } = useShoppingContext();
  const { submitOrder, loading } = useOrderManagement();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  // Calculate totals
  const subtotal = cartTotal;
  const tax = subtotal * 0.08; // 8% tax rate
  const deliveryFee = 5.99;
  const total = subtotal + tax + deliveryFee;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login talab qilinadi",
        description: "Buyurtma berish uchun tizimga kiring.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Savat bo'sh",
        description: "Buyurtma berish uchun savatga mahsulot qo'shing.",
        variant: "destructive"
      });
      return;
    }

    try {
      await submitOrder({
        fullName: formData.fullName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        total
      });
      
      setPaymentSuccess(true);
    } catch (error) {
      // Error is handled in useOrderManagement
    }
  };
  
  // Handle success confirmation
  const handleSuccessConfirm = () => {
    setPaymentSuccess(false);
    navigate('/');
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-4">Login talab qilinadi</h2>
              <p className="text-gray-400 mb-6">
                Buyurtma berish uchun tizimga kirishingiz kerak.
              </p>
              <Button 
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                onClick={() => navigate('/login')}
              >
                Tizimga kirish
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Buyurtma berish
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Buyurtmangizni yakunlang
            </p>
          </div>
        </div>
      </div>
      
      {cartItems.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6 border-b border-white/10 pb-4">
                  Yetkazib berish ma'lumotlari
                </h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Customer Information */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                          To'liq ism
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email manzil
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Shipping Address */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Home className="mr-2 h-5 w-5 text-yellow-400" />
                      Yetkazib berish manzili
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                          Ko'cha manzili
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                            Shahar
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
                            Viloyat
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-yellow-400" />
                      To'lov usuli
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
                          Karta raqami
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-300 mb-1">
                            Amal qilish muddati
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-300 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCVC"
                            name="cardCVC"
                            value={formData.cardCVC}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-2 bg-slate-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 animate-fade-in sticky top-24">
                <h2 className="text-2xl font-display font-bold mb-6 border-b border-white/10 pb-4 flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-yellow-400" />
                  Buyurtma xulasasi
                </h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div>
                        <span className="text-white">{item.name} </span>
                        <span className="text-gray-400">× {item.quantity || 1}</span>
                      </div>
                      <span className="text-white font-medium">
                        ${((item.price) * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Jami summa</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Soliq (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Yetkazib berish</span>
                    <span className="text-white">${deliveryFee.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <span className="text-lg text-white font-semibold">Jami</span>
                    <span className="text-lg text-yellow-400 font-semibold">${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                    onClick={handleSubmit}
                    disabled={loading || cartItems.length === 0}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-slate-900 border-t-transparent rounded-full" />
                        Yuklanmoqda...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Buyurtma berish
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    Barcha tranzaksiyalar xavfsiz va shifrlangan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="glass-card p-10 text-center animate-fade-in max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">Savatcha bo'sh</h2>
            <p className="text-gray-400 mb-6">
              Buyurtma berish uchun savatga mahsulot qo'shishingiz kerak.
            </p>
            <Button 
              className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
              onClick={() => navigate('/menu')}
            >
              Menyuni ko'rish
            </Button>
          </div>
        </div>
      )}
      
      {/* Success Dialog */}
      <Dialog open={paymentSuccess} onOpenChange={setPaymentSuccess}>
        <DialogContent className="bg-slate-800 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Buyurtma muvaffaqiyatli!
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Sizning buyurtmangiz muvaffaqiyatli qabul qilindi.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-white mb-4">
              Buyurtmangiz uchun rahmat! Tasdiqlash xabari emailingizga yuborildi.
            </p>
            <p className="text-yellow-400 font-medium">
              Taxminiy yetkazib berish vaqti: 30-45 daqiqa
            </p>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
            onClick={handleSuccessConfirm}
          >
            Davom etish
          </Button>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Checkout;
