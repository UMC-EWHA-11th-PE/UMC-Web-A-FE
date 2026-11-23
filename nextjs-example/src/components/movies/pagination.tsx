interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClassName =
  "min-w-8 h-8 rounded-md border px-2 py-0 text-[13px] cursor-pointer";

const arrowClassName = `${buttonClassName} border-[#ddd] bg-white text-[#333] disabled:opacity-40 disabled:cursor-not-allowed`;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));

  const pages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => startPage + index,
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav
      className="flex items-center justify-center gap-2 px-0 pb-10 pt-6"
      aria-label="페이지 이동"
    >
      <button
        type="button"
        className={arrowClassName}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={`${buttonClassName} ${
            page === currentPage
              ? "border-[#2f5bea] bg-[#2f5bea] font-semibold text-white"
              : "border-[#ddd] bg-white text-[#333]"
          }`}
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={arrowClassName}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        다음
      </button>
    </nav>
  );
}

export default Pagination;
