import { createFileRoute } from '@tanstack/react-router'
import { MovieListPages } from '../pages/movies/movie-list-page'

export const Route = createFileRoute('/')({
  component: MovieListPages,
});
