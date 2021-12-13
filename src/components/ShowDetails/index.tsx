import { Flex } from "@chakra-ui/react";
import { IShow } from "../../types";
import { CastList } from "../CastList";

interface ShowDetailsProps {
  show: IShow;
}

export default function ShowDetails({ show }: ShowDetailsProps) {
  return (
    <Flex w={{ base: "100%", md: "calc(100% - 240px)" }}>
      <CastList cast={show?.credits?.cast} />
    </Flex>
  );
}
