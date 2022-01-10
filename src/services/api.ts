import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  // params: { language: `pt-BR` },
  headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}` },
});
