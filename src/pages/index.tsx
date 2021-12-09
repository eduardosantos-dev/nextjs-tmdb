import React from "react";
import { getMovies } from "../services/hooks/useMovies";
import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import Movies from "./movie";

export default function Home() {
  return (
    <Flex direction="column" h="100%">
      <Header />
      <Flex as={Container} maxW="container.xl" my="32"></Flex>
    </Flex>
  );
}
