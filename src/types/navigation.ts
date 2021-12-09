import { IconType } from "react-icons";

export interface MenuItem {
  label: string;
  href: string;
  icon: IconType;
}

export interface MenuSection {
  label: string;
  children: MenuItem[];
}

export interface NavigationMenu {
  menu: MenuSection[];
}
