import React from "react";
import { Box } from "@chakra-ui/layout";
import { Text, Image, Link } from "@chakra-ui/react";
import { ContentRating } from "../ContentRating";

interface ShowCardProps {
  show: {
    id: number;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    name: string;
    formatted_first_air_date: string;
  };
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <Box
      maxW="md"
      boxShadow="lg"
      bg="gray.800"
      borderRadius="lg"
      overflow="hidden">
      <Link href={`/show/${show.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          alt={show.name}
          title={show.name}
        />
      </Link>
      <Box p="6" pos="relative">
        <ContentRating rating={show.vote_average} />
        <Link color="gray.200">
          <Text mt="2" fontWeight="bold" noOfLines={2}>
            {show.name}
          </Text>
        </Link>
        <Text mt="2" fontSize="sm" color="gray.400">
          {show.formatted_first_air_date}
        </Text>
      </Box>
    </Box>
  );
}
