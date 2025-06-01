
import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  isLiked: boolean;
  onAddToCart: (item: MenuItem) => void;
  onAddToLiked: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  index,
  isLiked,
  onAddToCart,
  onAddToLiked,
}) => {
  const { t } = useLanguage();

  return (
    <Card 
      className="group glass-card hover:bg-white/10 transition-all duration-500 overflow-hidden animate-fade-in transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 sm:h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        
        {/* Floating buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className={`bg-white/10 backdrop-blur-sm border transition-all duration-300 p-2 ${
              isLiked 
                ? "bg-pink-500/20 border-pink-500/30 text-pink-400 shadow-lg shadow-pink-400/20" 
                : "border-pink-400/30 text-pink-400 hover:bg-pink-500/20 hover:shadow-pink-400/40"
            }`}
            onClick={() => onAddToLiked(item)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current animate-pulse" />
              <span className="text-white font-semibold text-sm">{item.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2 leading-tight">
            {item.name}
          </h3>
          <span className="text-xl sm:text-2xl font-bold gradient-text animate-pulse whitespace-nowrap ml-3">
            ${item.price}
          </span>
        </div>

        <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3">
          {item.description}
        </p>

        <Button 
          className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:from-cyan-500 hover:to-purple-600 font-semibold shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 transition-all duration-300 animate-shimmer text-sm py-3"
          onClick={() => onAddToCart(item)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {t('btn.add_to_cart')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
