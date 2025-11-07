import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import ListView from "./components/list/ListView";
import GridView from "./components/grid/GridView";
import "./App.css";
import { getPokemons, type PokemonListResponse } from "./pokeApi/pokeCall.ts";
import React from "react";

const PokemonView = () => {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [, setLoading] = useState(true);
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [view, setView] = useState<"list" | "grid">("list");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const limit = 5;
        const offset = (page - 1) * limit;
        const result = await getPokemons(limit, offset);
        setData(result);
      } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <Container sx={{ width: 1080 }}>
        <Paper className="MainContainer" elevation={9} sx={{ width: "100%" }}>
          <Container
            sx={{ display: "grid", padding: "10px!important" }}
            className="HeaderContainer"
          >
            <h2 className="tittle">Pokedex</h2>
            <Container
              sx={{
                display: "grid",
                gridTemplateColumns: "max-content 1fr max-content",
                width: "100%",
              }}
              className="ActionContainer"
            >
              <Paper
                name="Search"
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                }}
              >
                <IconButton
                  disabled
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  disabled
                  sx={{ ml: 1 }}
                  placeholder="Buscar Pokémon"
                  inputProps={{ "aria-label": "Buscar Pokémon" }}
                />
              </Paper>
              <Container
                className="changeViewButtonsContainer"
                sx={{
                  display: "grid",
                  width: "Max-content",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: 10,
                  gridArea: "1 / 3 / 1 /4",
                }}
              >
                <Button
                  variant={view === "list" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setView("list")}
                >
                  Lista
                </Button>
                <Button
                  variant={view === "grid" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setView("grid")}
                >
                  Cuadrícula
                </Button>
              </Container>
            </Container>
          </Container>
          <Box sx={{ paddingBottom: "10px!important" }}>
            {view === "list" ? (
              <ListView
                pokemonURLS={data?.results.map((pokemon) => pokemon.url)}
              />
            ) : (
              <GridView />
            )}
          </Box>
          {view === "list" ? (
            <Container
              sx={{
                display: "grid",
                placeContent: "center",
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <Pagination
                count={data ? Math.ceil(data.count / 5) : 1}
                defaultPage={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />
            </Container>
          ) : (
            <></>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default PokemonView;
