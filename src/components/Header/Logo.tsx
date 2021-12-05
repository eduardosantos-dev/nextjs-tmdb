import { Text } from "@chakra-ui/react";

export function Logo() {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64">
      tmdb
      <Text as="span" ml="1" color="green.400">
        .
      </Text>
    </Text>
  );
}
