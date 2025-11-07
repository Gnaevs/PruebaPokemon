import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { type PokemonListResponse } from "./pokeCall";

export const usePokemons = () => {
  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery<PokemonListResponse>({
    queryKey: ["pokemons"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${pageParam}&limit=12`);
      if (!res.ok) throw new Error("Error al obtener los Pokémon");
      return res.json();
    },
    getNextPageParam: (lastPage) => {
      // Si no hay más páginas, detenemos la carga
      if (!lastPage.next) return undefined;

      // Extraer el "offset" numérico de la URL del next
      const url = new URL(lastPage.next);
      const offsetParam = url.searchParams.get("offset");
      return offsetParam ? Number(offsetParam) : undefined;
    },
    initialPageParam: 0, // 👈 obligatorio en v5
  });


  const pokemons = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.results);
  }, [data]);

  const pageData = useMemo(() =>{
    if(!data) return [];
    return data.pages.flatMap((page) => page.count);
    }, []
  )
  return {
    pageData,
    pokemons,
    error,
    fetchNextPage,
    status,
    hasNextPage,
  };
};