import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { Header } from "../components/Header";
import SearchHero from "../components/Home/SearchHero";
import { GetStaticProps } from "next/types";
import { ContentTypes, IMovie } from "../types";
import ContentSection from "../components/ContentSection";
import { getMovies, getMoviesTopRated } from "../services/movie";
import { getShows, getShowsTopRated } from "../services/show";

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
              label: "Filmes",
              contentType: ContentTypes.Movie,
              onTabChange: getMovies,
            },
            {
              label: "Na TV",
              contentType: ContentTypes.Show,
              onTabChange: getShows,
            },
          ]}
        />
        <ContentSection
          title="Os Melhores"
          tabs={[
            {
              label: "Filmes",
              contentType: ContentTypes.Movie,
              onTabChange: getMoviesTopRated,
            },
            {
              label: "Séries",
              contentType: ContentTypes.Show,
              onTabChange: getShowsTopRated,
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
