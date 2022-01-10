import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getShowsTopRated } from "../../services/show";
import { IShow } from "../../types";

interface ShowsProps {
  shows: IShow[];
}

export default function TopRatedShows({ shows }: ShowsProps) {
  const pageTitle = "Top Rated TV Shows";

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getShowsTopRated(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • {pageTitle}</title>
      </Head>
      <ContentPage
        queryKey="shows"
        initialData={shows}
        fetchPage={fetchPage}
        pageTitle={pageTitle}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: shows } = await getShowsTopRated();

  return {
    props: {
      shows,
    },
  };
};
