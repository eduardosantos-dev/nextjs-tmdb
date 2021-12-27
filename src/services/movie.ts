import { ICredits, IGenre, IMovie, IShow, IVideo } from "../types";
import { toRunTimeString } from "../utils";
import { api } from "./api";

interface IMovieResponse {
  id: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  vote_average: number;
  formatted_release_date: string;
  title: string;
  genres: IGenre[];
  formatted_runtime: string;
  overview: string;
  runtime: number;
  credits: ICredits;
  original_title: string;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  formatted_revenue: string;
  formatted_budget: string;
  videos: {
    results: IVideo[];
  };
  recommendations: {
    results: IMovie[] | IShow[];
  };
}

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
  const { data } = await api.get<IMovieResponse>(`/movie/${id}`, {
    params: {
      append_to_response: "credits,videos,images,recommendations",
    },
  });

  const movie: IMovie = {
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
    recommendations: data.recommendations.results,
    videos: data.videos.results,
  };

  return {
    movie,
  };
}

export async function getMoviesTopRated(
  page: number = 1
): Promise<GetMoviesResponse> {
  const { data } = await api.get("/movie/top_rated", {
    params: {
      page,
      region: "BR",
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

export async function getMoviesNowPlaying(
  page: number = 1
): Promise<GetMoviesResponse> {
  const { data } = await api.get("/movie/now_playing", {
    params: {
      page,
      region: "BR",
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

export async function getUpcomingMovies(
  page: number = 1
): Promise<GetMoviesResponse> {
  const { data } = await api.get("/movie/upcoming", {
    params: {
      page,
      region: "BR",
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
