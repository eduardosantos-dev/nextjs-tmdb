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
import Script from "next/script";

const isProduction = process.env.NODE_ENV === "production";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
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
    </>
  );
}

export default MyApp;
