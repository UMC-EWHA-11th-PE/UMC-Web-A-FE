import {movies} from "../../data/movies.ts";
import MovieGrid from "../../components/movies/movie-grid.tsx";
import Footer from "../../components/layout/footer.tsx";
import Pagination from "../../components/movies/pagination.tsx";
import {useState} from "react";
import {useViewSettingsStore, type CardSize} from "../../stores/view-settings-store.ts";
import {cn} from "../../utils/cn.ts";

const cardSizeOptions: { value: CardSize, label: string }[] = [
    {value: "large", label: "크게"},
    {value: "large", label: "작게"},
]

export function MovieListPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const cardSize = useViewSettingsStore((state) => state.cardSize);
    const setCardSize = useViewSettingsStore((state) => state.setCardSize);

    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col gap-5 px-4 md:px-20 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-[28px] leading-[34px] font-bold tracking-[-1.2px] text-(--color-text-primary) md:text-[38px] md:leading-[44px] md:tracking-[-1.71px]">영화
                        목록</h1>
                    <div className="flex gap-2" role="group" aria-label="카드 크기">
                        {cardSizeOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                aria-pressed={cardSize === option.value}
                                onClick={() => setCardSize(option.value)}
                                className={cn(
                                    "h-9 rounded-lg border px-3 text-xs font-extrabold",
                                    cardSize === option.value
                                        ? "border-(--color-text-primary) bg-(--color-text-primary) text-(--color-bg-surface)"
                                        : "border-(--color-border-default) bg-(--color-bg-surface)",
                                )}>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
                <MovieGrid movies={movies}/>
                <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage}/>
            </main>
            <Footer/>
        </div>
    );
}