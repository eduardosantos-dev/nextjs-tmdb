import { Stack } from "@chakra-ui/react";
import React from "react";
import {
  RiFilmLine,
  RiFireLine,
  RiTvLine,
  RiStarLine,
  RiCalendarEventLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export default function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="FILMES">
        <NavLink icon={RiFireLine} href="/movie">
          Populares
        </NavLink>
        <NavLink icon={RiFilmLine} href="/users">
          Em cartaz
        </NavLink>
        <NavLink icon={RiCalendarEventLine} href="/users">
          Próximas estreias
        </NavLink>
        <NavLink icon={RiStarLine} href="/users">
          Mais bem avaliados
        </NavLink>
      </NavSection>

      <NavSection title="SÉRIES">
        <NavLink icon={RiFireLine} href="/show">
          Populares
        </NavLink>
        <NavLink icon={RiCalendarEventLine} href="/automation">
          Em exibição hoje
        </NavLink>
        <NavLink icon={RiTvLine} href="/automation">
          Na TV
        </NavLink>
        <NavLink icon={RiStarLine} href="/automation">
          Mais bem avaliadas
        </NavLink>
      </NavSection>

      <NavSection title="PESSOAS">
        <NavLink icon={RiFireLine} href="/forms">
          Populares
        </NavLink>
      </NavSection>
    </Stack>
  );
}
