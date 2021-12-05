import React from "react";
import type { GetServerSideProps } from "next";
import { getMovies } from "../../services/hooks/useMovies";
import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { MovieCard } from "../../components/MovieCard";

interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  formatted_release_date: string;
  title: string;
}

interface MoviesProps {
  movies: Movie[];
}

export default function Movies({ movies }: MoviesProps) {
  return (
    <Flex direction="column" h="100%">
      <Header />
      <Flex as={Container} maxW="container.xl" my="32">
        <Sidebar />

        <SimpleGrid flex="1" minChildWidth={200} gap="4">
          {movies &&
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
        </SimpleGrid>
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
