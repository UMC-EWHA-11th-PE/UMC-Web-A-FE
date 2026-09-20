import "./App.css";
import {movies} from "./data/movie.ts";
import MovieGrid from "./components/movie-grid.tsx";
import Header from "./components/header.tsx";
import Footer from "./components/footer.tsx";
import Pagination from "./components/pagination.tsx";
import {useState} from "react";
import type {Movie} from "./types/movie.ts";


export default function App() {
    const[movieList, setMovieList] = useState<Movie[]>(movies);

    function handleToggleBookmark(id:number){
        setMovieList((currentMovies)=>
            currentMovies.map((movie)=>
                movie.id===id?{...movie, isBookmarked:!movie.isBookmarked}:movie));
    }
    return(
        <div className="app">
            <Header />
            <main className="app__main">
                <h1 className="app__title">영화 목록</h1>
                <MovieGrid movies={movieList} onToggleBookmark={handleToggleBookmark}/>
                <Pagination currentPage={1} totalPages={5}/>
            </main>
            <Footer/>
        </div>
    );
}