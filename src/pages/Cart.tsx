
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

// Sample cart items for demo
const initialCartItems = [
  {
    id: 3,
    name: 'Slow-cooked Lamb Shoulder',
    description: 'Tender lamb shoulder with roasted root vegetables',
    price: 38,
    quantity: 2,
    image: 'main-1',
  },
  {
    id: 8,
    name: 'Dark Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream',
    price: 16,
    quantity: 1,
    image: 'dessert-1',
  },
  {
    id: 6,
    name: 'Truffle Parmesan Fries',
    description: 'Crispy fries tossed in truffle oil and grated parmesan',
    price: 14,
    quantity: 1,
    image: 'side-1',
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + tax;
  
  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Your Cart
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Review and complete your order
            </p>
          </div>
        </div>
      </div>
      
      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-display font-bold">Items ({cartItems.length})</h2>
                  <Button 
                    variant="ghost" 
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={clearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>
                
                {/* Cart Items */}
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 border-b border-white/10">
                      {/* Item Image */}
                      <div className="w-full sm:w-32 h-24 bg-gradient-to-br from-yellow-400/20 to-amber-700/20 rounded-md flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                          <span className="text-slate-900 font-display font-bold text-lg">{item.name[0]}</span>
                        </div>
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-yellow-400 font-semibold">${item.price.toFixed(2)}</span>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0 bg-white/5 border-white/10"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="w-8 text-center">{item.quantity}</span>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0 bg-white/5 border-white/10"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-400 hover:text-red-300 ml-2"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Continue Shopping */}
                <div className="mt-8 text-center">
                  <Link to="/menu" className="text-yellow-400 hover:text-yellow-300 inline-flex items-center">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 animate-fade-in sticky top-24">
                <h2 className="text-2xl font-display font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <span className="text-lg text-white font-semibold">Total</span>
                    <span className="text-lg text-yellow-400 font-semibold">${total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty cart state
          <div className="glass-card p-10 text-center animate-fade-in max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold">
              <Link to="/menu">
                Explore Our Menu
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

// Import at the top wasn't working because of how we're generating the files, so importing here
import { ShoppingCart } from 'lucide-react';

export default Cart;
