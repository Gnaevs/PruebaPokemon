import { useEffect, useState } from "react";
import ListRow from "./ListRow";
import Pagination from '@mui/material/Pagination';
import { CircularProgress, Container, ListItem, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import "./list.css"
import { getPokemons,  type PokemonListResponse } from "../../pokeApi/pokeCall.ts";
import React from "react";

interface Props {
  pokemonURLS?: string[] | null;
}

const ListView = ({ pokemonURLS }: Props) => {

        
  return (
    <>
      <Container className="HeaderTableContainer" sx={{ display: "grid" }}>
        <Stack className="TableHeaderTitles" direction="row">
          <ListItem>#</ListItem>
          <ListItem>Nombre</ListItem>
          <ListItem>Vista Previa</ListItem>
          <ListItem>Tipos</ListItem>
          <ListItem>Habilidades</ListItem>
        </Stack>

      </Container>
      {pokemonURLS?.map((pokemonURL) => (
        <ListRow key={pokemonURL} pokemonURL={pokemonURL} />
      ))}

    </>
  );
};

export default ListView;
