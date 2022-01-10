import { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getMoviesTopRated } from "../../services/movie";
import { IMovie } from "../../types";
interface MoviesProps {
  movies: IMovie[];
}

export default function TopRated({ movies }: MoviesProps) {
  const pageTitle = "Top Rated Movies";
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
