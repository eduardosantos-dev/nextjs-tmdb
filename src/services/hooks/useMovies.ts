import { useQuery, UseQueryOptions } from "react-query";
import { IMovie } from "../../types";
import { toRunTimeString } from "../../utils";
import { api } from "../api";

type GetMoviesResponse = {
  content: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
};

export async function getMovies(page: number = 1): Promise<GetMoviesResponse> {
  const { data } = await api.get("/movie/popular", {
    params: {
      page,
    },
  });

  const movies = data.results.map((movie: IMovie) => {
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
    content: movies,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

interface GetMovieByIdResponse {
  movie: IMovie;
}

export async function getMovieById(id: number): Promise<GetMovieByIdResponse> {
  const { data } = await api.get<IMovie>(`/movie/${id}`, {
    params: {
      append_to_response: "credits,videos,images",
    },
  });

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
    formatted_revenue: data.revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }),
    formatted_budget: data.budget.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }),
  };

  return {
    movie,
  };
}

interface GetTopRatedMoviesResponse {
  content: IMovie[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export async function getMoviesTopRated(
  page: number = 1
): Promise<GetTopRatedMoviesResponse> {
  const { data } = await api.get("/movie/top_rated", {
    params: {
      page,
    },
  });

  const movies = data.results.map((movie: IMovie) => {
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
    content: movies,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

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
