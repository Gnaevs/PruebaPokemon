import ListRow from "./ListRow";
import {
  Container,
  ListItem,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import "./list.css";

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
