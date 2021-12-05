import React from "react";
import { Box } from "@chakra-ui/layout";
import { Text, Image, Link } from "@chakra-ui/react";
import { ContentRating } from "../ContentRating";
import { queryClient } from "../../services/queryClient";
import { getMovieById } from "../../services/hooks/useMovies";

interface MovieCardProps {
  movie: {
    id: number;
    poster_path: string;
    release_date: string;
    vote_average: number;
    title: string;
    formatted_release_date: string;
  };
}

export function MovieCard({ movie, ...rest }: MovieCardProps) {
  async function handlePrefetchMovie(movieId: number) {
    await queryClient.prefetchQuery(
      ["movie", movieId],
      async () => {
        return await getMovieById(movieId);
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  return (
    <Box
      maxW="md"
      boxShadow="lg"
      bg="gray.800"
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={() => handlePrefetchMovie(movie.id)}>
      <Link href={`/movie/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          title={movie.title}
        />
      </Link>
      <Box p="6" pos="relative">
        <ContentRating
          rating={movie.vote_average}
          style={{ position: "absolute", top: "-18px" }}
        />
        <Link color="gray.200" href={`/movie/${movie.id}`}>
          <Text mt="2" fontWeight="bold" noOfLines={2}>
            {movie.title}
          </Text>
        </Link>
        <Text mt="2" fontSize="sm" color="gray.400">
          {movie.formatted_release_date}
        </Text>
      </Box>
    </Box>
  );
}
