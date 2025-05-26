import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { toast } from '@/hooks/use-toast';
import { useShoppingContext } from '@/context/ShoppingContext';

const Menu = () => {
  const { addToCart, addToLiked, likedItems } = useShoppingContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Helper function to check if item is liked
  const isItemLiked = (itemId: number) => {
    return likedItems.some(item => item.id === itemId);
  };

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Courses' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'salads', name: 'Salads' },
    { id: 'seafood', name: 'Seafood' },
    { id: 'steaks', name: 'Steaks' }
  ];

  const menuItems = [
    // Appetizers
    { id: 1, name: "Truffle Arancini", description: "Crispy risotto balls with black truffle and parmesan", price: 24, category: 'appetizers', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", rating: 4.8 },
    { id: 2, name: "Himalayan Yak Carpaccio", description: "Thinly sliced yak meat with juniper berries", price: 32, category: 'appetizers', image: "https://images.unsplash.com/photo-1544025162-d76694265947", rating: 4.9 },
    { id: 3, name: "Foie Gras Parfait", description: "Silky smooth foie gras with brioche toast", price: 38, category: 'appetizers', image: "https://images.unsplash.com/photo-1559847844-d721426d6edc", rating: 4.7 },
    { id: 4, name: "Oyster Trilogy", description: "Three oysters prepared three ways", price: 28, category: 'appetizers', image: "https://images.unsplash.com/photo-1558030006-450675393462", rating: 4.6 },
    { id: 5, name: "Caviar Service", description: "Premium Beluga caviar with traditional accompaniments", price: 85, category: 'appetizers', image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add", rating: 5.0 },

    // Main Courses
    { id: 6, name: "Himalayan Lamb Tenderloin", description: "Slow-cooked lamb with aromatic spices", price: 68, category: 'mains', image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d", rating: 4.9 },
    { id: 7, name: "Peak Wagyu Experience", description: "A5 Japanese Wagyu beef with bone marrow", price: 120, category: 'mains', image: "https://images.unsplash.com/photo-1558030006-450675393462", rating: 4.8 },
    { id: 8, name: "Mount Everest Seafood Platter", description: "Fresh lobster, sea bass, and prawns", price: 85, category: 'mains', image: "https://images.unsplash.com/photo-1559847844-d721426d6edc", rating: 5.0 },
    { id: 9, name: "Duck Confit", description: "Traditional French duck leg with cherry sauce", price: 45, category: 'mains', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", rating: 4.7 },
    { id: 10, name: "Venison Medallions", description: "Wild venison with juniper and blackberry", price: 52, category: 'mains', image: "https://images.unsplash.com/photo-1544025162-d76694265947", rating: 4.6 },

    // Pizza
    { id: 11, name: "Truffle Margherita", description: "San Marzano tomatoes, mozzarella, black truffle", price: 28, category: 'pizza', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", rating: 4.8 },
    { id: 12, name: "Prosciutto di Parma", description: "24-month aged prosciutto with arugula", price: 32, category: 'pizza', image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add", rating: 4.7 },
    { id: 13, name: "Quattro Stagioni Premium", description: "Four seasons with premium ingredients", price: 35, category: 'pizza', image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d", rating: 4.6 },
    { id: 14, name: "Caviar Supreme", description: "Crème fraîche, caviar, and chives", price: 65, category: 'pizza', image: "https://images.unsplash.com/photo-1559847844-d721426d6edc", rating: 4.9 },
    { id: 15, name: "Wild Mushroom", description: "Mixed wild mushrooms with truffle oil", price: 26, category: 'pizza', image: "https://images.unsplash.com/photo-1558030006-450675393462", rating: 4.5 },

    // Pasta
    { id: 16, name: "Lobster Ravioli", description: "Handmade pasta filled with fresh lobster", price: 42, category: 'pasta', image: "https://images.unsplash.com/photo-1559847844-d721426d6edc", rating: 4.8 },
    { id: 17, name: "Truffle Carbonara", description: "Classic carbonara with black truffle shavings", price: 38, category: 'pasta', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", rating: 4.7 },
    { id: 18, name: "Osso Buco Pappardelle", description: "Slow-braised veal with wide ribbon pasta", price: 45, category: 'pasta', image: "https://images.unsplash.com/photo-1544025162-d76694265947", rating: 4.9 },
    { id: 19, name: "Seafood Linguine", description: "Mixed seafood in white wine sauce", price: 36, category: 'pasta', image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add", rating: 4.6 },
    { id: 20, name: "Wagyu Bolognese", description: "Premium wagyu beef ragu with parmigiano", price: 48, category: 'pasta', image: "https://images.unsplash.com/photo-1558030006-450675393462", rating: 4.8 },

    // Desserts
    { id: 21, name: "Chocolate Soufflé", description: "Dark chocolate soufflé with vanilla ice cream", price: 18, category: 'desserts', image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d", rating: 4.9 },
    { id: 22, name: "Tiramisu Perfection", description: "Traditional tiramisu with premium mascarpone", price: 16, category: 'desserts', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", rating: 4.7 },
    { id: 23, name: "Crème Brûlée Trilogy", description: "Three flavors: vanilla, lavender, and orange", price: 20, category: 'desserts', image: "https://images.unsplash.com/photo-1559847844-d721426d6edc", rating: 4.8 },
    { id: 24, name: "Himalayan Honey Cake", description: "Spiced cake with wild honey and nuts", price: 14, category: 'desserts', image: "https://images.unsplash.com/photo-1544025162-d76694265947", rating: 4.6 },
    { id: 25, name: "Gold Leaf Parfait", description: "Vanilla parfait with 24k gold leaf", price: 35, category: 'desserts', image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add", rating: 4.5 },

    // Beverages
    { id: 26, name: "Dom Pérignon 2010", description: "Vintage champagne from prestigious vineyard", price: 180, category: 'beverages', image: "https://images.unsplash.com/photo-1558030006-450675393462", rating: 5.0 },
    { id: 27, name: "Himalayan Spring Water", description: "Pure glacier water from Mount Everest", price: 8, category: 'beverages', image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b", rating: 4.3 },
    { id: 28, name: "Artisan Coffee Blend", description: "Single-origin beans from Ethiopian highlands", price: 12, category: 'beverages', image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d", rating: 4.7 },
    { id: 29, name: "Vintage Wine Selection", description: "Curated selection of rare vintage wines", price: 250, category: 'beverages', image: "https://images.unsplash.com/photo-1559847844-d721426d6edc", rating: 4.9 },
    { id: 30, name: "Premium Tea Collection", description: "Finest teas from around the world", price: 15, category: 'beverages', image: "https://images.unsplash.com/photo-1544025162-d76694265947", rating: 4.6 },

    // Additional items for pagination
    ...Array.from({ length: 100 }, (_, i) => ({
      id: 31 + i,
      name: `Premium Dish ${i + 1}`,
      description: `Exquisite dish prepared with the finest ingredients and expert technique`,
      price: Math.floor(Math.random() * 100) + 15,
      category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
      image: `https://images.unsplash.com/photo-${['1546833999-b9f581a1996d', '1565299624946-b28f40a0ca4b', '1559847844-d721426d6edc', '1558030006-450675393462', '1544025162-d76694265947', '1571091718767-18b5b1457add'][Math.floor(Math.random() * 6)]}`,
      rating: 4.0 + Math.random()
    }))
  ];

  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // Handle add to cart
  const handleAddToCart = (item: any) => {
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  // Handle add to liked
  const handleAddToLiked = (item: any) => {
    addToLiked(item);
    toast({
      title: "Added to favorites",
      description: `${item.name} has been added to your favorites.`,
    });
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4 animate-neon-glow">
              Exquisite Menu
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Discover our collection of premium dishes crafted by world-class chefs
            </p>
          </div>
        </div>
      </div>

      {/* Categories - Horizontal Scroll */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex overflow-x-auto pb-4 space-x-4 hide-scrollbar">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`whitespace-nowrap transition-all duration-300 ${
                activeCategory === category.id 
                  ? "neon-glow animate-pulse-neon" 
                  : "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {currentItems.map((item, index) => (
            <Card 
              key={item.id} 
              className="group glass-card hover:bg-white/10 transition-all duration-500 overflow-hidden animate-fade-in transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                {/* Floating buttons */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`bg-white/10 backdrop-blur-sm border transition-all duration-300 p-2 ${
                      isItemLiked(item.id) 
                        ? "bg-pink-500/20 border-pink-500/30 text-pink-400 shadow-lg shadow-pink-400/20" 
                        : "border-pink-400/30 text-pink-400 hover:bg-pink-500/20 hover:shadow-pink-400/40"
                    }`}
                    onClick={() => handleAddToLiked(item)}
                  >
                    <Heart className={`w-4 h-4 ${isItemLiked(item.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
                      <span className="text-white font-semibold">{item.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold gradient-text animate-pulse whitespace-nowrap ml-2">
                    ${item.price}
                  </span>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-2">
                  {item.description}
                </p>

                <Button 
                  className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:from-cyan-500 hover:to-purple-600 font-semibold shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300 animate-shimmer"
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent className="glass-card p-2">
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-cyan-400/10"}
                  />
                </PaginationItem>
                
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(1)}
                        className="cursor-pointer hover:bg-cyan-400/10"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {currentPage > 4 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {/* Current page and surrounding pages */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink 
                        onClick={() => handlePageChange(pageNum)}
                        isActive={currentPage === pageNum}
                        className="cursor-pointer hover:bg-cyan-400/10"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink 
                        onClick={() => handlePageChange(totalPages)}
                        className="cursor-pointer hover:bg-cyan-400/10"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-cyan-400/10"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
