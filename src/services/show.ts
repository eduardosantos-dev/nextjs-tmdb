import { ICredits, IGenre, IMovie, IShow, IVideo } from "../types";
import { api } from "./api";

interface IShowResponse {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  name: string;
  formatted_first_air_date: string;
  first_air_date: string;
  genres: IGenre[];
  backdrop_path: string;
  overview: string;
  credits: ICredits;
  status: string;
  original_name: string;
  original_language: string;
  number_of_episodes: string;
  videos: {
    results: IVideo[];
  };
  recommendations: {
    results: IMovie[] | IShow[];
  };
}

interface GetShowsResponse {
  content: IShow[];
  page: number;
  totalPages: number;
  totalResults: number;
}

interface GetShowByIdResponse {
  show: IShow;
}

export async function getShows(page: number = 1): Promise<GetShowsResponse> {
  const { data } = await api.get("/tv/popular", {
    params: {
      page,
    },
  });

  const shows = data.results.map((show: IShow) => {
    return {
      ...show,
      formatted_first_air_date: new Date(
        show.first_air_date
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  });

  return {
    content: shows,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

export async function getShowById(id: number): Promise<GetShowByIdResponse> {
  const { data } = await api.get<IShowResponse>(`/tv/${id}`, {
    params: {
      append_to_response: "credits,videos,images,recommendations",
    },
  });

  const show = {
    ...data,
    formatted_first_air_date: new Date(data.first_air_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ),
    recommendations: data.recommendations.results,
    videos: data.videos.results,
  };

  return {
    show,
  };
}

interface GetTopRatedShowsResponse {
  content: IShow[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export async function getShowsTopRated(
  page: number = 1
): Promise<GetTopRatedShowsResponse> {
  const { data } = await api.get("/tv/top_rated", {
    params: {
      page,
    },
  });

  const shows = data.results.map((show: IShow) => {
    return {
      ...show,
      formatted_first_air_date: new Date(
        show.first_air_date
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
  });

  return {
    content: shows,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}
