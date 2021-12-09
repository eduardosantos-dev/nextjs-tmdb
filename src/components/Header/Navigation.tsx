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
  useDisclosure,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useNavigation } from "../../services/hooks/useNavigation";
import { MenuSection, NavigationMenu } from "../../types/navigation";

export function Navigation() {
  const { menu }: NavigationMenu = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack direction="row" spacing={6}>
      {menu.map((menuSection: MenuSection) => (
        <Menu key={menuSection.label} autoSelect={false}>
          <MenuButton>{menuSection.label}</MenuButton>
          <MenuList bgColor="gray.700" borderColor="transparent" boxShadow="lg">
            {menuSection.children.map((menuItem) => (
              <Link
                key={menuItem.label}
                to={menuItem.href}
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
