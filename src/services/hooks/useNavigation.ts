import {
  RiFireLine,
  RiFilmLine,
  RiCalendarEventLine,
  RiStarLine,
  RiTvLine,
  RiMovie2Line,
  RiTv2Line,
} from "react-icons/ri";
import { NavigationMenu } from "../../types/navigation";

export function useNavigation(): NavigationMenu {
  const navigation: NavigationMenu = {
    menu: [
      {
        label: "Filmes",
        children: [
          { label: "Populares", href: "/movie", icon: RiFireLine },
          {
            label: "Em cartaz",
            href: "/movie/now_playing",
            icon: RiMovie2Line,
          },
          {
            label: "Próximas estreias",
            href: "/movie/upcoming",
            icon: RiCalendarEventLine,
          },
          {
            label: "Mais bem avaliados",
            href: "/movie/top_rated",
            icon: RiStarLine,
          },
        ],
      },
      {
        label: "Séries",
        children: [
          { label: "Populares", href: "/tv", icon: RiFireLine },
          {
            label: "Em exibição hoje",
            href: "/tv/airing_today",
            icon: RiTvLine,
          },
          {
            label: "Na TV",
            href: "/tv/on_the_air",
            icon: RiCalendarEventLine,
          },
          {
            label: "Mais bem avaliados",
            href: "/tv/top_rated",
            icon: RiStarLine,
          },
        ],
      },
      {
        label: "Pessoas",
        children: [{ label: "Populares", href: "/person", icon: RiFireLine }],
      },
    ],
  };

  return navigation;
}
