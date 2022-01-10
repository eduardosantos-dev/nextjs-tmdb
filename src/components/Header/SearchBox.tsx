import {
  Flex,
  Icon,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { KeyboardEvent, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const handleSearchClick = () => {
    router.push({
      pathname: "/search_results",
      query: { query: searchInput },
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <Flex
      as="label"
      flex="1"
      py="1"
      px="4"
      ml="6"
      maxW={300}
      alignSelf="center"
      color="green.400"
      position="relative"
      bg={useColorModeValue("gray.50", "gray.700")}
      borderRadius="full"
      boxShadow="sm">
      <Input
        color={useColorModeValue("gray.400", "gray.50")}
        variant="unstyled"
        mr="4"
        placeholder="Search"
        _placeholder={{ color: "gray.400" }}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        aria-label="Search"
        icon={<Icon as={RiSearchLine} />}
        size="sm"
        variant="ghost"
        borderRadius="full"
        color="green.400"
        onClick={handleSearchClick}
      />
    </Flex>
  );
}
