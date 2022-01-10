import { Box, Heading, Stack } from "@chakra-ui/react";
import { IPerson } from "../../types";
import ContentCard from "../ContentCard";
import GradientWrapper from "../GradientWrapper";

interface PersonKnownForProps {
  person: IPerson;
}

export default function PersonKnownFor({ person }: PersonKnownForProps) {
  return (
    <>
      <Heading size="md" fontWeight="500">
        Known For
      </Heading>
      <GradientWrapper>
        <Stack
          direction="row"
          w="100%"
          overflowX="auto"
          spacing={4}
          pt={2}
          pb={6}
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
      </GradientWrapper>
    </>
  );
}
