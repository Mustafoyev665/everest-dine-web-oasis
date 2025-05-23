
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, Plus } from 'lucide-react';

const FeaturedDishes = () => {
  const dishes = [
    {
      id: 1,
      name: "Himalayan Lamb Tenderloin",
      description: "Slow-cooked lamb with aromatic spices, served with truffle mashed potatoes and seasonal vegetables",
      price: 68,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3",
      rating: 4.9,
      dietary: ["Gluten-free option"],
      chef: "Chef Rajesh Kumar"
    },
    {
      id: 2,
      name: "Mount Everest Seafood Platter",
      description: "Fresh lobster, sea bass, and prawns with saffron risotto and champagne butter sauce",
      price: 85,
      image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?ixlib=rb-4.0.3",
      rating: 5.0,
      dietary: ["Pescatarian"],
      chef: "Chef Marina Silva"
    },
    {
      id: 3,
      name: "Peak Wagyu Experience",
      description: "A5 Japanese Wagyu beef with roasted bone marrow, wild mushrooms, and red wine reduction",
      price: 120,
      image: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-4.0.3",
      rating: 4.8,
      dietary: ["Premium Cut"],
      chef: "Chef Takeshi Yamamoto"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-6">
            Signature Masterpieces
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Each dish is a carefully orchestrated symphony of flavors, crafted by our world-renowned chefs
          </p>
        </div>

        {/* Featured Dishes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <Card 
              key={dish.id} 
              className="group glass-card hover:bg-white/10 transition-all duration-500 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{dish.rating}</span>
                    </div>
                    <span className="text-gray-300 text-sm">• {dish.chef}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {dish.dietary.map((tag, i) => (
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

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-200">
                    {dish.name}
                  </h3>
                  <span className="text-2xl font-bold gradient-text">
                    ${dish.price}
                  </span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {dish.description}
                </p>

                <div className="flex space-x-3">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600 font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Menu Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 font-semibold px-8"
          >
            Explore Full Menu
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDishes;
