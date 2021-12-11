import React from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import { getMovieById, getMovies } from "../../services/hooks/useMovies";
import MovieHero from "../../components/MovieHero";
import MovieDetails from "../../components/MovieDetails";
import { Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import { IMovie } from "../../types";
import MovieDetailSidebar from "../../components/MovieDetailsSidebar";
import { Sidebar } from "../../components/Sidebar";
import Head from "next/head";

interface MoviePageProps {
  movie: IMovie;
}

export default function MoviePage({ movie }: MoviePageProps) {
  return (
    <>
      {movie && (
        <>
          <Head>
            <title>tmdb • {movie.title}</title>
          </Head>

          <MovieHero movie={movie} />
          <Flex
            as={Container}
            maxW="container.2xl"
            py={6}
            direction={{ base: "column", md: "row" }}>
            <MovieDetails movie={movie} />
            <MovieDetailSidebar movie={movie} />
          </Flex>
        </>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const { content: movies } = await getMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { movie } = await getMovieById(id);

  return {
    props: { movie },
  };
};
