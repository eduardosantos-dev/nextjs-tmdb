import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";

interface ContentDetailsSidebarProps {
  children: React.ReactNode;
}
export default function ContentDetailsSidebar({
  children,
}: ContentDetailsSidebarProps) {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  return (
    <Flex
      w={{ base: "100%", md: 240 }}
      p={6}
      ml={[0, 0, 6]}
      direction="column"
      bgColor={bgColor}
      borderRadius="lg"
      boxShadow="lg"
      mb={[10, 10, 0]}>
      {children}
    </Flex>
  );
}
