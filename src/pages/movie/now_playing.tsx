import React from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { ContentTypes, IMovie } from "../../types";
import { getMoviesNowPlaying } from "../../services/movie";
import ContentPage from "../../components/ContentPage";

interface MoviesProps {
  movies: IMovie[];
}

export default function NowPlaying({ movies }: MoviesProps) {
  const pageTitle = "Filmes em cartaz";
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMoviesNowPlaying(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • {pageTitle}</title>
      </Head>
      <ContentPage
        queryKey="movies"
        contentType={ContentTypes.Movie}
        pageTitle={pageTitle}
        initialData={movies}
        fetchPage={fetchPage}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getMoviesNowPlaying(1);

  return {
    props: {
      movies,
    },
  };
};
