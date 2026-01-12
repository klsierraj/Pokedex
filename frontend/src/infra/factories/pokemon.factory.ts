import { PokemonHttpRepository } from "../http/pokemon-http.repository";
import { ListPokemonsUseCase } from "../../core/application/use-cases/list-pokemons.usecase";
import { SearchPokemonUseCase } from "../../core/application/use-cases/search-pokemon.usecase";
import { GetPokemonDetailUseCase } from "../../core/application/use-cases/get-pokemon-detail.usecase";

export function makeListPokemonsUseCase() {
  const repo = new PokemonHttpRepository();
  return new ListPokemonsUseCase(repo);
}

export function makeSearchPokemonUseCase() {
  const repo = new PokemonHttpRepository();
  return new SearchPokemonUseCase(repo);
}

export function makeGetPokemonDetailUseCase() {
  const repo = new PokemonHttpRepository();
  return new GetPokemonDetailUseCase(repo);
}
