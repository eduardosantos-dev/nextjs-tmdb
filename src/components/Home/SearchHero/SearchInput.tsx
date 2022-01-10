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

export default function SearchInput() {
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
        placeholder="Search"
        _placeholder={{ color: "gray.400" }}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <IconButton
        icon={<Icon as={RiSearchLine} />}
        color="green.400"
        fontSize="20"
        variant="ghost"
        borderRadius="full"
        aria-label="Search"
        d="flex"
        mr="2"
        onClick={handleSearchClick}
      />
    </Flex>
  );
}
