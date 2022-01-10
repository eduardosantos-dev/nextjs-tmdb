import { Flex, Box, Stack, Heading, Text } from "@chakra-ui/react";
import { IPerson } from "../../types";
import CustomImage from "../CustomImage";
import SocialMedia from "../SocialMedia";

interface PersonSidebarProps {
  person: IPerson;
}

const PersonInfo = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box>
      <Heading fontSize="md" mt={4}>
        {label}
      </Heading>

      <Text fontSize="sm">{value}</Text>
    </Box>
  );
};

export default function PersonSidebar({ person }: PersonSidebarProps) {
  return (
    <Flex mb={4} mr={[0, 6]} align={["center", "left"]} direction="column">
      <Flex mb={6} direction="column" align="center">
        <Heading
          my={2}
          size="md"
          textAlign="center"
          display={["block", "none"]}>
          {person.name}
        </Heading>
        <Box borderRadius="lg" overflow="hidden" minW={300} maxW={300}>
          <CustomImage
            src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
            alt={person.name}
            contentType={person.media_type}
            layout="fill"
          />
        </Box>

        <Stack direction="row" spacing={4} mt={2}>
          <SocialMedia
            twitter_id={person.external_ids.twitter_id}
            facebook_id={person.external_ids.facebook_id}
            instagram_id={person.external_ids.instagram_id}
          />
        </Stack>
        <Box w="full" mt={6}>
          <Heading fontSize="lg">Personal Info</Heading>
          <PersonInfo label="Known For" value={person.known_for_department} />
        </Box>
      </Flex>
    </Flex>
  );
}
