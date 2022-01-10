import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import ContentDetailsSidebar from "../../components/ContentDetailsSidebar";
import ContentHeader from "../../components/ContentHeader";
import ShowDetails from "../../components/ShowDetails";
import { getShowById, getShows } from "../../services/show";
import { IShow } from "../../types";

interface ShowPageProps {
  show: IShow;
}

export default function ShowPage({ show }: ShowPageProps) {
  const [sidebarData, setSidebarData] = useState<any>();
  const [headerData, setHeaderData] = useState<any>();

  useEffect(() => {
    if (show) {
      setSidebarData([
        { label: "Original Title", value: show.original_name },
        { label: "Status", value: show.status },
        { label: "Original Language", value: show.original_language },
      ]);

      setHeaderData({
        name: show.name,
        poster_path: show.poster_path,
        backdrop_path: show.backdrop_path,
        release_date: show.formatted_first_air_date,
        number_of_episodes: show.number_of_episodes,
        genres: show.genres,
        overview: show.overview,
        vote_average: show.vote_average,
        videos: show.videos,
        media_type: show.media_type,
      });
    }
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
            direction={{ base: "column", md: "row-reverse" }}>
            {sidebarData && (
              <ContentDetailsSidebar>
                {sidebarData.map(
                  (item: { label: string; value: string }, index: number) => (
                    <Box mb={6} key={index}>
                      <Heading as="h4" fontSize="md">
                        {item.label}
                      </Heading>
                      <Text fontSize="sm" fontWeight="normal">
                        {item.value}
                      </Text>
                    </Box>
                  )
                )}
              </ContentDetailsSidebar>
            )}
            <ShowDetails show={show} />
          </Flex>
        </>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const numberOfPages = 10;
  let paths: any[] = [];
  for (let i = 1; i <= numberOfPages; i++) {
    const { content: shows } = await getShows(i);

    shows.map((show) => {
      paths = [...paths, { params: { id: show.id.toString() } }];
    });
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { show } = await getShowById(id);

  return {
    props: {
      show,
      revalidate: 1 * 60 * 60 * 24, // 24 hours
    },
  };
};
