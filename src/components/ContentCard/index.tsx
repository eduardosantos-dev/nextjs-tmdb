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
import { IShow, IMovie, ContentTypes, IPerson } from "../../types";
import { ContentRating } from "../ContentRating";
import CustomImage from "../CustomImage";

interface ContentCardProps extends BoxProps {
  content: IMovie | IShow | IPerson;
  contentType: ContentTypes;
}

export default function ContentCard({ content, ...rest }: ContentCardProps) {
  const [contentName, setContentName] = useState("");
  const [contentDate, setContentDate] = useState("");
  const [contentImage, setContentImage] = useState("");

  const bgColor = useColorModeValue("white", "gray.800");

  async function handlePrefetchContent(id: number) {
    await queryClient.prefetchQuery(
      [content.media_type, id],
      async () => {
        if (content.media_type === ContentTypes.Movie) {
          return await getMovieById(id);
        } else if (content.media_type === ContentTypes.Show) {
          return await getShowById(id);
        }
      },
      {
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
      }
    );
  }

  useEffect(() => {
    if (content.media_type === ContentTypes.Movie) {
      setContentName((content as IMovie).title);
      setContentDate((content as IMovie).formatted_release_date);
      setContentImage(
        `https://image.tmdb.org/t/p/w300/${(content as IMovie).poster_path}`
      );
    } else if (content.media_type === ContentTypes.Show) {
      setContentName((content as IShow).name);
      setContentDate((content as IShow).formatted_first_air_date);
      setContentImage(
        `https://image.tmdb.org/t/p/w300/${(content as IShow).poster_path}`
      );
    } else if (content.media_type === ContentTypes.Person) {
      setContentName((content as IPerson).name);
      setContentImage(
        `https://image.tmdb.org/t/p/w300/${(content as IPerson).profile_path}`
      );
    }
  }, [content.media_type, content]);

  return (
    <LinkBox>
      <LinkOverlay href={`/${content.media_type}/${content.id}`}>
        <Box
          bg={bgColor}
          borderRadius="lg"
          overflow="hidden"
          onMouseEnter={() => handlePrefetchContent(content.id)}
          h={rest.h}>
          {contentImage && (
            <CustomImage
              src={contentImage}
              alt={contentName}
              layout="fill"
              contentType={content.media_type as ContentTypes}
            />
          )}
        </Box>
        <Box px="10px" pt="26px" pb="12px" pos="relative">
          {content.media_type === ContentTypes.Movie ||
            (content.media_type === ContentTypes.Show && (
              <ContentRating
                rating={content.vote_average}
                style={{ position: "absolute", top: "-25px", left: "12px" }}
              />
            ))}
          <Text mt="0" fontWeight="bold" noOfLines={2} fontSize="sm">
            {contentName}
          </Text>
          <Text mt="1" fontSize="sm" color="gray.400">
            {content.media_type === ContentTypes.Person ? (
              <Text mt="1" fontSize="sm" color="gray.400">
                {(content as IPerson).known_for_department}
              </Text>
            ) : (
              contentDate
            )}
          </Text>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
}
