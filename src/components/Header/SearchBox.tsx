import { Flex, Icon, Input, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  return (
    <Flex
      as="label"
      flex="1"
      py="2"
      px="4"
      ml="6"
      maxW={300}
      alignSelf="center"
      color="green.400"
      position="relative"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="full"
      boxShadow="lg">
      <Input
        color={useColorModeValue("gray.400", "gray.50")}
        variant="unstyled"
        mr="4"
        placeholder="Buscar"
        _placeholder={{ color: "gray.400" }}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
