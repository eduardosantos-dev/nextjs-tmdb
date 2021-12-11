import React from "react";
import {
  getMovies,
  getMoviesTopRated,
  useMoviesTopRated,
} from "../services/hooks/useMovies";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import SearchHero from "../components/Home/SearchHero";
import { GetStaticProps } from "next/types";
import { IMovie } from "../types";
import ContentSection from "../components/ContentSection";

interface HomeProps {
  heroBackdropImage: string;
}

export default function Home({ heroBackdropImage }: HomeProps) {
  return (
    <Flex direction="column" h="full">
      <Header />
      <Box as={Container} px={{ base: 0, xl: 4 }} maxW="container.2xl" mt="20">
        <SearchHero src={heroBackdropImage} />
      </Box>
      <Box as={Container} px="4" maxW="container.2xl" my="6">
        <ContentSection
          title="Os Mais Populares"
          tabs={[
            {
              label: "Streaming",
              contentType: "movie",
              onTabChange: getMovies,
            },
            {
              label: "Na TV",
              contentType: "movie",
              onTabChange: getMoviesTopRated,
            },
            {
              label: "Para Alugar",
              contentType: "movie",
              onTabChange: getMoviesTopRated,
            },
            {
              label: "Nos Cinemas",
              contentType: "movie",
              onTabChange: getMoviesTopRated,
            },
          ]}
        />
      </Box>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: popularMovies } = await getMovies();

  const heroBackdropImage =
    popularMovies[Math.floor(Math.random() * popularMovies.length)]
      .backdrop_path;

  return {
    props: {
      heroBackdropImage,
    },
  };
};
