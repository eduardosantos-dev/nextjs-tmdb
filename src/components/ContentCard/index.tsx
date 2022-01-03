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
import { getPersonById } from "../../services/person";
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
        } else if (content.media_type === ContentTypes.Person) {
          return await getPersonById(id);
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
      <Box
        bg={bgColor}
        borderRadius="lg"
        overflow="hidden"
        onMouseEnter={() => handlePrefetchContent(content.id)}
        h={rest.h}>
        {contentImage && (
          <LinkOverlay href={`/${content.media_type}/${content.id}`}>
            <CustomImage
              src={contentImage}
              alt={contentName}
              layout="fill"
              contentType={content.media_type as ContentTypes}
            />
          </LinkOverlay>
        )}
      </Box>
      <Box pt={4} pos="relative" p={2}>
        {(content.media_type == ContentTypes.Movie ||
          content.media_type == ContentTypes.Show) && (
          <ContentRating
            rating={content.vote_average}
            style={{ position: "absolute", top: "-20px", left: "5px" }}
          />
        )}
        <Link href={`/${content.media_type}/${content.id}`}>
          <Text mt={4} fontWeight="bold" noOfLines={2} fontSize="sm">
            {contentName}
          </Text>
        </Link>
        <Text mt={0} fontSize="sm" color="gray.400">
          {content.media_type === ContentTypes.Person ? (
            <>
              {(content as IPerson).known_for.map((item: IMovie | IShow) => (
                <Link
                  href={
                    item.media_type === ContentTypes.Movie
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}`
                  }
                  key={`${content.id}_${item.id}`}>
                  <Text fontSize="xs" color="gray.200" mt={1}>
                    {item.media_type === ContentTypes.Movie &&
                      (item as IMovie).title}
                    {item.media_type === ContentTypes.Show &&
                      (item as IShow).name}
                  </Text>
                </Link>
              ))}
            </>
          ) : (
            contentDate
          )}
        </Text>
      </Box>
    </LinkBox>
  );
}
