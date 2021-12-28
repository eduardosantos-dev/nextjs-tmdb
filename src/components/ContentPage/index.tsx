import {
  Flex,
  Container,
  Spinner,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ContentTypes, IMovie, IShow } from "../../types";
import ContentCard from "../ContentCard";
import { Header } from "../Header";
import styles from "./styles.module.scss";

interface ContentPageProps {
  initialData: any;
  fetchPage: any;
}

export default function ContentPage({
  initialData,
  fetchPage,
}: ContentPageProps) {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery("movies", fetchPage, {
    getNextPageParam: (lastPage: { page: number; totalPages: number }) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const content = useMemo(() => {
    return data?.pages.map((page: any) => page.content).flat();
  }, [data]);

  return (
    <Flex direction="column" h="100%">
      <Header />
      <Flex
        as={Container}
        maxW="container.2xl"
        my="28"
        className={styles.pageContainer}>
        {content && (
          <InfiniteScroll
            dataLength={content.length}
            next={fetchNextPage}
            hasMore={hasNextPage!!}
            loader={
              <Flex align="center" justify="center" mt={6} h={20}>
                <Spinner color="green.400" size="xl" />
              </Flex>
            }>
            <Heading mb="6" fontSize="2xl">
              Filmes populares
            </Heading>
            <SimpleGrid flex="1" columns={[2, 3, 4, 5]} gap="4">
              {content &&
                content.map((content) => (
                  <ContentCard
                    content={content}
                    contentType={ContentTypes.Movie}
                    key={content.id}
                    h={[400, 480, 500]}
                  />
                ))}
            </SimpleGrid>
          </InfiniteScroll>
        )}
      </Flex>
    </Flex>
  );
}
