import { Box, Heading, Stack, BoxProps, useColorMode } from "@chakra-ui/react";
import { IMovie, IShow } from "../../types";
import ContentCard from "../ContentCard";
import GradientWrapper from "../GradientWrapper";

interface RecommendationsProps extends BoxProps {
  recommendations: IMovie[] | IShow[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const { colorMode } = useColorMode();

  if (recommendations.length <= 0) return null;

  return (
    <Box maxW="100%">
      <Heading as="h3" fontSize="xl">
        Recommendations
      </Heading>
      <GradientWrapper>
        <Stack
          direction="row"
          w="100%"
          overflowX="auto"
          spacing={4}
          py={6}
          pr="6">
          {recommendations &&
            recommendations.map((content: any) => (
              <Box minW={150} key={content.id}>
                <ContentCard
                  content={content}
                  contentType={content.media_type}
                />
              </Box>
            ))}
        </Stack>
      </GradientWrapper>
    </Box>
  );
}
