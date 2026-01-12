import { Pokemon } from "../../domain/models/pokemon";
import { PokemonDetail } from "../../domain/models/pokemon-detail";

export type PokemonListResult = {
  pokemons: Pokemon[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};

export interface PokemonRepository {
  findAll(page?: number, limit?: number): Promise<PokemonListResult>;
  findById(id: number): Promise<PokemonDetail>;
  searchByName(name: string): Promise<Pokemon | null>;
}
