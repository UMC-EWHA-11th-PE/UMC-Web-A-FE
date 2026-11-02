import { cn } from "../../utils/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;
}

// Figma: 페이지 번호는 현재 페이지를 가운데 두고 최대 5개까지 보여줌
const VISIBLE_PAGE_COUNT = 5;

// Figma: 36px 정사각형 버튼, 버튼 사이 간격 4px, 모서리 6px
const ITEM_CLASS_NAME =
  "grid size-9 cursor-pointer place-items-center rounded-md text-sm leading-none";

// Figma: 이전/다음 화살표는 번호보다 조금 더 떨어져 있고, 비활성일 때는 연한 파란색
const ARROW_CLASS_NAME = cn(
  ITEM_CLASS_NAME,
  "mx-1 text-fg-secondary disabled:cursor-not-allowed disabled:text-action-disabled",
);

function getVisiblePages(page: number, totalPages: number) {
  // totalPages가 0이면 전체 페이지 수를 아직 모르는 상태(로딩 중)라서 끝을 제한하지 않는다
  const lastPage = totalPages > 0 ? totalPages : Infinity;
  const start = Math.max(1, Math.min(page - 2, lastPage - VISIBLE_PAGE_COUNT + 1));
  const end = Math.min(start + VISIBLE_PAGE_COUNT - 1, lastPage);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const hasPrevious = page > 1;
  const hasNext = totalPages === 0 || page < totalPages;
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <nav
      aria-label="페이지 이동"
      className="flex items-center justify-center gap-1 pt-2 pb-6"
    >
      <button
        type="button"
        aria-label="이전 페이지"
        disabled={!hasPrevious}
        onClick={() => onPageChange(page - 1)}
        className={ARROW_CLASS_NAME}
      >
        <ChevronIcon direction="left" />
      </button>

      {visiblePages.map((pageNumber) => {
        const isCurrent = pageNumber === page;

        return (
          <button
            key={pageNumber}
            type="button"
            aria-label={`${pageNumber}페이지`}
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              ITEM_CLASS_NAME,
              isCurrent
                ? "bg-fg font-bold text-white"
                : "font-medium text-fg-secondary hover:text-fg",
            )}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        aria-label="다음 페이지"
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className={ARROW_CLASS_NAME}
      >
        <ChevronIcon direction="right" />
      </button>
    </nav>
  );
}
