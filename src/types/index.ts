export interface IMovie {
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
  videos: IVideo[];
  recommendations: IMovie[] | IShow[];
  media_type: string;
}

export interface IVideo {
  type: string;
  official: boolean;
  site: string;
  key: string;
  published_at: string;
}
export interface IShow {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  name: string;
  formatted_first_air_date: string;
  first_air_date: string;
  videos: IVideo[];
  genres: IGenre[];
  backdrop_path: string;
  overview: string;
  credits: ICredits;
  status: string;
  original_name: string;
  original_language: string;
  number_of_episodes: string;
  recommendations: IMovie[] | IShow[];
  media_type: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ICredits {
  id: number;
  cast: ICastMember[];
  crew: ICrewMember[];
}

export interface ICastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface ICrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface IContentType {
  name: "movie" | "tv";
}

export enum ContentTypes {
  Movie = "movie",
  Show = "tv",
  Person = "person",
}
