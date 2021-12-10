import React from "react";
import {
  Flex,
  Icon,
  IconButton,
  Link,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";
import { Sidebar } from "../Sidebar";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Flex
        as="header"
        w="100%"
        h="20"
        mx="auto"
        align="center"
        position="fixed"
        backgroundColor="gray.800"
        zIndex="1"
        boxShadow="xl">
        <Flex
          maxW="container.xl"
          w="100%"
          mx="auto"
          px="4"
          align="center"
          justifyContent="space-between">
          {!isWideVersion && (
            <IconButton
              icon={<Icon as={RiMenuLine} />}
              fontSize="24"
              variant="unstyled"
              onClick={onOpen}
              aria-label="Open navigation"
              mr="2"
            />
          )}
          <Link href="/movie" mr={6} _hover={{ textDecoration: "none" }}>
            <Logo />
          </Link>
          <Flex justify="space-between" flex="1" mx={6}>
            {isWideVersion && <Navigation />}
            {isWideVersion && <SearchBox />}
          </Flex>

          <Flex align="center" ml="auto">
            <Profile showProfileData={isWideVersion} />
          </Flex>
        </Flex>
      </Flex>
      {isWideVersion === false && <Sidebar />}
    </>
  );
}
