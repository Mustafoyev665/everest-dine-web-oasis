
import React from 'react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
      <div className="flex overflow-x-auto pb-4 space-x-3 hide-scrollbar">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`whitespace-nowrap text-sm px-4 py-3 transition-all duration-300 min-w-fit ${
              activeCategory === category.id 
                ? "neon-glow animate-pulse-neon" 
                : "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
