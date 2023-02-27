export interface Pokemon {
  name: string;
  order: number;
}

export interface PokemonListApi {
  count: number; 
  next: string;
  previous: string;
  results: Pokemon[]
}
