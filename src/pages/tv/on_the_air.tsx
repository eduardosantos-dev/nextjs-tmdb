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
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentCard from "../../components/ContentCard";
import { ContentTypes } from "../../types";
import { getOnAirShows, getShows } from "../../services/show";

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

export default function OnTheAir({ showsProps }: ShowsProps) {
  const [page, setPage] = useState(1);

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getOnAirShows(pageParam);
    return response;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "shows",
    fetchPage,
    {
      getNextPageParam: (lastPage: { page: number; totalPages: number }) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    }
  );

  const shows = useMemo(() => {
    return data?.pages.map((page: any) => page.content).flat();
  }, [data]);

  return (
    <>
      <Head>
        <title>tmdb • Séries em exibição</title>
      </Head>
      <Flex direction="column" h="100%">
        <Header />
        <Flex as={Container} maxW="container.2xl" my="28">
          {shows && (
            <InfiniteScroll
              dataLength={shows.length}
              next={fetchNextPage}
              hasMore={hasNextPage!!}
              loader={
                <Flex align="center" justify="center" mt={6} h={20}>
                  <Spinner color="green.400" size="xl" />
                </Flex>
              }>
              <Heading mb="6" fontSize="2xl">
                Séries em exibição
              </Heading>
              <SimpleGrid flex="1" columns={[2, 3, 4, 5]} gap="4">
                {shows &&
                  shows.map((show) => (
                    <ContentCard
                      content={show}
                      contentType={ContentTypes.Show}
                      key={show.id}
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
  const { content: shows } = await getOnAirShows();

  return {
    props: {
      shows,
    },
  };
};
