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
} from "@chakra-ui/react";
import { useNavigation } from "../../services/hooks/useNavigation";
import { MenuSection, NavigationMenu } from "../../types/navigation";

export function Navigation() {
  const { menu }: NavigationMenu = useNavigation();

  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Stack direction="row" spacing={6}>
      {menu.map((menuSection: MenuSection) => (
        <Menu key={menuSection.label} autoSelect={false}>
          <MenuButton>{menuSection.label}</MenuButton>
          <MenuList bgColor={bgColor} borderColor="transparent" boxShadow="lg">
            {menuSection.children.map((menuItem) => (
              <Link
                key={menuItem.label}
                href={menuItem.href}
                _hover={{ textDecoration: "none" }}>
                <MenuItem
                  _hover={{ bg: "green.400" }}
                  _focus={{ bg: "green.400" }}
                  icon={<Icon w={5} h={5} as={menuItem.icon} />}>
                  <Text fontSize="sm">{menuItem.label}</Text>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      ))}
    </Stack>
  );
}
