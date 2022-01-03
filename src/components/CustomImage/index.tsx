import { AspectRatio, Box, chakra, Icon, IconButton } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";
import { useEffect, useState } from "react";
import {
  RiHeartLine,
  RiMovie2Line,
  RiMovieLine,
  RiTvLine,
  RiUserLine,
} from "react-icons/ri";
import { ContentTypes } from "../../types";

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
      "maxHeight",
      "layout",
      "hasShimmer",
      "onError",
    ].includes(prop),
});

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality}`;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

interface CustomImageProps extends ImageProps {
  hasShimmer?: Boolean;
  contentType: ContentTypes;
}

export default function CustomImage({
  src,
  alt,
  width,
  quality,
  height,
  layout,
  sizes,
  hasShimmer = true,
  contentType,
  ...rest
}: CustomImageProps) {
  const [imgError, setImgError] = useState(false);

  const getFallbackIcon = () => {
    if (contentType === ContentTypes.Person) {
      return RiUserLine;
    } else if (contentType === ContentTypes.Movie) {
      return RiMovie2Line;
    } else if (contentType === ContentTypes.Show) {
      return RiTvLine;
    }
  };

  return (
    <Box pos="relative" cursor="pointer" className="group" {...rest}>
      <AspectRatio ratio={2 / 3}>
        {!imgError ? (
          <ChakraNextUnwrappedImage
            w="auto"
            h="auto"
            loader={myLoader}
            width={width}
            quality={quality}
            height={height}
            placeholder={hasShimmer ? "blur" : "empty"}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            src={src}
            alt={alt}
            transition="all 0.1s"
            objectFit="cover"
            maxH={height}
            layout={layout}
            sizes={sizes}
            onError={() => {
              setImgError(true);
            }}
          />
        ) : (
          <Box>
            <Icon as={getFallbackIcon()} w={12} h={12} color="green.400" />
          </Box>
        )}
      </AspectRatio>
    </Box>
  );
}
