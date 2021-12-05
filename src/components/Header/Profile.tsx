import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Eduardo Santos</Text>
          <Text color="gray.300" fontSize="small">
            eduardosantos.ist@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Eduardo Santos"
        src="https://github.com/eduardosantos-dev.png"
      />
    </Flex>
  );
}
