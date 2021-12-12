import React from "react";
import { Box, BoxProps } from "@chakra-ui/layout";
import { Text, Image, Link, Img, Skeleton } from "@chakra-ui/react";
import { ContentRating } from "../../ContentRating";
import { IShow } from "../../../types";
import { queryClient } from "../../../services/queryClient";
import { getShowById } from "../../../services/hooks/useShows";

interface ShowCardProps extends BoxProps {
  show: IShow;
}

export function ShowCard({ show, ...rest }: ShowCardProps) {
  async function handlePrefetchMovie(showId: number) {
    await queryClient.prefetchQuery(
      ["show", showId],
      async () => {
        return await getShowById(showId);
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      }
    );
  }

  return (
    <Box
      boxShadow="lg"
      bg="gray.800"
      borderRadius="lg"
      overflow="hidden"
      onMouseEnter={() => handlePrefetchMovie(show.id)}
      h={rest.h}
      minW={rest.minW}>
      <Link href={`/show/${show.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w300/${show.poster_path}`}
          alt={show.name}
          title={show.name}
          w="100%"
          maxH="450px"
          fallback={<Skeleton w="100%" h="450px" />}
        />
      </Link>
      <Box px="10px" pt="26px" pb="12px" pos="relative">
        <ContentRating
          rating={show.vote_average}
          style={{ position: "absolute", top: "-18px", left: "12px" }}
        />
        <Link color="gray.200" href={`/show/${show.id}`}>
          <Text mt="2" fontWeight="bold" noOfLines={2} fontSize="sm">
            {show.name}
          </Text>
        </Link>
        <Text mt="2" fontSize="sm" color="gray.400">
          {show.formatted_first_air_date}
        </Text>
      </Box>
    </Box>
  );
}
