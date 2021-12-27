import { Flex, Stack } from "@chakra-ui/react";
import { IShow } from "../../types";
import { CastList } from "../CastList";
import { Recommendations } from "../Recommendations";

interface ShowDetailsProps {
  show: IShow;
}

export default function ShowDetails({ show }: ShowDetailsProps) {
  return (
    <Stack
      w={{ base: "100%", md: "calc(100% - 240px)" }}
      direction="column"
      spacing="6">
      <CastList cast={show?.credits?.cast} />
      <Recommendations recommendations={show.recommendations} />
    </Stack>
  );
}
