import Header from "./layout/header";
import MovieListPage from "../pages/movies/movie-list-page";

function App() {
  return (
    <div className="flex min-h-screen flex-col font-[Pretendard,-apple-system,BlinkMacSystemFont,sans-serif]">
      <Header />

      <MovieListPage />

      <footer className="bg-[#f7f7f8] px-0 py-4 text-center text-xs text-[#999]">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}

export default App;