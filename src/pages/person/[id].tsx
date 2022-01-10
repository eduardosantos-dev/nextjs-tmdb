import { Container, Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import { Header } from "../../components/Header";
import PersonMainContent from "../../components/Person/PersonMainContent";
import PersonSidebar from "../../components/Person/PersonSidebar";
import { getPeople, getPersonById } from "../../services/person";
import { IPerson } from "../../types";

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
            overflow="hidden"
            pt={32}
            direction={{ base: "column", md: "row" }}>
            <PersonSidebar person={person} />
            <PersonMainContent
              person={person}
              w={{ base: "100%", md: "calc(100% - 324px)" }}
            />
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
