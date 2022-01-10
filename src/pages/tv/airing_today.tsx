import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getAiringTodayShows } from "../../services/show";
import { IShow } from "../../types";

interface ShowsProps {
  shows: IShow[];
}

export default function OnTheAir({ shows }: ShowsProps) {
  const pageTitle = "TV Shows Airing Today";

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getAiringTodayShows(pageParam);
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
  const { content: shows } = await getAiringTodayShows();

  return {
    props: {
      shows,
    },
  };
};
