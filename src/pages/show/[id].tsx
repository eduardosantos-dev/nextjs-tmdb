import React from "react";
import { GetServerSideProps } from "next";
import { Text, Image, Link } from "@chakra-ui/react";
import { Params } from "next/dist/server/router";
import { getMovieById } from "../../services/hooks/useMovies";
import { getShowById } from "../../services/hooks/useShows";
import { ContentRating } from "../../components/ContentRating";
import Head from "next/head";

interface Show {
  id: number;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  formatted_first_air_date: string;
  name: string;
}

interface ShowPageProps {
  show: Show;
}

export default function ShowPage({ show }: ShowPageProps) {
  return (
    <>
      <Head>
        <title>tmdb • {show.name}</title>
      </Head>
      <h1>{show.name}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
        alt={show.name}
        title={show.name}
      />
      <ContentRating rating={show.vote_average} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { show } = await getShowById(id);

  return {
    props: {
      show,
    },
  };
};
