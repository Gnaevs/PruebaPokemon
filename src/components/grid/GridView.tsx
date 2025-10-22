import InfiniteScroll from "react-infinite-scroll-component";
import GridItem from "./GridItem.tsx";
import "./grid.css";
import { CircularProgress, Container } from "@mui/material";
import { usePokemons } from "../../pokeApi/pokeinfinite.ts";

const GridView = () => {
  const { pokemons, error, fetchNextPage, status, hasNextPage } = usePokemons();

  if (status === "pending") return <CircularProgress />;

  if (status === "error") return <h4>Ups!, {`${error}` as string}</h4>;

  return (
    <>
      <InfiniteScroll
        dataLength={pokemons.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<CircularProgress />}
        scrollThreshold={0.9}
      >
        <Container className="gridView">
          {pokemons?.map((pokemon) => (
            <GridItem key={pokemon.name} pokemonURL={pokemon.url} />
          ))}
        </Container>
      </InfiniteScroll>
    </>
  );
};

export default GridView;
