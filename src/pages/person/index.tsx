import type { GetStaticProps } from "next";
import Head from "next/head";
import ContentPage from "../../components/ContentPage";
import { getPeople } from "../../services/person";
import { IPerson } from "../../types";

interface PeopleProps {
  people: IPerson[];
}

export default function People({ people }: PeopleProps) {
  const pageTitle = "Popular People";
  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await getPeople(pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • {pageTitle}</title>
      </Head>
      <ContentPage
        queryKey="person"
        pageTitle={pageTitle}
        initialData={people}
        fetchPage={fetchPage}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { content: people } = await getPeople(1);

  return {
    props: {
      people,
    },
  };
};
