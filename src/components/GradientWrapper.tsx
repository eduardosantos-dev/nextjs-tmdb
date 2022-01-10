import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

interface GradientWrapperProps {
  children: ReactNode;
}

export default function GradientWrapper({ children }: GradientWrapperProps) {
  const { colorMode } = useColorMode();

  return (
    <Box
      position="relative"
      _after={{
        bgImage:
          colorMode === "light"
            ? "linear-gradient(to right, rgba(255,255,255,0) 0%, var(--chakra-colors-gray-50) 100%)"
            : "linear-gradient(to right, rgba(255,255,255,0) 0%, var(--chakra-colors-gray-900) 100%)",
        position: "absolute",
        width: ["20px", "40px"],
        height: "100%",
        top: 0,
        right: 0,
        willChange: "opacity",
        pointerEvents: "none",
        content: '""',
      }}>
      {children}
    </Box>
  );
}
