import {
  ContentTypes,
  ICastMember,
  ICredits,
  ICrewMember,
  IPerson,
} from "../types";
import { api } from "./api";

type GetPeopleResponse = {
  content: IPerson[];
  page: number;
  totalPages: number;
  totalResults: number;
};

interface GetPersonByIdResponse {
  person: IPerson;
}

interface IPersonResponse {
  adult: boolean;
  gender: number;
  id: number;
  known_for: [];
  known_for_department: string;
  media_type: "person";
  name: string;
  popularity: number;
  profile_path: string;
  biography: string;
}

interface GetExternalIdsResponse {
  id: number;
  freebase_mid?: string;
  freebase_id?: string;
  imdb_id?: string;
  tvrage_id?: number;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

interface GetCreditsResponse {
  id: number;
  cast: ICastMember[];
  crew: ICrewMember[];
}

export async function getPeople(page: number = 1): Promise<GetPeopleResponse> {
  const { data } = await api.get("/person/popular", {
    params: {
      page,
    },
  });

  const people = data.results.map((person: IPerson) => {
    return {
      ...person,
      media_type: ContentTypes.Person,
    };
  });

  return {
    content: people,
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}

export async function getPersonById(
  id: number
): Promise<GetPersonByIdResponse> {
  const { data } = await api.get<IPersonResponse>(`/person/${id}`);

  const externalIdsResponse = await api.get<GetExternalIdsResponse>(
    `/person/${id}/external_ids`
  );

  const credits = await api.get<GetCreditsResponse>(
    `/person/${id}/combined_credits`
  );

  const orderedCast = credits.data.cast.sort(
    (a, b) => b.popularity - a.popularity
  );

  const person: IPerson = {
    ...data,
    external_ids: externalIdsResponse.data,
    credits: {
      ...credits.data,
      cast: orderedCast,
    },
    media_type: ContentTypes.Person,
  };

  return {
    person,
  };
}
