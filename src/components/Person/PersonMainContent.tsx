import { Box, Heading, Stack, Text, useColorMode } from "@chakra-ui/react";
import { IPerson } from "../../types";
import PersonKnownFor from "./PersonKnownFor";

interface PersonMainContentProps {
  person: IPerson;
}

export default function PersonMainContent({ person }: PersonMainContentProps) {
  return (
    <Box maxW="full">
      <Box>
        <Heading>{person.name}</Heading>
        <Box mt={6}>
          <Heading size="md" fontWeight="500" mb={4}>
            Biografia
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
