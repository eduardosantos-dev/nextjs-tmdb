import React from "react";
import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

interface ContentRatingProps extends BoxProps {
  rating: number;
}

export function ContentRating({ rating, ...rest }: ContentRatingProps) {
  const getTrackColor = () => {
    if (!rating) return "gray.400";

    if (rating > 7) {
      return "rgba(72, 187, 120, 0.2)";
    } else if (rating > 4) {
      return "rgba(236,201,75,0.2)";
    } else {
      return "rgba(245,101,101,0.2)";
    }
  };

  const getColor = () => {
    if (!rating) return "gray.400";

    if (rating > 7) {
      return "green.400";
    } else if (rating > 4) {
      return "yellow.400";
    } else {
      return "red.400";
    }
  };

  return (
    <Box backgroundColor="black" borderRadius="50%" w={10} h={10} {...rest}>
      <CircularProgress
        trackColor={getTrackColor()}
        value={rating * 10}
        color={getColor()}
        size="40px"
        thickness="4px">
        <CircularProgressLabel
          fontSize="sm"
          fontWeight="bold"
          display="flex"
          justifyContent="center">
          <Text fontSize="sm">{rating * 10}</Text>
          <Text fontSize="0.5rem" mt="0.5">
            %
          </Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
