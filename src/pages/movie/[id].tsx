import React from "react";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import { getMovieById } from "../../services/hooks/useMovies";
import MovieHero from "../../components/MovieHero";
import MovieDetails from "../../components/MovieDetails";
import { Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import { IMovie } from "../../types";
import MovieDetailSidebar from "../../components/MovieDetailsSidebar";
import { Sidebar } from "../../components/Sidebar";

interface MoviePageProps {
  movie: IMovie;
}

export default function MoviePage({ movie }: MoviePageProps) {
  return (
    <>
      <MovieHero movie={movie} />
      <Flex
        as={Container}
        maxW="container.xl"
        py={6}
        direction={{ base: "column", md: "row" }}>
        <MovieDetails movie={movie} />
        <MovieDetailSidebar movie={movie} />
      </Flex>
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
