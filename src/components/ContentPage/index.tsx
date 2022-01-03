import {
  Flex,
  Container,
  Spinner,
  Heading,
  SimpleGrid,
  Box,
  Grid,
} from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { ContentTypes, IMovie, IShow } from "../../types";
import ContentCard from "../ContentCard";
import { Header } from "../Header";
import styles from "./styles.module.scss";

interface ContentPageProps {
  initialData?: any;
  fetchPage: any;
  queryKey: string;
  pageTitle: string;
}

export default function ContentPage({
  initialData,
  fetchPage,
  queryKey,
  pageTitle = "",
}: ContentPageProps) {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(queryKey, fetchPage, {
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
              {pageTitle}
            </Heading>
            <SimpleGrid spacingY="10" spacingX="6" minChildWidth={[150, 200]}>
              {content &&
                content.map((content) => (
                  <Box key={content.id} maxW={300}>
                    <ContentCard
                      content={content}
                      contentType={content.media_type}
                      h="auto"
                    />
                  </Box>
                ))}
            </SimpleGrid>
          </InfiniteScroll>
        )}
      </Flex>
    </Flex>
  );
}
