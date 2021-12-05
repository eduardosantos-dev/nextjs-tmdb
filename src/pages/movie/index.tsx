import React, { useMemo, useState } from "react";
import type { GetServerSideProps } from "next";
import {
  getMovieById,
  getMovies,
  useMovies,
} from "../../services/hooks/useMovies";
import { Box, Button, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { MovieCard } from "../../components/MovieCard";
import { queryClient } from "../../services/queryClient";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.scss";

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
  moviesProps: Movie[];
}

export default function Movies({ moviesProps }: MoviesProps) {
  const [page, setPage] = useState(1);

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMovies(pageParam);
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
    getNextPageParam: (lastPage: { page: number }) => lastPage.page + 1,
  });

  const movies = useMemo(() => {
    const movies = data?.pages.map((page: any) => page.movies).flat();
    return movies;
  }, [data]);

  return (
    <Flex direction="column" h="100%">
      <Header />
      <Flex
        as={Container}
        maxW="container.xl"
        my="32"
        className={styles.pageContainer}>
        <Sidebar />
        {movies && (
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchNextPage}
            hasMore={true}
            loader={<h4>Loading...</h4>}>
            <SimpleGrid flex="1" minChildWidth={200} gap="4">
              {movies &&
                movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
            </SimpleGrid>
          </InfiniteScroll>
        )}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { movies } = await getMovies(1);

  return {
    props: {
      movies,
    },
  };
};
