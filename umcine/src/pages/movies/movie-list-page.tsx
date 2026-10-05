import {movies} from "../../data/movies.ts";
import MovieGrid from "../../components/movies/movie-grid.tsx";
import Footer from "../../components/layout/footer.tsx";
import Pagination from "../../components/movies/pagination.tsx";
import {useState} from "react";


export function MovieListPage() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col gap-5 px-4 md:px-20 py-6">
                <h1 className="text-[28px] leading-[34px] font-bold tracking-[-1.2px] text-(--color-text-primary) md:text-[38px] md:leading-[44px] md:tracking-[-1.71px]">영화
                    목록</h1>
                <MovieGrid movies={movies}/>
                <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage}/>
            </main>
            <Footer/>
        </div>
    );
}