import React from "react";
import type { GetServerSideProps } from "next";
import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { getShows } from "../../services/hooks/useShows";
import { ShowCard } from "../../components/ShowCard";

interface Show {
  id: number;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  formatted_first_air_date: string;
  name: string;
}

interface ShowsProps {
  shows: Show[];
}

export default function Shows({ shows }: ShowsProps) {
  return (
    <Flex direction="column" h="100%">
      <Header />
      <Flex as={Container} maxW="container.xl" my="32">
        <Sidebar />

        <SimpleGrid flex="1" minChildWidth={200} gap="4">
          {shows && shows.map((show) => <ShowCard show={show} key={show.id} />)}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { shows } = await getShows(1);

  return {
    props: {
      shows,
    },
  };
};
