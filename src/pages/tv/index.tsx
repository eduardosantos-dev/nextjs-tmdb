import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getShows } from "../../services/show";
import { IShow } from "../../types";
interface ShowsProps {
  shows: IShow[];
}

export default function Shows({ shows }: ShowsProps) {
  const pageTitle = "Popular TV Shows";

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getShows(pageParam);
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
  const { content: shows } = await getShows();

  return {
    props: {
      shows,
    },
  };
};
