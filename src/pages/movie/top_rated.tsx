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
import { getMoviesTopRated } from "../../services/movie";
import { ContentTypes, IMovie } from "../../types";
import Head from "next/head";
import { GetStaticProps } from "next";
import ContentPage from "../../components/ContentPage";
interface MoviesProps {
  movies: IMovie[];
}

export default function TopRated({ movies }: MoviesProps) {
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMoviesTopRated(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • Filmes mais bem avaliados</title>
      </Head>
      <ContentPage initialData={movies} fetchPage={fetchPage} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getMoviesTopRated(1);

  return {
    props: {
      movies,
    },
  };
};
