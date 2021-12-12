import { Box, Stack } from "@chakra-ui/react";
import { IMovie } from "../../types";
import { MovieCard } from "../Movies/MovieCard";

interface ContentSectionProps {
  contentList: IMovie[];
  contentType: "movie" | "show" | "person";
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
        {contentType === "movie" &&
          contentList &&
          contentList.map((movie) => (
            <Box key={movie.id}>
              <MovieCard movie={movie} h="350px" minW="150px" />
            </Box>
          ))}
      </Stack>
    </Box>
  );
}
