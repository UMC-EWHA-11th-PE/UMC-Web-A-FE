interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

const BUTTON_CLASS_NAME =
  "h-9 cursor-pointer rounded-lg border border-line bg-white px-4 text-[13px] font-bold text-fg-secondary disabled:cursor-not-allowed disabled:opacity-40";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav
      aria-label="페이지 이동"
      className="flex items-center justify-center gap-4 py-4"
    >
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        className={BUTTON_CLASS_NAME}
      >
        이전
      </button>
      <span className="text-sm leading-[17px] text-fg-secondary">
        {totalPages > 0 ? `${page} / ${totalPages}` : page}
      </span>
      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={BUTTON_CLASS_NAME}
      >
        다음
      </button>
    </nav>
  );
}
