import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { Text, Image, Link, Img, Container, Flex } from "@chakra-ui/react";
import { Params } from "next/dist/server/router";
import { getMovieById } from "../../services/hooks/useMovies";
import { getShowById } from "../../services/hooks/useShows";
import { ContentRating } from "../../components/ContentRating";
import Head from "next/head";
import { IShow } from "../../types";
import ShowDetails from "../../components/ShowDetails";
import ContentDetailsSidebar from "../../components/ContentDetailsSidebar";
import ContentHeader from "../../components/ContentHeader";

interface ShowPageProps {
  show: IShow;
}

export default function ShowPage({ show }: ShowPageProps) {
  const [sidebarData, setSidebarData] = useState<any>();
  const [headerData, setHeaderData] = useState<any>();

  useEffect(() => {
    setSidebarData([
      { label: "Título original", value: show.original_name },
      { label: "Situação", value: show.status },
      { label: "Idioma original", value: show.original_language },
    ]);

    setHeaderData({
      name: show.name,
      poster_path: show.poster_path,
      backdrop_path: show.backdrop_path,
      release_date: show.formatted_first_air_date,
      // runtime: show.formatted_first_air_date,
      number_of_episodes: show.number_of_episodes,
      genres: show.genres,
      overview: show.overview,
      vote_average: show.vote_average,
      videos: show.videos,
    });
  }, [show]);

  return (
    <>
      {show && (
        <>
          <Head>
            <title>tmdb • {show.name}</title>
          </Head>

          {headerData && <ContentHeader content={headerData} />}
          <Flex
            as={Container}
            maxW="container.2xl"
            py={6}
            direction={{ base: "column", md: "row" }}>
            <ShowDetails show={show} />

            {sidebarData && <ContentDetailsSidebar data={sidebarData} />}
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
