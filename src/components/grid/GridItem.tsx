import { useEffect, useState } from "react";
import {
  getPokemonRow,
  type PokemonRowResponse,
} from "../../pokeApi/pokeCall.ts";
import {
  Box,
  CircularProgress,
  Typography,
  ListItem,
  Container,
  Paper,
  Stack,
  Button,
  Modal,
} from "@mui/material";

interface Props {
  pokemonURL?: string | null;
}

const GridItem = ({ pokemonURL }: Props) => {
  const [data, setData] = useState<PokemonRowResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPokemonRow(
          pokemonURL?.split("/").filter(Boolean).pop()
        );
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
      <Paper
        className="cardContainer"
        elevation={5}
        sx={{ width: 250, height: 300 }}
      >
        <img className="PokePreviewCard" src={data?.sprites.front_default} />
        <Typography> {data?.name} </Typography>
        <Stack
          className="abilities"
          direction="row"
          sx={{
            gridTemplateColumns:
              data?.abilities.length === 1
                ? "1fr"
                : data?.abilities.length === 2
                ? "1fr 1fr"
                : "1fr 1fr 1fr",
          }}
        >
          {data?.abilities.map((ability?) => (
            <ListItem className="abilitieText">
              {ability?.ability?.name}
            </ListItem>
          ))}
        </Stack>
        <Container className="bottomSectionContainer">
          <Stack
            className="typesContainer"
            sx={{
              gridTemplateColumns: data?.types.length === 1 ? "1fr" : "1fr 1fr",
            }}
          >
            {data?.types.map((type) => (
              <ListItem className="typesText">{type.type.name}</ListItem>
            ))}
          </Stack>

          <Button
            className="shinyButton"
            variant="contained"
            sx={{
              display: "grid!important",
              width: "50px!important",
              height: "min-content",
              placeSelf: "center center",
            }}
            onClick={() => setOpen(true)}
          >
            Shiny
          </Button>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 24,
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={data?.sprites.front_shiny}
                alt="Shiny Pokémon"
                style={{ width: "150px", height: "150px" }}
              />
              <Button
                onClick={() => setOpen(false)}
                variant="outlined"
                sx={{ mt: 2, marginBottom: 2 }}
              >
                Cerrar
              </Button>
            </Box>
          </Modal>
        </Container>
      </Paper>
    </Box>
  );
};

export default GridItem;
