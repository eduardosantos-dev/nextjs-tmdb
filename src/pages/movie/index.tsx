import React, { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.scss";
import Head from "next/head";
import ContentCard from "../../components/ContentCard";
import { ContentTypes } from "../../types";
import { getMovies } from "../../services/movie";
import ContentPage from "../../components/ContentPage";

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  formatted_release_date: string;
  vote_average: number;
  title: string;
}

interface MoviesProps {
  movies: Movie[];
}

export default function Movies({ movies }: MoviesProps) {
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMovies(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • Filmes populares</title>
      </Head>
      <ContentPage initialData={movies} fetchPage={fetchPage} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getMovies(1);

  return {
    props: {
      movies,
    },
  };
};
