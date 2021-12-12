import React, { useMemo, useState } from "react";
import type { GetServerSideProps, GetStaticProps } from "next";
import { Container, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { getShows } from "../../services/hooks/useShows";
import { ShowCard } from "../../components/Shows/ShowCard";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { getMovies } from "../../services/hooks/useMovies";

interface Show {
  id: number;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  formatted_first_air_date: string;
  name: string;
}

interface ShowsProps {
  showsProps: Show[];
}

export default function Shows({ showsProps }: ShowsProps) {
  const [page, setPage] = useState(1);

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getShows(pageParam);
    return response;
  };

  const { data, fetchNextPage } = useInfiniteQuery("shows", fetchPage, {
    getNextPageParam: (lastPage: { page: number }) => lastPage.page + 1,
  });

  const shows = useMemo(() => {
    return data?.pages.map((page: any) => page.content).flat();
  }, [data]);

  return (
    <>
      <Head>
        <title>tmdb • Popular movies</title>
      </Head>
      <Flex direction="column" h="100%">
        <Header />
        <Flex as={Container} maxW="container.2xl" my="32">
          {shows && (
            <InfiniteScroll
              dataLength={shows.length}
              next={fetchNextPage}
              hasMore={true}
              loader={
                <Flex align="center" justify="center" mt={6} h={20}>
                  <Spinner color="green.400" size="xl" />
                </Flex>
              }>
              <SimpleGrid flex="1" columns={[2, 3, 4, 5]} gap="4">
                {shows &&
                  shows.map((show) => <ShowCard show={show} key={show.id} />)}
              </SimpleGrid>
            </InfiniteScroll>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: shows } = await getShows();

  return {
    props: {
      shows,
    },
  };
};
