import type { PokemonRepository } from "../ports/pokemon-repo";
import type { PokemonDetail } from "../../domain/models/pokemon-detail";

export class GetPokemonDetailUseCase {
  private readonly repository: PokemonRepository;

  constructor(repository: PokemonRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<PokemonDetail> {
    return this.repository.findById(id);
  }
}
