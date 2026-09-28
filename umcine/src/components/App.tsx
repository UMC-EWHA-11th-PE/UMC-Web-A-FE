import Header from "./layout/header";
import "./App.css";
import MovieListPage from "/Users/songseunghee/Documents/GitHub/UMC-Web-A-FE-ZEN/umcine/src/pages/movies/movie-list-page.tsx";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <MovieListPage />
      </main>

      <footer className="app__footer">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;
