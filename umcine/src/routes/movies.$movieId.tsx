import { createFileRoute } from "@tanstack/react-router";
import { MovieDetailPage } from "../pages/movies/movies-detail-page";

export const Route = createFileRoute("/movies/$movieId")({
  component: MovieDetailPage,
});