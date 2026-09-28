import { useState } from 'react';
import './pagination.css';

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void;
}

function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <nav className="pagination" aria-label="페이지 이동">
      <button
        className="pagination__arrow"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`pagination__page ${
            page === currentPage ? 'pagination__page--active' : ''
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination__arrow"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </nav>
  );
}

export default Pagination;
