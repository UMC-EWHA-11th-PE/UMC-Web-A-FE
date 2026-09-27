import { createFileRoute } from '@tanstack/react-router'
import { MovieListPages } from '../pages/movies/MovieListPages'

export const Route = createFileRoute('/')({
  component: MovieListPages,
});
