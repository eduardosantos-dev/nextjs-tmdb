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
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

interface GetMovieByIdResponse {
  movie: Movie;
}

export async function getMovieById(id: number): Promise<GetMovieByIdResponse> {
  const { data } = await api.get(`/movie/${id}`);

  return {
    movie: data,
  };
}
