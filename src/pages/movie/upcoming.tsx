import { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getUpcomingMovies } from "../../services/movie";
import { IMovie } from "../../types";

interface MoviesProps {
  movies: IMovie[];
}

export default function Upcoming({ movies }: MoviesProps) {
  const pageTitle = "Upcoming Movies";

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getUpcomingMovies(pageParam);
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
  const { content: movies } = await getUpcomingMovies(1);

  return {
    props: {
      movies,
    },
  };
};
