import {
  Box,
  BoxProps,
  Skeleton,
  Text,
  Link,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getMovieById } from "../../services/movie";
import { queryClient } from "../../services/queryClient";
import { getShowById } from "../../services/show";
import { IShow, IMovie, ContentTypes } from "../../types";
import { ContentRating } from "../ContentRating";
import CustomImage from "../CustomImage";

interface ContentCardProps extends BoxProps {
  content: IMovie | IShow;
  contentType: ContentTypes;
}

export default function ContentCard({
  content,
  contentType,
  ...rest
}: ContentCardProps) {
  const [contentName, setContentName] = useState("");
  const [contentDate, setContentDate] = useState("");

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  async function handlePrefetchContent(id: number) {
    await queryClient.prefetchQuery(
      [contentType, id],
      async () => {
        if (contentType === ContentTypes.Movie) {
          return await getMovieById(id);
        } else if (contentType === ContentTypes.Show) {
          return await getShowById(id);
        }
      },
      {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
      }
    );
  }

  useEffect(() => {
    if (contentType === ContentTypes.Movie) {
      setContentName((content as IMovie).title);
      setContentDate((content as IMovie).formatted_release_date);
    } else if (contentType === ContentTypes.Show) {
      setContentName((content as IShow).name);
      setContentDate((content as IShow).formatted_first_air_date);
    }
  }, [contentType, content]);

  return (
    <LinkBox>
      <Box
        bg={bgColor}
        borderRadius="lg"
        overflow="hidden"
        onMouseEnter={() => handlePrefetchContent(content.id)}
        h={rest.h}
        minW={rest.minW}>
        <LinkOverlay href={`/${contentType}/${content.id}`}>
          <CustomImage
            src={`https://image.tmdb.org/t/p/w300/${content.poster_path}`}
            alt={contentName}
            width={280}
            height={400}
            objectFit="cover"
          />
        </LinkOverlay>
        <Box px="10px" pt="26px" pb="12px" pos="relative">
          <ContentRating
            rating={content.vote_average}
            style={{ position: "absolute", top: "-18px", left: "12px" }}
          />
          <LinkOverlay color={textColor} href={`/${contentType}/${content.id}`}>
            <Text mt="2" fontWeight="bold" noOfLines={2} fontSize="sm">
              {contentName}
            </Text>
          </LinkOverlay>
          <Text mt="2" fontSize="sm" color="gray.400">
            {contentDate}
          </Text>
        </Box>
      </Box>
    </LinkBox>
  );
}
