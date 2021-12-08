import {
  Stack,
  Box,
  Image,
  Heading,
  Text,
  IconButton,
  Icon,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { RiUserLine } from "react-icons/ri";
import { ICastMember } from "../../types";

interface CastListProps {
  cast: ICastMember[];
}

export function CastList({ cast }: CastListProps) {
  const SLIDER_MAX_LENGTH = 10;
  return (
    <section>
      <Heading as="h3" fontSize="xl">
        Elenco principal
      </Heading>
      <Stack direction="row" w="100%" overflowX="auto" spacing={4} py={6}>
        {cast &&
          cast.slice(0, SLIDER_MAX_LENGTH - 1).map((castMember: any) => (
            <Box
              key={castMember.credit_id}
              w={140}
              h="300"
              minW={140}
              minH={300}
              borderRadius="lg"
              overflow="hidden"
              bg="gray.800">
              <Image
                src={`https://image.tmdb.org/t/p/w138_and_h175_face/${castMember.profile_path}`}
                bg="green.400"
                minH={175}
                alt={castMember.name}
                fallback={
                  <Flex
                    align="center"
                    justify="center"
                    minH={175}
                    bgColor="gray.700">
                    <Icon as={RiUserLine} color="green.400" w={8} h={8} />
                  </Flex>
                }
              />
              <Box py="2" px="4">
                <Text mt="2" fontWeight="bold" noOfLines={2} fontSize="sm">
                  {castMember.name}
                </Text>
                <Text mt="2" noOfLines={2} fontSize="xs">
                  {castMember.character}
                </Text>
              </Box>
            </Box>
          ))}
      </Stack>
    </section>
  );
}
