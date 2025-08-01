
import React from 'react';
import MenuItemCard from './MenuItemCard';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

interface MenuGridProps {
  items: MenuItem[];
  isItemLiked: (id: number) => boolean;
  onAddToCart: (item: MenuItem) => void;
  onAddToLiked: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  isItemLiked,
  onAddToCart,
  onAddToLiked,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full overflow-x-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {items.map((item, index) => (
          <MenuItemCard
            key={item.id}
            item={item}
            index={index}
            isLiked={isItemLiked(item.id)}
            onAddToCart={onAddToCart}
            onAddToLiked={onAddToLiked}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
