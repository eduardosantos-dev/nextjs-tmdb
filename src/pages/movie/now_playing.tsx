import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getMoviesNowPlaying } from "../../services/movie";
import { IMovie } from "../../types";

interface MoviesProps {
  movies: IMovie[];
}

export default function NowPlaying({ movies }: MoviesProps) {
  const pageTitle = "Now Playing Movies";
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
