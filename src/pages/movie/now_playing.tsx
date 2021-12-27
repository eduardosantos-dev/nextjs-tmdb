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
import { ContentTypes, IMovie } from "../../types";
import { getMovies, getMoviesNowPlaying } from "../../services/movie";

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
  moviesProps: IMovie[];
}

export default function NowPlaying({ moviesProps }: MoviesProps) {
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMoviesNowPlaying(pageParam);
    return response;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery("movies", fetchPage, {
    getNextPageParam: (lastPage: { page: number; totalPages: number }) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const movies = useMemo(() => {
    return data?.pages.map((page: any) => page.content).flat();
  }, [data]);

  return (
    <>
      <Head>
        <title>tmdb • Filmes em cartaz</title>
      </Head>
      <Flex direction="column" h="100%">
        <Header />
        <Flex
          as={Container}
          maxW="container.2xl"
          my="28"
          className={styles.pageContainer}>
          {movies && (
            <InfiniteScroll
              dataLength={movies.length}
              next={fetchNextPage}
              hasMore={hasNextPage!!}
              loader={
                <Flex align="center" justify="center" mt={6} h={20}>
                  <Spinner color="green.400" size="xl" />
                </Flex>
              }>
              <Heading mb="6" fontSize="2xl">
                Filmes em cartaz
              </Heading>
              <SimpleGrid flex="1" columns={[2, 3, 4, 5]} gap="4">
                {movies &&
                  movies.map((movie) => (
                    <ContentCard
                      content={movie}
                      contentType={ContentTypes.Movie}
                      key={movie.id}
                    />
                  ))}
              </SimpleGrid>
            </InfiniteScroll>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getMoviesNowPlaying(1);

  return {
    props: {
      movies,
    },
  };
};
