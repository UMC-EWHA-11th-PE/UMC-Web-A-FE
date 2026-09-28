import {cn} from "../../utils/cn.ts";

interface PaginationProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page:number)=>void;
}

export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps){
    const pages = Array.from({length: totalPages}, (_, index) => index + 1);

    return(
        <nav className="flex items-center justify-center gap-3" aria-label="페이지 이동">
            <button type="button" className="grid size-6 place-items-center" aria-label="이전 페이지">
                <img className="size-6" src="/icons/movie-icons/chevron-left.svg" alt=""/>
            </button>

            <div className="flex items-center gap-1">
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={cn(
                            "grid size-9 place-items-center rounded-[7px] text-[13px] font-bold text-(--color-text-secondary)",
                            page === currentPage && "bg-(--color-text-primary) text-(--color-bg-surface)",
                        )}
                        aria-current={page === currentPage ? "page" : undefined}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button type="button" className="grid size-6 place-items-center" aria-label="다음 페이지">
                <img className="size-6" src="/icons/movie-icons/chevron-right.svg" alt=""/>
            </button>
        </nav>
    );
}
