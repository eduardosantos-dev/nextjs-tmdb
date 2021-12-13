import {
  useBreakpointValue,
  Flex,
  Container,
  Box,
  Img,
  Heading,
  Stack,
  IconButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  RiPlayListAddLine,
  RiHeartLine,
  RiBookmarkLine,
  RiStarLine,
  RiPlayLine,
} from "react-icons/ri";
import { useVideoModal } from "../../context/ModalContext";
import movie from "../../pages/movie";
import {
  ContentTypes,
  IGenre,
  IMovie,
  IShow,
  IVideo,
  IVideos,
} from "../../types";
import { ContentRating } from "../ContentRating";
import { Header } from "../Header";
import VideoModal from "../VideoModal";

interface ContentHeaderProps {
  content: {
    name: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: string;
    genres: IGenre[];
    videos: IVideos;
    vote_average: number;
    overview: string;
    number_of_episodes?: number;
  };
}

export default function ContentHeader({ content }: ContentHeaderProps) {
  const [video, setVideo] = useState<IVideo>();

  const { onOpen } = useVideoModal();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    const { videos } = content;
    const video: any = videos.results
      .filter(
        (video: IVideo) =>
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

    if (video) {
      setVideo(video);
    }
  }, [content]);

  return (
    <>
      {video && (
        <VideoModal
          contentTitle={content.name}
          src={`https://www.youtube.com/embed/${video.key}`}
        />
      )}
      {content && (
        <Flex
          direction="column"
          h="100%"
          bgImage={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${content.backdrop_path}`}
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
                  src={`https://image.tmdb.org/t/p/w300/${content.poster_path}`}
                  alt={content.name}
                  title={content.name}
                  w={300}
                  h={450}
                />
                <Box p="6">
                  <Text mt="2" fontWeight="bold" noOfLines={2}>
                    {content.name}
                  </Text>
                </Box>
              </Box>
              <Flex ml={[0, 4, 6, 8]} mt={[6, 6, 0]} flexDir="column" flex="1">
                <Heading as="h1">{content.name}</Heading>
                <Text fontSize="sm">
                  {content.release_date} •{" "}
                  {content.genres.map((genre: IGenre) => genre.name).join(", ")}{" "}
                  {content.runtime && `• ${content.runtime}`}
                  {content.number_of_episodes &&
                    `• ${content.number_of_episodes} episódios`}
                </Text>
                <Stack
                  direction={["column", "column", "row"]}
                  mt={6}
                  spacing={4}
                  align={["center"]}>
                  <ContentRating
                    rating={content.vote_average}
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
                <Text mt={4}>{content.overview}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
