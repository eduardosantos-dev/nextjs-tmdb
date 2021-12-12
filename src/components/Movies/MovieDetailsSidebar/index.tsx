import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { IMovie } from "../../../types";

interface MovieDetailsProps {
  movie: IMovie;
}

export default function MovieDetailSidebar({ movie }: MovieDetailsProps) {
  return (
    <Flex
      w={{ base: "100%", md: 240 }}
      p={6}
      ml={[0, 0, 6]}
      direction="column"
      bgColor="gray.800"
      borderRadius="lg"
      mt={[10, 10, 0]}>
      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Título original
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {movie.original_title}
        </Text>
      </Box>

      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Situação
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {movie.status}
        </Text>
      </Box>

      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Idioma original
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {movie.original_language}
        </Text>
      </Box>

      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Orçamento
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {movie.formatted_budget}
        </Text>
      </Box>

      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Receita
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {movie.formatted_revenue}
        </Text>
      </Box>
    </Flex>
  );
}
