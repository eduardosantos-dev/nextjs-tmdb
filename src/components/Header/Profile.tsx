import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      <Avatar
        size="md"
        name="Eduardo Santos"
        src="https://github.com/eduardosantos-dev.png"
        w={50}
        h={50}
      />
    </Flex>
  );
}
