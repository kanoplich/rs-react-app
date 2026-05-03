export type PokemonData = {
  count: number;
  next: string;
  previous: null;
  results: Results[];
};

type Results = {
  name: string;
  url: string;
};
