import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Chakra } from "../../src/Chakra";
import { VideoModalProvider } from "../context/ModalContext";
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext";
import { queryClient } from "../services/queryClient";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Chakra cookies={pageProps.cookies}>
        <SidebarDrawerProvider>
          <VideoModalProvider>
            <Head>
              <title>tmdb</title>
            </Head>
            <Component {...pageProps} />
          </VideoModalProvider>
        </SidebarDrawerProvider>
      </Chakra>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
