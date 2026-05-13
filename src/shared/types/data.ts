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

export type SearchResult = {
  forms: Results;
};
