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
import * as gtag from "../lib/gtag";

const isProduction = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
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
