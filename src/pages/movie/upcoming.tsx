import { Flex, Container, Spinner, SimpleGrid } from "@chakra-ui/react";

import styles from "./styles.module.scss";
import React, { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentCard from "../../components/ContentCard";
import { Header } from "../../components/Header";
import { getMoviesNowPlaying, getUpcomingMovies } from "../../services/movie";
import { ContentTypes } from "../../types";
import Head from "next/head";
import { GetStaticProps } from "next";

const Upcoming: React.FC = () => {
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getUpcomingMovies(pageParam);
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
        <title>tmdb • Próximas estreias</title>
      </Head>
      <Flex direction="column" h="100%">
        <Header />
        <Flex
          as={Container}
          maxW="container.2xl"
          my="32"
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
};

export default Upcoming;

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getUpcomingMovies(1);

  return {
    props: {
      movies,
    },
  };
};
