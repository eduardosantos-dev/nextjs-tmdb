import { Stack } from "@chakra-ui/react";
import { useNavigation } from "../../services/hooks/useNavigation";
import { MenuItem, MenuSection, NavigationMenu } from "../../types/navigation";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export default function SidebarNav() {
  const { menu }: NavigationMenu = useNavigation();

  return (
    <Stack spacing="12" align="flex-start">
      {menu.map((menuSection: MenuSection) => (
        <NavSection key={menuSection.label} title={menuSection.label}>
          {menuSection.children.map((menuItem: MenuItem) => (
            <NavLink
              key={menuItem.label}
              icon={menuItem.icon}
              href={menuItem.href}>
              {menuItem.label}
            </NavLink>
          ))}
        </NavSection>
      ))}
    </Stack>
  );
}
