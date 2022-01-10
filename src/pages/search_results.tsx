import React, { useEffect, useMemo, useState } from "react";
import type { GetServerSideProps, GetStaticProps } from "next";
import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentCard from "../components/ContentCard";
import { ContentTypes, IMovie, IShow } from "../types";
import { getAiringTodayShows } from "../services/show";
import ContentPage from "../components/ContentPage";
import { useRouter } from "next/router";
import { multiSearch } from "../services/search";
import { Params } from "next/dist/server/router";
import { queryClient } from "../services/queryClient";

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
