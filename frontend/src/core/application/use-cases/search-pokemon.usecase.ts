import type { PokemonRepository } from "../ports/pokemon-repo";
import type { Pokemon } from "../../domain/models/pokemon";

export class SearchPokemonUseCase {
  private readonly repository: PokemonRepository;

  constructor(repository: PokemonRepository) {
    this.repository = repository;
  }

  async execute(name: string): Promise<Pokemon | null> {
    if (!name.trim()) {
      return null;
    }
    return this.repository.searchByName(name.trim());
  }
}
