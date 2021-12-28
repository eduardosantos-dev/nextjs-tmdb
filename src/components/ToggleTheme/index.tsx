import {
  Box,
  BoxProps,
  IconButton,
  IconButtonProps,
  useColorMode,
} from "@chakra-ui/react";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

export default function ToggleTheme(props: BoxProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box {...props}>
      <IconButton
        aria-label="Mudar tema"
        size="md"
        onClick={() => toggleColorMode()}
        variant="outline"
        colorScheme="green"
        icon={colorMode === "light" ? <RiMoonFill /> : <RiSunFill />}
      />
    </Box>
  );
}
