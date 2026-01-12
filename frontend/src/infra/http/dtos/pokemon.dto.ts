export interface PokemonListItemDTO {
  name: string;
  number: number;
  image_url: string;
}

export interface PokemonListResponseDTO {
  success: boolean;
  pokemons: PokemonListItemDTO[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

export interface PokemonDetailResponseDTO {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  moves: string[];
  base_stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
  image_url: string;
}
  