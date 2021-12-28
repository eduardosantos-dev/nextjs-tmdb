import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// export const theme = extendTheme({
//   initialColorMode: "light",
//   useSystemColor: false,
//   colors: {
//     gray: {
//       "900": "#181B23",
//       "800": "#1F2029",
//       "700": "#353646",
//       "600": "#4B4D63",
//       "500": "#616480",
//       "400": "#797D9A",
//       "300": "#9699B0",
//       "200": "#B3B5C6",
//       "100": "#D1D2DC",
//       "50": "#EEEEF2",
//     },
//   },
//   fonts: {
//     headings: "Roboto",
//     body: "Roboto",
//   },
//   sizes: {
//     container: {
//       "2xl": "1400px",
//     },
//   },
//   styles: {
//     global: {
//       body: {
//         bg: (props: any) => mode("gray.200", "gray.900")(props),
//         color: "gray.50",
//       },
//     },
//   },
// });

export const theme = extendTheme({
  initialColorMode: "light",
  useSystemColor: false,
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2",
    },
  },
  fonts: {
    headings: "Roboto",
    body: "Roboto",
  },
  sizes: {
    container: {
      "2xl": "1400px",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("gray.50", "gray.900")(props),
        color: mode("gray.800", "gray.50")(props),
      },
    }),
  },
});
