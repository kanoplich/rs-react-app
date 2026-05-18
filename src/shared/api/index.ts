import type { PokemonData, SearchData } from '../types/data';

export const fetchPokemonList = async (
  limit: number = 10,
  offset: number = 0
): Promise<PokemonData> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('Fail load data');
  }

  const data: PokemonData = await response.json();

  return data;
};

export const searchPokemon = async (query: string): Promise<SearchData> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

  if (!response.ok) {
    throw new Error('Data not found');
  }

  const data: SearchData = await response.json();
  return data;
};
