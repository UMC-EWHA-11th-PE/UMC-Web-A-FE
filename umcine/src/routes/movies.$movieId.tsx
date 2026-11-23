import {createFileRoute} from "@tanstack/react-router";
import {MovieDetailPage} from "../screens/movies/movie-detail-page.tsx";

export const Route=createFileRoute("/movies/$movieId")({
  component: MovieDetailPage,
})