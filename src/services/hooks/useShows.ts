import { api } from "../api";

interface Show {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  name: string;
  formatted_first_air_date: string;
  first_air_date: string;
}

interface GetShowsResponse {
  shows: Show[];
  totalPages: number;
  totalResults: number;
}

export async function getShows(page: number): Promise<GetShowsResponse> {
  const { data } = await api.get("/tv/popular", {
    params: {
      page,
    },
  });

  const shows = data.results.map((show: Show) => {
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
    shows,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

interface GetShowByIdResponse {
  show: Show;
}

export async function getShowById(id: number): Promise<GetShowByIdResponse> {
  const { data } = await api.get(`/tv/${id}`);

  return {
    show: data,
  };
}
