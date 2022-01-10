import {
  RiCalendarEventLine,
  RiFireLine,
  RiMovie2Line,
  RiStarLine,
  RiTvLine,
} from "react-icons/ri";
import { NavigationMenu } from "../../types/navigation";

export function useNavigation(): NavigationMenu {
  const navigation: NavigationMenu = {
    menu: [
      {
        label: "Movies",
        children: [
          { label: "Popular", href: "/movie", icon: RiFireLine },
          {
            label: "Now Playing",
            href: "/movie/now_playing",
            icon: RiMovie2Line,
          },
          {
            label: "Upcoming",
            href: "/movie/upcoming",
            icon: RiCalendarEventLine,
          },
          {
            label: "Top Rated",
            href: "/movie/top_rated",
            icon: RiStarLine,
          },
        ],
      },
      {
        label: "TV Shows",
        children: [
          { label: "Popular", href: "/tv", icon: RiFireLine },
          {
            label: "Airing Today",
            href: "/tv/airing_today",
            icon: RiTvLine,
          },
          {
            label: "On TV",
            href: "/tv/on_the_air",
            icon: RiCalendarEventLine,
          },
          {
            label: "Top Rated",
            href: "/tv/top_rated",
            icon: RiStarLine,
          },
        ],
      },
      {
        label: "People",
        children: [{ label: "Popular", href: "/person", icon: RiFireLine }],
      },
    ],
  };

  return navigation;
}
