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
import { theme } from "../styles/theme";

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
