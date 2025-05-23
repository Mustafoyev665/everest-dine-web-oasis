
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useShoppingContext } from '@/context/ShoppingContext';

const Liked = () => {
  const { likedItems, removeFromLiked, addToCart, clearCart } = useShoppingContext();
  
  // Remove from favorites
  const removeFromFavorites = (id: number) => {
    removeFromLiked(id);
    
    toast({
      title: "Removed from favorites",
      description: "The item has been removed from your favorites.",
    });
  };
  
  // Add to cart
  const handleAddToCart = (item: any) => {
    addToCart(item);
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  // Clear all favorites
  const clearFavorites = () => {
    // Since we don't have a direct clearLiked function, we'll remove each item
    likedItems.forEach(item => removeFromLiked(item.id));
    
    toast({
      title: "Favorites cleared",
      description: "All items have been removed from your favorites.",
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
              Your Favorites
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Items you've saved for later
            </p>
          </div>
        </div>
      </div>
      
      {/* Favorites Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {likedItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-bold">
                Saved Items <span className="text-gray-400">({likedItems.length})</span>
              </h2>
              <Button 
                variant="outline" 
                className="border-white/10 hover:bg-white/10 text-red-400 hover:text-red-300"
                onClick={clearFavorites}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {likedItems.map((item) => (
                <div key={item.id} className="glass-card overflow-hidden animate-fade-in group">
                  <div className="h-48 bg-gradient-to-br from-yellow-400/20 to-amber-700/20 flex items-center justify-center relative">
                    <div className="text-center p-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-slate-900 font-display font-bold text-2xl">{item.name[0]}</span>
                      </div>
                      <p className="text-sm text-gray-400">Food Image Placeholder</p>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="absolute top-3 right-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                        onClick={() => removeFromFavorites(item.id)}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-400 line-clamp-2 mb-4">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-yellow-400 font-semibold">${item.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Empty favorites state
          <div className="glass-card p-10 text-center animate-fade-in max-w-2xl mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-display font-bold mb-3">No favorites yet</h2>
            <p className="text-gray-400 mb-6">
              Items you favorite will appear here for easy access.
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

export default Liked;
