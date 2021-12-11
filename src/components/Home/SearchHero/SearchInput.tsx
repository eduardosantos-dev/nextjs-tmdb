import { Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchInput() {
  return (
    <Flex
      as="label"
      w="full"
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.700"
      borderRadius="full"
      px="6"
      py="2">
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar"
        _placeholder={{ color: "gray.400" }}
      />

      <IconButton
        icon={<Icon as={RiSearchLine} />}
        fontSize="20"
        variant="unstyled"
        aria-label="Buscar"
        d="flex"
        mr="2"
      />
    </Flex>
  );
}
