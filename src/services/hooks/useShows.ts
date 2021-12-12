import { useQuery, UseQueryOptions } from "react-query";
import { IShow } from "../../types";
import { api } from "../api";
interface GetShowsResponse {
  content: IShow[];
  page: number;
  totalPages: number;
  totalResults: number;
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
interface GetShowByIdResponse {
  show: IShow;
}

export async function getShowById(id: number): Promise<GetShowByIdResponse> {
  const { data } = await api.get<IShow>(`/tv/${id}`, {
    params: {
      append_to_response: "credits,videos,images",
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
  };

  return {
    show,
  };
}

export function useShows(page: number, options: UseQueryOptions): any {
  return useQuery(["shows", page], () => getShows(page));
}

export function useShow(id: number, options: UseQueryOptions): any {
  return useQuery(["show", id], () => getShowById(id));
}
