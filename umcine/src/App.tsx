import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import { movies } from "./data/movies";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <MovieGrid movies={movies} />
        <Pagination totalPages={1} />
      </main>

      <footer className="app__footer">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
