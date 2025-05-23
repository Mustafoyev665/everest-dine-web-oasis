import React, { useState } from 'react';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useShoppingContext } from '@/context/ShoppingContext';

// Menu categories
const categories = [
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'sides', name: 'Side Dishes' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

// Sample menu items
const menuItems = [
  // Appetizers
  {
    id: 1,
    name: 'Truffled Mushroom Bruschetta',
    description: 'Artisanal sourdough toasts topped with wild mushrooms, black truffle, and aged parmesan',
    price: 18,
    category: 'appetizers',
    image: 'appetizer-1',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Sourdough bread', 'Wild mushrooms', 'Black truffle', 'Aged parmesan', 'Microgreens']
  },
  {
    id: 2,
    name: 'Seared Sea Scallops',
    description: 'Hand-dived scallops with cauliflower purée, golden raisins, and pine nut dressing',
    price: 24,
    category: 'appetizers',
    image: 'appetizer-2',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Sea scallops', 'Cauliflower purée', 'Golden raisins', 'Pine nuts', 'Micro herbs']
  },
  
  // Main Courses
  {
    id: 3,
    name: 'Slow-cooked Lamb Shoulder',
    description: 'Tender lamb shoulder with roasted root vegetables, red wine jus, and mint gremolata',
    price: 38,
    category: 'mains',
    image: 'main-1',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Lamb shoulder', 'Root vegetables', 'Red wine jus', 'Mint gremolata']
  },
  {
    id: 4,
    name: 'Pan-seared Sea Bass',
    description: 'Wild sea bass with saffron risotto, charred asparagus, and citrus butter sauce',
    price: 42,
    category: 'mains',
    image: 'main-2',
    popular: true,
    dietary: ['gluten-free'],
    ingredients: ['Sea bass', 'Saffron risotto', 'Asparagus', 'Citrus butter']
  },
  {
    id: 5,
    name: 'Mushroom & Truffle Risotto',
    description: 'Creamy arborio rice with wild mushrooms, black truffle, and aged parmesan',
    price: 32,
    category: 'mains',
    image: 'main-3',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Arborio rice', 'Wild mushrooms', 'Black truffle', 'Aged parmesan', 'Vegetable stock']
  },
  
  // Side Dishes
  {
    id: 6,
    name: 'Truffle Parmesan Fries',
    description: 'Crispy fries tossed in truffle oil and grated parmesan',
    price: 14,
    category: 'sides',
    image: 'side-1',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Potatoes', 'Truffle oil', 'Parmesan', 'Sea salt', 'Herbs']
  },
  {
    id: 7,
    name: 'Roasted Brussels Sprouts',
    description: 'Crispy brussels sprouts with bacon lardons and maple glaze',
    price: 12,
    category: 'sides',
    image: 'side-2',
    popular: false,
    dietary: ['gluten-free'],
    ingredients: ['Brussels sprouts', 'Bacon', 'Maple syrup', 'Balsamic vinegar']
  },
  
  // Desserts
  {
    id: 8,
    name: 'Dark Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla bean ice cream and salted caramel',
    price: 16,
    category: 'desserts',
    image: 'dessert-1',
    popular: true,
    dietary: ['vegetarian'],
    ingredients: ['Dark chocolate', 'Eggs', 'Butter', 'Sugar', 'Vanilla ice cream']
  },
  {
    id: 9,
    name: 'Panna Cotta',
    description: 'Vanilla bean panna cotta with seasonal berries and almond tuile',
    price: 14,
    category: 'desserts',
    image: 'dessert-2',
    popular: false,
    dietary: ['vegetarian', 'gluten-free'],
    ingredients: ['Heavy cream', 'Vanilla bean', 'Seasonal berries', 'Mint']
  },
  
  // Drinks
  {
    id: 10,
    name: 'Signature Martini',
    description: 'House-infused botanical gin with dry vermouth and olive',
    price: 18,
    category: 'drinks',
    image: 'drink-1',
    popular: true,
    ingredients: ['Botanical gin', 'Dry vermouth', 'Olive']
  },
  {
    id: 11,
    name: 'Sommelier\'s Wine Selection',
    description: 'Selection of premium wines curated by our sommelier',
    price: 22,
    category: 'drinks',
    image: 'drink-2',
    popular: false,
    ingredients: ['Selected wine']
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, addToLiked, isInCart, isLiked } = useShoppingContext();
  
  // Filter menu items based on active category and search query
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle dish selection and modal opening
  const handleDishClick = (dish: any) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };
  
  // Handle adding to cart
  const handleAddToCart = (dish: any) => {
    addToCart(dish);
  };
  
  // Handle adding to favorites
  const handleAddToFavorites = (dish: any) => {
    addToLiked(dish);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-text mb-4">
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Explore our exceptional dishes crafted with the finest ingredients
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:w-96">
              <Input
                type="text"
                placeholder="Search menu..."
                className="pl-10 bg-white/5 border-white/10 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              <Button
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                className={activeCategory === 'all' ? 'bg-yellow-400 text-slate-900' : 'bg-white/5 border-white/10'}
                onClick={() => setActiveCategory('all')}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className={activeCategory === category.id ? 'bg-yellow-400 text-slate-900' : 'bg-white/5 border-white/10'}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-card overflow-hidden cursor-pointer group animate-fade-in"
                onClick={() => handleDishClick(item)}
              >
                <div className="h-48 bg-gradient-to-br from-yellow-400/20 to-amber-700/20 flex items-center justify-center relative">
                  <div className="text-center p-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-slate-900 font-display font-bold text-2xl">{item.name[0]}</span>
                    </div>
                    <p className="text-sm text-gray-400">Food Image Placeholder</p>
                  </div>
                  
                  {/* Quick action buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${isLiked(item.id) ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToFavorites(item);
                      }}
                    >
                      <Heart className={`h-4 w-4 ${isLiked(item.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  {/* Popular badge */}
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-slate-900 text-xs font-semibold px-2 py-1 rounded">
                      Popular
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-400 line-clamp-2 mb-4">{item.description}</p>
                  
                  {/* Dietary tags */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {item.dietary.includes('vegetarian') && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                          Vegetarian
                        </span>
                      )}
                      {item.dietary.includes('gluten-free') && (
                        <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                          Gluten-Free
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-semibold">${item.price}</span>
                    <Button
                      size="sm"
                      className={`${isInCart(item.id) 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {isInCart(item.id) ? 'Add More' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No items found</h3>
              <p className="text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Dish Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-800 border-white/10 text-white max-w-2xl">
          {selectedDish && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">
                  {selectedDish.name}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  {selectedDish.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="h-56 bg-gradient-to-br from-yellow-400/20 to-amber-700/20 flex items-center justify-center my-4 rounded-md">
                <div className="text-center p-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-slate-900 font-display font-bold text-4xl">{selectedDish.name[0]}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {selectedDish.ingredients.map((ingredient: string, idx: number) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedDish.dietary && selectedDish.dietary.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Dietary</h3>
                    <div className="flex gap-2">
                      {selectedDish.dietary.includes('vegetarian') && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                          Vegetarian
                        </span>
                      )}
                      {selectedDish.dietary.includes('gluten-free') && (
                        <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                          Gluten-Free
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/10">
                  <span className="text-xl text-yellow-400 font-semibold">${selectedDish.price}</span>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className={`border-white/10 hover:bg-white/10 ${isLiked(selectedDish.id) ? 'text-red-400 hover:text-red-300' : ''}`}
                      onClick={() => handleAddToFavorites(selectedDish)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isLiked(selectedDish.id) ? 'fill-current' : ''}`} />
                      {isLiked(selectedDish.id) ? 'Favorited' : 'Favorite'}
                    </Button>
                    <Button
                      className={`${isInCart(selectedDish.id) 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 hover:from-yellow-500 hover:to-amber-600'}`}
                      onClick={() => handleAddToCart(selectedDish)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {isInCart(selectedDish.id) ? 'Add More' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Menu;
