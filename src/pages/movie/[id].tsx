import React from "react";
import { GetServerSideProps } from "next";
import { Text, Image, Link } from "@chakra-ui/react";
import { Params } from "next/dist/server/router";
import { getMovieById } from "../../services/hooks/useMovies";

interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  formatted_release_date: string;
  title: string;
}

interface MoviePageProps {
  movie: Movie;
}

export default function MoviePage({ movie }: MoviePageProps) {
  return (
    <>
      <h1>{movie.title}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        title={movie.title}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { movie } = await getMovieById(id);

  return {
    props: {
      movie,
    },
  };
};
