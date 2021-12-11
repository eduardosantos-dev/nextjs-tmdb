import { Box, BoxProps, Flex, forwardRef, Heading } from "@chakra-ui/react";
import SearchInput from "./SearchInput";

interface SearchHeroProps {
  src: string;
}

export default function SearchHero({ src }: SearchHeroProps) {
  return (
    <Flex
      w="full"
      h="360px"
      bgImage={`linear-gradient(to right, rgba(28, 69, 50, 0.8), rgba(154, 230, 180, 0)), url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,1C4532,9AE6B4)${src}')`}
      bgRepeat="no-repeat"
      bgPos="50% 50%"
      bgSize="cover"
      direction="column"
      justify="center"
      px="10"
      py="8">
      <Box mb="6" textAlign={["center", "left"]}>
        <Heading
          as="h1"
          fontWeight="700"
          fontSize={["2xl", "3xl", "5xl"]}
          mb="2">
          Bem-Vindo(a).
        </Heading>
        <Heading
          as="h2"
          fontWeight="500"
          fontSize={["xl", "2xl", "3xl"]}
          mb="6">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </Heading>
      </Box>
      <SearchInput />
    </Flex>
  );
}
