import { IconButton, Link, Stack, StackProps } from "@chakra-ui/react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiTwitterFill,
} from "react-icons/ri";

interface SocialMediaProps {
  facebook_id?: string;
  twitter_id?: string;
  instagram_id?: string;
}

export default function SocialMedia({
  facebook_id,
  instagram_id,
  twitter_id,
}: SocialMediaProps) {
  return (
    <>
      {facebook_id && (
        <Link href={`https://facebook.com/${facebook_id}`} isExternal>
          <IconButton
            as={RiFacebookCircleFill}
            variant="ghost"
            colorScheme="green"
            aria-label="facebook"
            size="sm"
          />
        </Link>
      )}
      {instagram_id && (
        <Link href={`https://instagram.com/${instagram_id}`} isExternal>
          <IconButton
            as={RiInstagramFill}
            variant="ghost"
            colorScheme="green"
            aria-label="instagram"
            size="sm"
          />
        </Link>
      )}

      {twitter_id && (
        <Link href={`https://twitter.com/${twitter_id}`} isExternal>
          <IconButton
            as={RiTwitterFill}
            variant="ghost"
            colorScheme="green"
            aria-label="twitter"
            size="sm"
          />
        </Link>
      )}
    </>
  );
}
