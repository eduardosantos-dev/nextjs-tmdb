import { ContentTypes, IMovie, IShow } from "../types";
import { api } from "./api";

interface MultiSearchResponse {
  content: IMovie[] | IShow[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export async function multiSearch(
  query: string,
  page: number = 1
): Promise<MultiSearchResponse> {
  const { data } = await api.get("/search/multi", {
    params: {
      query,
      page,
      region: "BR",
    },
  });

  const content = data.results.map((content: IMovie | IShow) => {
    if (content.media_type === ContentTypes.Movie) {
      return {
        ...content,
        formatted_release_date: new Date(
          content.release_date
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        formatted_first_air_date: null,
      };
    } else if (content.media_type === ContentTypes.Show) {
      return {
        ...content,
        formatted_release_date: null,
        formatted_first_air_date: new Date(
          (content as IShow).first_air_date
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
    } else if (content.media_type === ContentTypes.Person) {
      return {
        ...content,
      };
    } else {
      return {
        ...content,
      };
    }
  });

  return {
    content,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}
