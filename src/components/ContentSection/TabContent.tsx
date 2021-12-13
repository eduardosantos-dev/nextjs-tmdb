import { Box, Stack } from "@chakra-ui/react";
import { ContentTypes, IMovie } from "../../types";
import ContentCard from "../ContentCard";

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
        pr="8">
        {/* {contentType === "movie" &&
          contentList &&
          contentList.map((movie) => (
            <Box key={movie.id}>
              <MovieCard movie={movie} h="350px" minW="150px" />
            </Box>
          ))} */}
        {contentList.map((content) => (
          <Box key={content.id}>
            <ContentCard
              content={content}
              contentType={contentType}
              h="350px"
              minW="150px"
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
