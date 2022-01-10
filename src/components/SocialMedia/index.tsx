import { IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { IconType } from "react-icons";
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

interface SocialMediaLinkProps {
  href: string;
  label: string;
  icon: IconType;
}

const SocialMediaLink = ({ href, label, icon }: SocialMediaLinkProps) => {
  return (
    <NextLink href={href} passHref>
      <Link isExternal>
        <IconButton
          as={icon}
          variant="ghost"
          colorScheme="green"
          aria-label={label}
          size="sm"
        />
      </Link>
    </NextLink>
  );
};

export default function SocialMedia({
  facebook_id,
  instagram_id,
  twitter_id,
}: SocialMediaProps) {
  return (
    <>
      {facebook_id && (
        <SocialMediaLink
          href={`https://facebook.com/${facebook_id}`}
          label="facebook"
          icon={RiFacebookCircleFill}
        />
      )}
      {instagram_id && (
        <SocialMediaLink
          href={`https://instagram.com/${instagram_id}`}
          label="instagram"
          icon={RiInstagramFill}
        />
      )}

      {twitter_id && (
        <SocialMediaLink
          href={`https://twitter.com/${twitter_id}`}
          label="twitter"
          icon={RiTwitterFill}
        />
      )}
    </>
  );
}
