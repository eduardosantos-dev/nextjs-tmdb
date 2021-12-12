import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { IShow } from "../../../types";

interface ShowDetailsProps {
  show: IShow;
}

export default function ShowDetailsSidebard({ show }: ShowDetailsProps) {
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
          {show.original_name}
        </Text>
      </Box>

      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Situação
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {show.status}
        </Text>
      </Box>

      <Box mb={6}>
        <Heading as="h4" fontSize="md">
          Idioma original
        </Heading>
        <Text fontSize="sm" fontWeight="normal">
          {show.original_language}
        </Text>
      </Box>
    </Flex>
  );
}
