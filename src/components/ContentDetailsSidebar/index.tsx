import { Box, Flex, Heading, Text } from "@chakra-ui/react";

interface ContentDetailsSidebarProps {
  data: { label: string; value: string }[];
}
export default function ContentDetailsSidebar({
  data,
}: ContentDetailsSidebarProps) {
  return (
    <Flex
      w={{ base: "100%", md: 240 }}
      p={6}
      ml={[0, 0, 6]}
      direction="column"
      bgColor="gray.800"
      borderRadius="lg"
      mt={[10, 10, 0]}>
      {data.map(({ label, value }, index) => (
        <Box mb={6} key={index}>
          <Heading as="h4" fontSize="md">
            {label}
          </Heading>
          <Text fontSize="sm" fontWeight="normal">
            {value}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}
