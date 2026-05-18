export type PokemonData = {
  count: number;
  next: string;
  previous: null;
  results: Results[];
};

export type Results = {
  name: string;
  url: string;
};

export type SearchData = {
  id: number;
  name: string;
  base_experience: number;
  weight: number;
  forms: Results[];
};
