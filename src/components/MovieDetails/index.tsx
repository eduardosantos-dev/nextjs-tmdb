import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import { IMovie } from "../../types";
import { CastList } from "../CastList";
import { Recommendations } from "../Recommendations";

interface MovieDetailsProps {
  movie: IMovie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <Stack
      w={{ base: "100%", md: "calc(100% - 240px)" }}
      direction="column"
      spacing="6">
      <CastList cast={movie?.credits?.cast} />
      <Recommendations recommendations={movie.recommendations} />
    </Stack>
  );
}
