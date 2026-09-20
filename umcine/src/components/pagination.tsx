import "./pagination.css"

interface PaginationProps{
    currentPage: number;
    totalPages: number;
}

export default function Pagination({currentPage, totalPages}: PaginationProps){
    const pages = Array.from({length: totalPages}, (_, index) => index + 1);

    return(
        <nav className="pagination" aria-label="페이지 이동">
            <button type="button" className="pagination__arrow" aria-label="이전 페이지">
                <img src="/icons/movie-icons/chevron-left.svg" alt=""/>
            </button>

            <div className="pagination__pages">
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={`pagination__page${page === currentPage ? " pagination__page--active" : ""}`}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button type="button" className="pagination__arrow" aria-label="다음 페이지">
                <img src="/icons/movie-icons/chevron-right.svg" alt=""/>
            </button>
        </nav>
    );
}
