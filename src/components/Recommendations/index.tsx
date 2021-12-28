import { Box, Heading, Stack, BoxProps, useColorMode } from "@chakra-ui/react";
import { IMovie, IShow } from "../../types";
import ContentCard from "../ContentCard";

interface RecommendationsProps extends BoxProps {
  recommendations: IMovie[] | IShow[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const { colorMode } = useColorMode();

  if (recommendations.length <= 0) return null;

  return (
    <Box maxW="100%">
      <Heading as="h3" fontSize="xl">
        Recomendados
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
          {recommendations &&
            recommendations.map((content: any) => (
              <ContentCard
                key={content.id}
                content={content}
                contentType={content.media_type}
                h="300px"
                minW="140px"
              />
            ))}
        </Stack>
      </Box>
    </Box>
  );
}
