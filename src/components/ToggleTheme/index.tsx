import { Box, BoxProps, IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

export default function ToggleTheme(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box {...props}>
      <IconButton
        aria-label="Mudar tema"
        size="lg"
        onClick={() => toggleColorMode()}
        variant="outline"
        colorScheme="green"
        border="0"
        icon={colorMode === "light" ? <RiMoonFill /> : <RiSunFill />}
      />
    </Box>
  );
}
