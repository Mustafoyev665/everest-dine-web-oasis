
import { useState, useEffect } from 'react';
import { useShoppingContext } from '@/context/ShoppingContext';
import { useMenuItems } from '@/hooks/useMenuItems';

interface Category {
  id: string;
  name: string;
}

export const useMenu = () => {
  const { menuItems, loading } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Changed to 30 items per page

  const { addToCart, toggleLikedItem, isItemLiked } = useShoppingContext();

  // Get unique categories from menu items
  const categories: Category[] = [
    { id: 'all', name: 'All Items' },
    ...Array.from(new Set(menuItems.map(item => item.category)))
      .map(category => ({ id: category, name: category }))
  ];

  // Filter items by category
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description
    });
  };

  const handleAddToLiked = (item: any) => {
    toggleLikedItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      description: item.description
    });
  };

  return {
    categories,
    activeCategory,
    currentPage,
    totalPages,
    currentItems,
    loading,
    isItemLiked,
    handlePageChange,
    handleCategoryChange,
    handleAddToCart,
    handleAddToLiked,
  };
};
