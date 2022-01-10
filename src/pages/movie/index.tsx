import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getMovies } from "../../services/movie";
import { IMovie } from "../../types";

interface MoviesProps {
  movies: IMovie[];
}

export default function Movies({ movies }: MoviesProps) {
  const pageTitle = "Popular Movies";
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getMovies(pageParam);
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
  const { content: movies } = await getMovies(1);

  return {
    props: {
      movies,
    },
  };
};
