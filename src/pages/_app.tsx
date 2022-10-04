import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Chakra } from "../../src/Chakra";
import { VideoModalProvider } from "../context/ModalContext";
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext";
import { queryClient } from "../services/queryClient";
import "../styles/global.scss";
import * as ga from "../lib/ga";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
