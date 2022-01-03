import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IMovie, IPerson } from "../../types";
import Head from "next/head";
import { getMovies, getMovieById } from "../../services/movie";
import { getPeople, getPersonById } from "../../services/person";
import CustomImage from "../../components/CustomImage";
import { Header } from "../../components/Header";
import ContentCard from "../../components/ContentCard";
import {
  RiFacebookCircleFill,
  RiFacebookLine,
  RiInstagramFill,
  RiInstagramLine,
  RiTwitterFill,
  RiTwitterLine,
} from "react-icons/ri";
import SocialMedia from "../../components/SocialMedia";
import PersonDetailsSidebar from "../../components/Person/PersonSidebar";
import PersonSidebar from "../../components/Person/PersonSidebar";
import PersonMainContent from "../../components/Person/PersonMainContent";

interface PersonPageProps {
  person: IPerson;
}

export default function PersonPage({ person }: PersonPageProps) {
  return (
    <>
      {person && (
        <>
          <Head>
            <title>tmdb • {person.name}</title>
          </Head>
          <Header />
          <Flex
            as={Container}
            maxW="container.2xl"
            pt={32}
            direction={{ base: "column", md: "row" }}>
            <PersonSidebar person={person} />
            <PersonMainContent person={person} />
          </Flex>
        </>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  const numberOfPages = 10;
  let paths: any[] = [];
  for (let i = 1; i <= numberOfPages; i++) {
    const { content: people } = await getPeople(i);

    people.map((person) => {
      paths = [...paths, { params: { id: person.id.toString() } }];
    });
  }

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Params> = async ({
  params,
}: Params) => {
  const { id } = params;

  const { person } = await getPersonById(id);

  return {
    props: { person },
    revalidate: 1 * 60 * 60 * 24, // 24 hours
  };
};
