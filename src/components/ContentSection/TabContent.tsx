import { Box, Stack, useColorMode } from "@chakra-ui/react";
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
  const { colorMode } = useColorMode();
  return (
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
        pr="8">
        {contentList.map((content) => (
          <Box key={content.id} minW={150}>
            <ContentCard content={content} contentType={contentType} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
