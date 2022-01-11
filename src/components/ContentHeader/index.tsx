import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  RiBookmarkLine,
  RiHeartLine,
  RiPlayLine,
  RiPlayListAddLine,
  RiStarLine,
} from "react-icons/ri";
import { useVideoModal } from "../../context/ModalContext";
import { ContentTypes, IGenre, IVideo } from "../../types";
import { ContentRating } from "../ContentRating";
import CustomImage from "../CustomImage";
import { Header } from "../Header";
import VideoModal from "../VideoModal";
import styles from "./styles.module.scss";

interface ContentHeaderProps {
  content: {
    name: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: string;
    genres: IGenre[];
    videos: IVideo[];
    vote_average: number;
    overview: string;
    number_of_episodes?: number;
    media_type: ContentTypes;
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
    const video: any = videos
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

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <>
      {video && (
        <VideoModal
          contentTitle={content.name}
          src={`https://www.youtube.com/embed/${video.key}`}
        />
      )}
      {content && (
        <Flex direction="column" h="100%" position="relative">
          <Image
            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${content.backdrop_path}`}
            layout="fill"
            objectFit="cover"
            objectPosition={"50% 50%"}
            alt={content.name}
            className={styles.heroBackgroundImage}
            priority
          />
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
              direction={["column", "column", "row"]}
              flexWrap="wrap">
              <Box
                borderRadius="lg"
                overflow="hidden"
                bg={bgColor}
                minW={300}
                maxW={300}
                mx="auto"
                flex="1">
                <CustomImage
                  src={`https://image.tmdb.org/t/p/w300/${content.poster_path}`}
                  alt={content.name}
                  contentType={content.media_type as ContentTypes}
                  layout="fill"
                />
                <Box p="6">
                  <Text mt="2" fontWeight="bold" noOfLines={2}>
                    {content.name}
                  </Text>
                </Box>
              </Box>
              <Flex ml={[0, 4, 6, 8]} mt={[6, 6, 0]} flexDir="column" flex="1">
                <Heading as="h1" color="whiteAlpha.800">
                  {content.name}
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.800">
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
                            <Text>Play Trailer</Text>
                          </Button>
                        ) : (
                          <IconButton
                            variant="outline"
                            colorScheme="green"
                            aria-label="Play Trailer"
                            icon={<RiPlayLine />}
                            onClick={onOpen}
                          />
                        )}
                      </>
                    )}
                  </Stack>
                </Stack>
                <Heading
                  as="h3"
                  fontSize="xl"
                  mt={6}
                  fontWeight="500"
                  color="whiteAlpha.800">
                  Overview
                </Heading>
                <Text mt={4} color="whiteAlpha.800">
                  {content.overview}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
