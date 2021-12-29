import React from "react";
import {
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
  Stack,
  Link,
  Icon,
  useColorModeValue,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigation } from "../../services/hooks/useNavigation";
import { MenuSection, NavigationMenu } from "../../types/navigation";

interface CustomMenuProps {
  menuSection: MenuSection;
}

function CustomMenu({ menuSection }: CustomMenuProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.400", "white");
  const interactionTextColor = useColorModeValue("white", "white");

  return (
    <Menu autoSelect={false} isOpen={isOpen}>
      <MenuButton
        variant="ghost"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        _focus={{
          textDecoration: "underline",
          textDecorationColor: "green.400",
          textDecorationThickness: "4px",
          textUnderlineOffset: "5px",
        }}>
        {menuSection.label}
      </MenuButton>
      <MenuList
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        bgColor={useColorModeValue("white", "gray.700")}
        borderColor="transparent"
        boxShadow="dark-lg"
        border="none"
        overflow="hidden">
        {menuSection.children.map((menuItem: any) => (
          <Link
            key={menuItem.label}
            href={menuItem.href}
            _hover={{ textDecoration: "none" }}>
            <MenuItem
              color={textColor}
              _hover={{ bg: "green.400", color: interactionTextColor }}
              _focus={{ bg: "green.400", color: interactionTextColor }}
              icon={<Icon w={5} h={5} as={menuItem.icon} />}>
              <Text fontSize="sm">{menuItem.label}</Text>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </Menu>
  );
}

export function Navigation() {
  const { menu }: NavigationMenu = useNavigation();

  return (
    <Stack direction="row" spacing={6}>
      {menu.map((menuSection: MenuSection) => (
        <CustomMenu key={menuSection.label} menuSection={menuSection} />
      ))}
    </Stack>
  );
}
