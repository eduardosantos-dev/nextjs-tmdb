import { useQuery, UseQueryOptions } from "react-query";
import { toRunTimeString } from "../../utils";
import { api } from "../api";

type Movie = {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  title: string;
};

type GetMoviesResponse = {
  movies: Movie[];
  page: number;
  totalPages: number;
  totalResults: number;
};

export async function getMovies(page: number): Promise<GetMoviesResponse> {
  const { data } = await api.get("/movie/popular", {
    params: {
      page,
    },
  });

  const movies = data.results.map((movie: Movie) => {
    return {
      ...movie,
      formatted_release_date: new Date(movie.release_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
    };
  });

  return {
    movies,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

interface GetMovieByIdResponse {
  movie: Movie;
}

export async function getMovieById(id: number): Promise<GetMovieByIdResponse> {
  const { data } = await api.get(`/movie/${id}`);

  const movie = {
    ...data,
    formatted_release_date: new Date(data.release_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ),
    formatted_runtime: toRunTimeString(data.runtime),
  };

  return {
    movie,
  };
}

export function useMovies(page: number, options: UseQueryOptions): any {
  return useQuery(["movies", page], () => getMovies(page));
}
