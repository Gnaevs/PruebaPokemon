import {
  Box,
  Button,
  CircularProgress,
  Container,
  ListItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPokemonRow, type PokemonRowResponse } from "../../pokeApi/pokeCall";

interface Props {
  pokemonURL?: string | null;
}

const ListRow = ({ pokemonURL }: Props) => {
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
  const [view, setView] = useState<"list" | "grid">("list");
  if (loading) return <CircularProgress />;

  return (
    <>
      <Container className="Row" sx={{ display: "grid" }}>
        <Stack
          className="DataRow"
          sx={{ backgroundColor: "#F0F2F7" }}
          direction="row"
        >
          <ListItem className="cell">{data?.id}</ListItem>
          <ListItem className="cell">{data?.name}</ListItem>
          <ListItem className="cell">
            <img className="PokePreview" src={data?.sprites.front_default} />
          </ListItem>
          <ListItem className="cell">
            {data?.types.map((type) => (
              <Typography>{type.type.name}</Typography>
            ))}
          </ListItem>
          <ListItem className="cell" sx={{ gridTemplateRows: "30px 30px" }}>
            {data?.abilities.map((ability?) => (
              <Typography>{ability?.ability?.name}</Typography>
            ))}
          </ListItem>
        </Stack>
        <Button
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
    </>
  );
};

export default ListRow;
