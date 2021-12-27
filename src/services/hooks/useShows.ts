import { useQuery, UseQueryOptions } from "react-query";
import { getShows, getShowById } from "../show";

export function useShows(page: number, options: UseQueryOptions): any {
  return useQuery(["shows", page], () => getShows(page));
}

export function useShow(id: number, options: UseQueryOptions): any {
  return useQuery(["show", id], () => getShowById(id));
}
