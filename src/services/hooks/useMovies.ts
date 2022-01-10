import { useQuery, UseQueryOptions } from "react-query";
import { getMovieById, getMovies, getMoviesTopRated } from "../movie";

export function useMovies(page: number, options: UseQueryOptions): any {
  return useQuery(["movies", page], () => getMovies(page));
}

export function useMoviesTopRated(
  page: number,
  options?: UseQueryOptions
): any {
  return useQuery(["movies", page], () => getMoviesTopRated(page));
}

export function useMovie(id: number, options: UseQueryOptions): any {
  return useQuery(["movie", id], () => getMovieById(id));
}
