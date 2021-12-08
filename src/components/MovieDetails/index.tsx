import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { IMovie } from "../../types";
import { CastList } from "../CastList";
import MovieDetailSidebar from "../MovieDetailsSidebar";

interface MovieDetailsProps {
  movie: IMovie;
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <Flex w={{ base: "100%", md: "calc(100% - 240px)" }} overflow="auto">
      <CastList cast={movie?.credits?.cast} />
    </Flex>
  );
}
