import type { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import ContentPage from "../components/ContentPage";
import { multiSearch } from "../services/search";
import { IMovie, IShow } from "../types";

interface SearchResultsProps {
  content: IMovie[] | IShow[];
  searchTerm: string;
}

export default function SearchResults({
  content,
  searchTerm,
}: SearchResultsProps) {
  const [search, setSearch] = useState(searchTerm);

  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  const pageTitle = `Search Results for "${search}"`;

  const fetchPage = async ({ pageParam = 1 }): Promise<any> => {
    const response = await multiSearch(search, pageParam);
    return response;
  };

  return (
    <>
      <Head>
        <title>tmdb • {pageTitle}</title>
      </Head>
      <ContentPage
        queryKey="search"
        fetchPage={fetchPage}
        pageTitle={pageTitle}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: Params) => {
  const { query: searchTerm } = query;

  const { content } = await multiSearch(searchTerm);

  return {
    props: {
      content,
      searchTerm,
    },
  };
};
