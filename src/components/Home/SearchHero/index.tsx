import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import styles from "./styles.module.scss";

interface SearchHeroProps {
  src: string;
}

export default function SearchHero({ src }: SearchHeroProps) {
  return (
    <Flex
      w="full"
      h="360px"
      bgImage={`linear-gradient(to right, rgba(28, 69, 50, 0.8), rgba(154, 230, 180, 0))`}
      direction="column"
      justify="center"
      px="10"
      py="8"
      mt={["0", "12"]}
      borderRadius={["0", "lg"]}
      position="relative"
      overflow="hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,1C4532,9AE6B4)${src}`}
        layout="fill"
        objectFit="cover"
        objectPosition="50% 50%"
        alt="tmdb"
        className={styles.image}
        priority
        quality={50}
      />
      <Box mb="6" textAlign={["center", "left"]}>
        <Heading
          as="h1"
          fontWeight="700"
          fontSize={["2xl", "3xl", "5xl"]}
          mb="2"
          color="white">
          Bem-Vindo(a).
        </Heading>
        <Heading
          as="h2"
          fontWeight="500"
          fontSize={["xl", "2xl", "3xl"]}
          mb="6"
          color="white">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </Heading>
      </Box>
      <SearchInput />
    </Flex>
  );
}
