import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface ContentDetailsSidebarProps {
  children: React.ReactNode;
}
export default function ContentDetailsSidebar({
  children,
}: ContentDetailsSidebarProps) {
  return (
    <Flex
      w={{ base: "100%", md: 240 }}
      p={6}
      ml={[0, 0, 6]}
      direction="column"
      bgColor="gray.800"
      borderRadius="lg"
      mb={[10, 10, 0]}>
      {children}
    </Flex>
  );
}
