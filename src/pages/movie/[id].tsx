import React from "react";
import { GetServerSideProps } from "next";
import { Text, Image, Link, Flex, Container, Box } from "@chakra-ui/react";
import { Params } from "next/dist/server/router";
import { getMovieById } from "../../services/hooks/useMovies";
import { Header } from "../../components/Header";
import { ContentRating } from "../../components/ContentRating";

interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  vote_average: number;
  formatted_release_date: string;
  title: string;
  genres: { id: number; name: string }[];
  formatted_runtime: string;
}

interface MoviePageProps {
  movie: Movie;
}

export default function MoviePage({ movie }: MoviePageProps) {
  return (
    <Flex
      direction="column"
      h="100%"
      bgImage={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
      bgPos="right -200px top"
      bgSize="cover"
      bgRepeat="no-repeat">
      <Header />
      <Flex
        maxW="100%"
        py="32"
        align="center"
        justifyContent="center"
        bgImg="linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 150px, rgba(3.92%, 4.31%, 6.27%, 0.84) 100%);">
        <Flex as={Container} maxW="container.xl">
          <Box borderRadius="lg" overflow="hidden" bg="gray.800">
            <Image
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              title={movie.title}
              w={300}
            />
            <Box p="6">
              <Text mt="2" fontWeight="bold" noOfLines={2}>
                {movie.title}
              </Text>
            </Box>
          </Box>
          <Flex ml="12" flexDir="column">
            <Text fontSize="3xl" fontWeight="bold">
              {movie.title}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              {movie.formatted_release_date} •{" "}
              {movie.genres.map((genre) => genre.name).join(", ")} •{" "}
              {movie.formatted_runtime}
            </Text>
            <ContentRating rating={movie.vote_average} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { movie } = await getMovieById(id);

  return {
    props: {
      movie,
    },
  };
};
