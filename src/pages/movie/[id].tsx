import React, { useEffect, useState } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import MovieDetails from "../../components/MovieDetails";
import { Container, Flex, useBreakpointValue } from "@chakra-ui/react";
import { IMovie } from "../../types";
import { Sidebar } from "../../components/Sidebar";
import Head from "next/head";
import ContentDetailsSidebar from "../../components/ContentDetailsSidebar";
import ContentHeader from "../../components/ContentHeader";
import { getMovies, getMovieById } from "../../services/movie";

interface MoviePageProps {
  movie: IMovie;
}

export default function MoviePage({ movie }: MoviePageProps) {
  const [sidebarData, setSidebarData] = useState<any>();
  const [headerData, setHeaderData] = useState<any>();

  useEffect(() => {
    if (movie) {
      setSidebarData([
        { label: "Título original", value: movie.original_title },
        { label: "Situação", value: movie.status },
        { label: "Idioma original", value: movie.original_language },
        { label: "Orçamento", value: movie.formatted_budget },
        { label: "Receita", value: movie.formatted_revenue },
      ]);

      setHeaderData({
        name: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.formatted_release_date,
        runtime: movie.formatted_runtime,
        genres: movie.genres,
        overview: movie.overview,
        vote_average: movie.vote_average,
        videos: movie.videos,
      });
    }
  }, [movie]);

  return (
    <>
      {movie && (
        <>
          <Head>
            <title>tmdb • {movie.title}</title>
          </Head>

          {headerData && <ContentHeader content={headerData} />}
          <Flex
            as={Container}
            maxW="container.2xl"
            py={6}
            direction={{ base: "column", md: "row-reverse" }}>
            {sidebarData && <ContentDetailsSidebar data={sidebarData} />}
            <MovieDetails movie={movie} />
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
