import {
  Flex,
  Container,
  Spinner,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";

import styles from "./styles.module.scss";
import React, { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentCard from "../../components/ContentCard";
import { Header } from "../../components/Header";
import { getMoviesNowPlaying, getUpcomingMovies } from "../../services/movie";
import { ContentTypes, IMovie } from "../../types";
import Head from "next/head";
import { GetStaticProps } from "next";
import ContentPage from "../../components/ContentPage";

interface MoviesProps {
  movies: IMovie[];
}

export default function Upcoming({ movies }: MoviesProps) {
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getUpcomingMovies(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • Filmes que estreiam em breve</title>
      </Head>
      <ContentPage initialData={movies} fetchPage={fetchPage} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getUpcomingMovies(1);

  return {
    props: {
      movies,
    },
  };
};
