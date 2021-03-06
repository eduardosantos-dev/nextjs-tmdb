import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";
import { IPerson } from "../../types";
import PersonKnownFor from "./PersonKnownFor";

interface PersonMainContentProps extends BoxProps {
  person: IPerson;
}

export default function PersonMainContent({
  person,
  ...rest
}: PersonMainContentProps) {
  return (
    <Box {...rest}>
      <Box>
        <Heading display={{ base: "none", md: "block" }}>{person.name}</Heading>
        <Box mt={[0, 6]}>
          <Heading size="md" fontWeight="500" mb={4}>
            Biography
          </Heading>
          <Text
            fontSize="sm"
            dangerouslySetInnerHTML={{ __html: person.biography }}></Text>
        </Box>
      </Box>

      <Box mt={6}>
        <PersonKnownFor person={person} />
      </Box>
    </Box>
  );
}
