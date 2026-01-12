import type { PokemonRepository, PokemonListResult } from "../ports/pokemon-repo";

export class ListPokemonsUseCase {
  repo: PokemonRepository;

  constructor(repo: PokemonRepository) {
    this.repo = repo;
  }

  async execute(page?: number, limit?: number): Promise<PokemonListResult> {
    return this.repo.findAll(page, limit);
  }
}
