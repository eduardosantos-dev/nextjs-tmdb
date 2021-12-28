import {
  Flex,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchInput() {
  return (
    <Flex
      as="label"
      w="full"
      alignSelf="center"
      color="green.400"
      position="relative"
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="full"
      boxShadow="lg"
      px="6"
      py="2">
      <Input
        color={useColorModeValue("gray.400", "gray.50")}
        variant="unstyled"
        placeholder="Buscar"
        _placeholder={{ color: "gray.400" }}
      />

      <IconButton
        icon={<Icon as={RiSearchLine} />}
        color="green.400"
        fontSize="20"
        variant="unstyled"
        aria-label="Buscar"
        d="flex"
        mr="2"
      />
    </Flex>
  );
}
