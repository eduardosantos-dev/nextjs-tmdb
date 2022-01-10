import { Avatar, Flex, FlexProps } from "@chakra-ui/react";

interface ProfileProps extends FlexProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true, ...props }: ProfileProps) {
  return (
    <Flex align="center" {...props}>
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
