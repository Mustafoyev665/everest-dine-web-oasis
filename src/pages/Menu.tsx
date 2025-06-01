
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import CategoryFilter from '@/components/Menu/CategoryFilter';
import MenuGrid from '@/components/Menu/MenuGrid';
import MenuPagination from '@/components/Menu/MenuPagination';
import { useMenu } from '@/hooks/useMenu';
import { useLanguage } from '@/context/LanguageContext';

const Menu = () => {
  const {
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
  } = useMenu();

  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden w-full">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 pb-8 md:pt-32 md:pb-12 bg-slate-900 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold gradient-text mb-4 animate-neon-glow">
              {t('menu.title')}
            </h1>
            <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {t('menu.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="w-full overflow-x-hidden">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Menu Items Grid */}
      <div className="w-full overflow-x-hidden">
        <MenuGrid
          items={currentItems}
          isItemLiked={isItemLiked}
          onAddToCart={handleAddToCart}
          onAddToLiked={handleAddToLiked}
        />
      </div>

      {/* Pagination */}
      <div className="w-full overflow-x-hidden">
        <MenuPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Menu;
