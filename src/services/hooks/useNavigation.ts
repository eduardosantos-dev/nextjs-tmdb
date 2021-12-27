import {
  RiFireLine,
  RiFilmLine,
  RiCalendarEventLine,
  RiStarLine,
  RiTvLine,
} from "react-icons/ri";
import { NavigationMenu } from "../../types/navigation";

export function useNavigation(): NavigationMenu {
  const navigation: NavigationMenu = {
    menu: [
      {
        label: "Filmes",
        children: [
          { label: "Populares", href: "/movie", icon: RiFireLine },
          { label: "Em cartaz", href: "/movie/now_playing", icon: RiFilmLine },
          {
            label: "Próximas estreias",
            href: "#",
            icon: RiCalendarEventLine,
          },
          { label: "Mais bem avaliados", href: "#", icon: RiStarLine },
        ],
      },
      {
        label: "Séries",
        children: [
          { label: "Populares", href: "/tv", icon: RiFireLine },
          { label: "Em cartaz", href: "#", icon: RiCalendarEventLine },
          { label: "Próximas estreias", href: "#", icon: RiTvLine },
          { label: "Mais bem avaliados", href: "#", icon: RiStarLine },
        ],
      },
      {
        label: "Pessoas",
        children: [{ label: "Populares", href: "#", icon: RiFireLine }],
      },
    ],
  };

  return navigation;
}
