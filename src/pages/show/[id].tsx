import React from "react";
import { GetServerSideProps } from "next";
import { Text, Image, Link, Img, Container, Flex } from "@chakra-ui/react";
import { Params } from "next/dist/server/router";
import { getMovieById } from "../../services/hooks/useMovies";
import { getShowById } from "../../services/hooks/useShows";
import { ContentRating } from "../../components/ContentRating";
import Head from "next/head";
import ShowHero from "../../components/Shows/ShowHero";
import { IShow } from "../../types";
import ShowDetails from "../../components/Shows/ShowDetails";
import ShowDetailsSidebar from "../../components/Shows/ShowDetailsSidebar";

interface ShowPageProps {
  show: IShow;
}

export default function ShowPage({ show }: ShowPageProps) {
  return (
    <>
      {show && (
        <>
          <Head>
            <title>tmdb • {show.name}</title>
          </Head>

          <ShowHero show={show} />
          <Flex
            as={Container}
            maxW="container.2xl"
            py={6}
            direction={{ base: "column", md: "row" }}>
            <ShowDetails show={show} />
            <ShowDetailsSidebar show={show} />
          </Flex>
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { show } = await getShowById(id);

  return {
    props: {
      show,
    },
  };
};
