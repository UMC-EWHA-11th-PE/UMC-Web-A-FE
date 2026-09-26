import {movies} from "../../data/movies.ts";
import MovieGrid from "../../components/movies/movie-grid.tsx";
import Footer from "../../components/layout/footer.tsx";
import Pagination from "../../components/movies/pagination.tsx";
import {useState} from "react";
import type {Movie} from "../../types/movie.ts";


export function MovieListPage() {
    const[movieList, setMovieList] = useState<Movie[]>(movies);
    const[currentPage, setCurrentPage] = useState(1);

    function handleToggleBookmark(id:number){
        setMovieList((currentMovies)=>
            currentMovies.map((movie)=>
                movie.id===id?{...movie, isBookmarked:!movie.isBookmarked}:movie));
    }
    return(
        <div className="flex flex-1 flex-col">
            <main className="flex flex-1 flex-col gap-5 px-20 py-6">
                <h1 className="text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-(--color-text-primary)">영화 목록</h1>
                <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark}/>
                <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage}/>
            </main>
            <Footer/>
        </div>
    );
}