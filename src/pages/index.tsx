import { Box, Container, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next/types";
import ContentSection from "../components/ContentSection";
import { Header } from "../components/Header";
import SearchHero from "../components/Home/SearchHero";
import { getMovies, getMoviesTopRated } from "../services/movie";
import { getShows, getShowsTopRated } from "../services/show";
import { ContentTypes } from "../types";

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
          title="What's Popular"
          tabs={[
            {
              label: "Movies",
              contentType: ContentTypes.Movie,
              onTabChange: getMovies,
            },
            {
              label: "TV",
              contentType: ContentTypes.Show,
              onTabChange: getShows,
            },
          ]}
        />
        <ContentSection
          title="Top rated"
          tabs={[
            {
              label: "Movies",
              contentType: ContentTypes.Movie,
              onTabChange: getMoviesTopRated,
            },
            {
              label: "TV",
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
  const { content: popularMovies } = await getMoviesTopRated(
    Math.floor(Math.random() * 10) + 1
  );

  const heroBackdropImage =
    popularMovies[Math.floor(Math.random() * popularMovies.length)]
      .backdrop_path;

  return {
    props: {
      heroBackdropImage,
    },
  };
};
