
import React from 'react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious, 
  PaginationEllipsis 
} from '@/components/ui/pagination';

interface MenuPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MenuPagination: React.FC<MenuPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Complex pagination logic for > 5 pages
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, and last page
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first page, ellipsis, current page and neighbors, ellipsis, last page
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="mt-8 sm:mt-12 flex justify-center">
      <Pagination>
        <PaginationContent className="glass-card p-1 sm:p-2">
          {/* Previous button */}
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              className={`cursor-pointer text-xs sm:text-sm ${
                currentPage === 1 
                  ? "pointer-events-none opacity-50" 
                  : "hover:bg-cyan-400/10 text-cyan-400"
              }`}
            />
          </PaginationItem>
          
          {/* Page numbers */}
          {pageNumbers.map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink 
                  onClick={() => onPageChange(page as number)}
                  isActive={currentPage === page}
                  className={`cursor-pointer text-xs sm:text-sm ${
                    currentPage === page 
                      ? "bg-cyan-400/20 border-cyan-400 text-cyan-400 font-bold" 
                      : "hover:bg-cyan-400/10 text-cyan-400"
                  }`}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next button */}
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              className={`cursor-pointer text-xs sm:text-sm ${
                currentPage === totalPages 
                  ? "pointer-events-none opacity-50" 
                  : "hover:bg-cyan-400/10 text-cyan-400"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MenuPagination;
