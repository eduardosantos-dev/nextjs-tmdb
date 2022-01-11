import { Box, Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
      direction="column">
      <Spinner color="green.400" size="xl" />
      <Text mt={4}>Loading...</Text>
    </Flex>
  );
}
