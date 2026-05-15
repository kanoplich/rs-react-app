import type { PokemonData, Results, SearchResult } from '../types/data';

export const fetchPokemonList = async (
  limit: number = 20
): Promise<Results[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Fail load data');
  }

  const data: PokemonData = await response.json();

  return data.results;
};

export const searchPokemon = async (query: string): Promise<Results[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

  if (!response.ok) {
    throw new Error('Data not found');
  }

  const data: SearchResult = await response.json();
  return data.forms;
};
