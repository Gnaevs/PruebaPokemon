import { useEffect, useState } from "react";
import { getPokemons,  type PokemonListResponse } from "../../pokeApi/pokeCall.ts";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  Container,
  Paper,
  Stack,
  Button,
} from "@mui/material";

const PokemonList = () => {
  const [data, setData] = useState<PokemonListResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPokemons(10); // obtiene 10 pokémon
        setData(result);
      } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Paper className="cardContainer" sx={{width: 250 , height: 300 ,}}>
        <img
              className="PokePreviewCard"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            />
            <Typography> bulbasour</Typography>
            <Stack className="abilities" direction="row">
                <ListItem className="abilitieText">Habilidad</ListItem>
                <ListItem className="abilitieText">Habilidad</ListItem>
                <ListItem className="abilitieText">Habilidad</ListItem>
            </Stack>
            <Container className="bottomSectionContainer">
                <Stack className="typesContainer">
                    <ListItem className="typesText">tipo</ListItem>
                    <ListItem className="typesText">tipo</ListItem>
                </Stack>
                <Button className="shinyButton" variant="outlined">
                    Shiny
                </Button>
            </Container>
      </Paper>
    </Box>
  );
};

export default PokemonList;
