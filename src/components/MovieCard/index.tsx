import React from "react";
import { Box } from "@chakra-ui/layout";
import { Text, Image, Link } from "@chakra-ui/react";
import { ContentRating } from "../ContentRating";

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

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Box
      maxW="md"
      boxShadow="lg"
      bg="gray.800"
      borderRadius="lg"
      overflow="hidden">
      <Link href={`/movie/${movie.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          title={movie.title}
        />
      </Link>
      <Box p="6" pos="relative">
        <ContentRating rating={movie.vote_average} />
        <Link color="gray.200">
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
