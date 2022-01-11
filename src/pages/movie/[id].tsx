import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentDetailsSidebar from "../../components/ContentDetailsSidebar";
import ContentHeader from "../../components/ContentHeader";
import { Header } from "../../components/Header";
import Loading from "../../components/Loading";
import MovieDetails from "../../components/MovieDetails";
import { getMovieById, getMovies } from "../../services/movie";
import { IMovie } from "../../types";

interface MoviePageProps {
  movie: IMovie;
}

export default function MoviePage({ movie }: MoviePageProps) {
  const router = useRouter();
  const [sidebarData, setSidebarData] = useState<any>();
  const [headerData, setHeaderData] = useState<any>();

  useEffect(() => {
    if (movie) {
      setSidebarData([
        { label: "Original Title", value: movie.original_title },
        { label: "Status", value: movie.status },
        { label: "Original Language", value: movie.original_language },
        { label: "Budget", value: movie.formatted_budget },
        { label: "Revenue", value: movie.formatted_revenue },
      ]);

      setHeaderData({
        name: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.formatted_release_date,
        runtime: movie.formatted_runtime,
        genres: movie.genres,
        overview: movie.overview,
        vote_average: movie.vote_average,
        videos: movie.videos,
        media_type: movie.media_type,
      });
    }
  }, [movie]);

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>tmdb</title>
        </Head>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <>
      {movie && (
        <>
          <Head>
            <title>tmdb • {movie.title}</title>
          </Head>
          <Header />
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
            <MovieDetails movie={movie} />
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
    const { content: movies } = await getMovies(i);

    movies.map((movie) => {
      paths = [...paths, { params: { id: movie.id.toString() } }];
    });
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { movie } = await getMovieById(id);

  return {
    props: { movie },
    revalidate: 1 * 60 * 60 * 24, // 24 hours
  };
};
