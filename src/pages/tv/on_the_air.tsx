import React, { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import {
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import Head from "next/head";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import ContentCard from "../../components/ContentCard";
import { ContentTypes, IShow } from "../../types";
import { getOnAirShows, getShows } from "../../services/show";
import ContentPage from "../../components/ContentPage";

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
