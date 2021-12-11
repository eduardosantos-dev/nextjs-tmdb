import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
  IconButton,
  Button,
  useBreakpointValue,
  Img,
} from "@chakra-ui/react";
import React from "react";
import {
  RiPlayListAddLine,
  RiHeartLine,
  RiBookmarkLine,
  RiStarLine,
  RiPlayLine,
} from "react-icons/ri";
import { useModal } from "../../context/ModalContext";
import { IMovie } from "../../types";
import { ContentRating } from "../ContentRating";
import { Header } from "../Header";
import VideoModal from "../VideoModal";

interface Genre {
  id: number;
  name: string;
}

interface MovieHeroProps {
  movie: IMovie;
}

export default function MovieHero({ movie }: MovieHeroProps) {
  const { onOpen } = useModal();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { videos } = movie;

  const video = videos.results
    .filter(
      (video) =>
        video.type === "Trailer" &&
        video.official === true &&
        video.site === "YouTube"
    )
    .sort((a, b) => {
      let x = a.published_at.toLowerCase();
      let y = b.published_at.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    })
    .shift();

  return (
    <>
      {video && (
        <VideoModal
          contentTitle={movie.title}
          src={`https://www.youtube.com/embed/${video.key}`}
        />
      )}
      <Flex
        direction="column"
        h="100%"
        bgImage={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
        bgPos="right -200px top"
        bgSize="cover"
        bgRepeat="no-repeat">
        <Header />
        <Flex
          maxW="100%"
          mt="20"
          py="45px"
          align="center"
          justifyContent="center"
          bgImg="linear-gradient(to right, rgba(3.92%, 4.31%, 6.27%, 1.00) 150px, rgba(3.92%, 4.31%, 6.27%, 0.84) 100%);">
          <Flex
            as={Container}
            maxW="container.2xl"
            direction={["column", "row"]}
            flexWrap="wrap">
            <Box
              borderRadius="lg"
              overflow="hidden"
              bg="gray.800"
              minW={300}
              maxW={300}
              mx="auto"
              flex="1">
              <Img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
                title={movie.title}
                w={300}
                h={450}
              />
              <Box p="6">
                <Text mt="2" fontWeight="bold" noOfLines={2}>
                  {movie.title}
                </Text>
              </Box>
            </Box>
            <Flex ml={[0, 4, 6, 8]} mt={[6, 6, 0]} flexDir="column" flex="1">
              <Heading as="h1">{movie.title}</Heading>
              <Text fontSize="sm">
                {movie.formatted_release_date} •{" "}
                {movie.genres.map((genre: Genre) => genre.name).join(", ")} •{" "}
                {movie.formatted_runtime}
              </Text>
              <Stack
                direction={["column", "column", "row"]}
                mt={6}
                spacing={4}
                align={["center"]}>
                <ContentRating
                  rating={movie.vote_average}
                  size={"60px"}
                  textFontSize="lg"
                />
                <Stack spacing={4} align="center" direction="row">
                  <IconButton
                    variant="outline"
                    colorScheme="green"
                    aria-label="Adicionar a uma lista"
                    icon={<RiPlayListAddLine />}
                  />
                  <IconButton
                    variant="outline"
                    colorScheme="green"
                    aria-label="Adicionar aos favoritos"
                    icon={<RiHeartLine />}
                  />
                  <IconButton
                    variant="outline"
                    colorScheme="green"
                    aria-label="Adicionar à sua lista de interesses"
                    icon={<RiBookmarkLine />}
                  />
                  <IconButton
                    variant="outline"
                    colorScheme="green"
                    aria-label="Avalie!"
                    icon={<RiStarLine />}
                  />

                  {video && (
                    <>
                      {isWideVersion ? (
                        <Button
                          leftIcon={<RiPlayLine />}
                          colorScheme="green"
                          variant="outline"
                          onClick={onOpen}>
                          <Text>Reproduzir trailer</Text>
                        </Button>
                      ) : (
                        <IconButton
                          variant="outline"
                          colorScheme="green"
                          aria-label="Reproduzir trailer"
                          icon={<RiPlayLine />}
                          onClick={onOpen}
                        />
                      )}
                    </>
                  )}
                </Stack>
              </Stack>
              <Heading as="h3" fontSize="xl" mt={6} fontWeight="500">
                Sinopse
              </Heading>
              <Text mt={4}>{movie.overview}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
