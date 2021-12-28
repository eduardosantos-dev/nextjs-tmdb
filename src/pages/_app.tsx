import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, ModalContextProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../services/queryClient";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/global.scss";
import Head from "next/head";
import { VideoModalProvider } from "../context/ModalContext";
import { Chakra } from "../../src/Chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Chakra cookies={pageProps.cookies}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <VideoModalProvider>
              <Head>
                <title>tmdb</title>
              </Head>
              <Component {...pageProps} />
            </VideoModalProvider>
          </SidebarDrawerProvider>
        </ChakraProvider>
      </Chakra>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
