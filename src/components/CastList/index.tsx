import {
  Stack,
  Box,
  Heading,
  Text,
  Icon,
  Flex,
  Img,
  Image,
  useColorModeValue,
  useColorMode,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { RiUserLine } from "react-icons/ri";
import { ContentTypes, ICastMember } from "../../types";
import CustomImage from "../CustomImage";

interface CastListProps {
  cast: ICastMember[];
}

export function CastList({ cast }: CastListProps) {
  const SLIDER_MAX_LENGTH = 10;
  const bgColor = useColorModeValue("white", "gray.800");
  const { colorMode } = useColorMode();

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
            colorMode === "light"
              ? "linear-gradient(to right, rgba(255,255,255,0) 0%, var(--chakra-colors-gray-50) 100%)"
              : "linear-gradient(to right, rgba(255,255,255,0) 0%, var(--chakra-colors-gray-900) 100%)",
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
              <Flex direction="column" key={castMember.credit_id}>
                <Box
                  minW={150}
                  maxH={220}
                  borderRadius="lg"
                  overflow="hidden"
                  bg={bgColor}>
                  <Link href={`/person/${castMember.id}`}>
                    <CustomImage
                      src={`https://image.tmdb.org/t/p/w276_and_h350_face/${castMember.profile_path}`}
                      alt={castMember.name}
                      contentType={ContentTypes.Person}
                      layout="fill"
                    />
                  </Link>
                </Box>
                <Box py="2">
                  <Link href={`/person/${castMember.id}`}>
                    <Text mt="2" fontWeight="bold" noOfLines={2} fontSize="sm">
                      {castMember.name}
                    </Text>
                  </Link>
                  <Text mt="2" noOfLines={2} fontSize="xs">
                    {castMember.character}
                  </Text>
                </Box>
              </Flex>
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
