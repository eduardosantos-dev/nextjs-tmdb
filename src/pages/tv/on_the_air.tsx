import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getOnAirShows } from "../../services/show";
import { IShow } from "../../types";

interface ShowsProps {
  shows: IShow[];
}

export default function OnTheAir({ shows }: ShowsProps) {
  const pageTitle = "Currently Airing TV Shows";

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getOnAirShows(pageParam);
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
  const { content: shows } = await getOnAirShows();

  return {
    props: {
      shows,
    },
  };
};
