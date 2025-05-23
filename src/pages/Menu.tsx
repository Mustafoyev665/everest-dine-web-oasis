
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Plus, Filter } from 'lucide-react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Dishes', count: 48 },
    { id: 'appetizers', name: 'Appetizers', count: 12 },
    { id: 'mains', name: 'Main Courses', count: 18 },
    { id: 'desserts', name: 'Desserts', count: 8 },
    { id: 'beverages', name: 'Beverages', count: 10 }
  ];

  const menuItems = [
    {
      id: 1,
      name: "Himalayan Lamb Tenderloin",
      description: "Slow-cooked lamb with aromatic spices, truffle mashed potatoes",
      price: 68,
      category: "mains",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3",
      rating: 4.9,
      dietary: ["Gluten-free"],
      spiceLevel: 2
    },
    {
      id: 2,
      name: "Everest Seafood Platter",
      description: "Fresh lobster, sea bass, prawns with saffron risotto",
      price: 85,
      category: "mains",
      image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3",
      rating: 5.0,
      dietary: ["Pescatarian"],
      spiceLevel: 1
    },
    {
      id: 3,
      name: "Truffle Arancini",
      description: "Crispy risotto balls with black truffle and parmesan",
      price: 24,
      category: "appetizers",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3",
      rating: 4.7,
      dietary: ["Vegetarian"],
      spiceLevel: 0
    },
    {
      id: 4,
      name: "Chocolate Summit",
      description: "Dark chocolate mousse with gold leaf and berry compote",
      price: 18,
      category: "desserts",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3",
      rating: 4.8,
      dietary: ["Vegetarian"],
      spiceLevel: 0
    }
  ];

  const filteredItems = menuItems.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === 'under30' && item.price < 30) ||
      (priceFilter === '30to60' && item.price >= 30 && item.price <= 60) ||
      (priceFilter === 'over60' && item.price > 60);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-6">
            Our Menu
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated collection of culinary masterpieces, each dish crafted with passion and precision
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-slate-800 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-yellow-400'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-yellow-400" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="all">All Prices</option>
                <option value="under30">Under $30</option>
                <option value="30to60">$30 - $60</option>
                <option value="over60">Over $60</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id}
                className="group glass-card hover:bg-white/10 transition-all duration-500 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold text-sm">{item.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.dietary.map((tag, i) => (
                          <span 
                            key={i}
                            className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                      {item.name}
                    </h3>
                    <span className="text-xl font-bold gradient-text">
                      ${item.price}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Spice Level */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xs text-gray-400">Spice Level:</span>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < item.spiceLevel ? 'bg-red-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No items found matching your filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
