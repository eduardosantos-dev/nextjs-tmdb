import { Flex, Box, Stack, Heading, Text } from "@chakra-ui/react";
import { IPerson } from "../../types";
import CustomImage from "../CustomImage";
import SocialMedia from "../SocialMedia";

interface PersonSidebarProps {
  person: IPerson;
}

export default function PersonSidebar({ person }: PersonSidebarProps) {
  return (
    <Flex direction="column" mr={6}>
      <Box borderRadius="lg" overflow="hidden" minW={300} maxW={300} mb={4}>
        <CustomImage
          src={`https://image.tmdb.org/t/p/w300/${person.profile_path}`}
          alt={person.name}
          contentType={person.media_type}
          layout="fill"
        />
      </Box>
      <Stack direction="row" align="center" spacing={4}>
        <SocialMedia
          twitter_id={person.external_ids.twitter_id}
          facebook_id={person.external_ids.facebook_id}
          instagram_id={person.external_ids.instagram_id}
        />
      </Stack>
      <Box mt={6}>
        <Heading size="md">Informações pessoais</Heading>

        <Box>
          <Heading size="sm" mt={4}>
            Conhecido(a) por
          </Heading>

          <Text fontSize="sm">{person.known_for_department}</Text>
        </Box>
      </Box>
    </Flex>
  );
}
