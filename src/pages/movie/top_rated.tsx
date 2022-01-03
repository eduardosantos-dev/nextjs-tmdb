import React from "react";
import { getMoviesTopRated } from "../../services/movie";
import { ContentTypes, IMovie } from "../../types";
import Head from "next/head";
import { GetStaticProps } from "next";
import ContentPage from "../../components/ContentPage";
interface MoviesProps {
  movies: IMovie[];
}

export default function TopRated({ movies }: MoviesProps) {
  const pageTitle = "Filmes mais bem avaliados";
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMoviesTopRated(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • {pageTitle}</title>
      </Head>
      <ContentPage
        queryKey="movies"
        pageTitle={pageTitle}
        initialData={movies}
        fetchPage={fetchPage}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: movies } = await getMoviesTopRated(1);

  return {
    props: {
      movies,
    },
  };
};
