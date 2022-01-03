import { Heading, Box, Stack, useColorMode, Text } from "@chakra-ui/react";
import { IMovie, IPerson, IShow } from "../../types";
import ContentCard from "../ContentCard";

interface PersonKnownForProps {
  person: IPerson;
}

export default function PersonKnownFor({ person }: PersonKnownForProps) {
  const { colorMode } = useColorMode();
  return (
    <>
      <Heading size="md" fontWeight="500" mb={4}>
        Conhecido(a) por
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
          {person &&
            person?.credits?.cast &&
            person?.credits.cast.slice(0, 19).map((content: any) => (
              <Box minW={150} key={content.id}>
                <ContentCard
                  content={content}
                  contentType={content.media_type}
                />
              </Box>
            ))}
        </Stack>
      </Box>
    </>
  );
}
