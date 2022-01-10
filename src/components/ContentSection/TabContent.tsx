import { Box, Stack, useColorMode } from "@chakra-ui/react";
import { ContentTypes, IMovie } from "../../types";
import ContentCard from "../ContentCard";
import GradientWrapper from "../GradientWrapper";

interface ContentSectionProps {
  contentList: IMovie[];
  contentType: ContentTypes;
  onTabChange?: (page: number) => any;
}

export default function TabContent({
  contentList,
  contentType,
}: ContentSectionProps) {
  return (
    <GradientWrapper>
      <Stack
        direction="row"
        w="100%"
        overflowX="auto"
        spacing={4}
        py={6}
        pr="8">
        {contentList.map((content) => (
          <Box key={content.id} minW={150}>
            <ContentCard content={content} contentType={contentType} />
          </Box>
        ))}
      </Stack>
    </GradientWrapper>
  );
}
