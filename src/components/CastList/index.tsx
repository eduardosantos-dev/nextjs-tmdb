import {
  Stack,
  Box,
  Heading,
  Text,
  Icon,
  Flex,
  Img,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { RiUserLine } from "react-icons/ri";
import { ICastMember } from "../../types";
import CustomImage from "../CustomImage";

interface CastListProps {
  cast: ICastMember[];
}

export function CastList({ cast }: CastListProps) {
  const SLIDER_MAX_LENGTH = 10;
  if (cast.length <= 0) return null;

  return (
    <Box maxW="100%">
      <Heading as="h3" fontSize="xl">
        Elenco principal
      </Heading>
      <Box
        position="relative"
        _after={{
          bgImage:
            "linear-gradient(to right, rgba(255,255,255,0) 0%, var(--chakra-colors-gray-900) 100%)",
          position: "absolute",
          width: "60px",
          height: "100%",
          top: 0,
          right: 0,
          willChange: "opacity",
          pointerEvents: "none",
          content: '""',
        }}>
        <Stack
          direction="row"
          w="100%"
          overflowX="auto"
          spacing={4}
          py={6}
          pr="6">
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
                <CustomImage
                  src={`https://image.tmdb.org/t/p/w138_and_h175_face/${castMember.profile_path}`}
                  alt={castMember.name}
                  width={138}
                  height={175}
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
      </Box>
    </Box>
  );
}
