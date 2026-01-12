import { describe, expect, it, vi } from "vitest";
import { ListPokemonsUseCase } from "./list-pokemons.usecase";
import type { PokemonRepository, PokemonListResult } from "../ports/pokemon-repo";
import { Pokemon } from "../../domain/models/pokemon";

describe("ListPokemonsUseCase", () => {
  it("should call repository findAll with default parameters", async () => {
    const mockPokemons = [
      new Pokemon(1, "bulbasaur", "https://example.com/1.png"),
      new Pokemon(2, "ivysaur", "https://example.com/2.png")
    ];

    const mockResult: PokemonListResult = {
      pokemons: mockPokemons,
      pagination: {
        total: 100,
        page: 1,
        limit: 20,
        total_pages: 5
      }
    };

    const mockRepo: PokemonRepository = {
      findAll: vi.fn().mockResolvedValue(mockResult)
    } as unknown as PokemonRepository;

    const useCase = new ListPokemonsUseCase(mockRepo);
    const result = await useCase.execute();

    expect(mockRepo.findAll).toHaveBeenCalledWith(undefined, undefined);
    expect(result.pokemons).toEqual(mockPokemons);
    expect(result.pagination).toEqual(mockResult.pagination);
  });

  it("should call repository findAll with provided page and limit", async () => {
    const mockPokemons = [new Pokemon(1, "bulbasaur", "https://example.com/1.png")];
    const mockResult: PokemonListResult = {
      pokemons: mockPokemons,
      pagination: {
        total: 100,
        page: 2,
        limit: 10,
        total_pages: 10
      }
    };

    const mockRepo: PokemonRepository = {
      findAll: vi.fn().mockResolvedValue(mockResult)
    } as unknown as PokemonRepository;

    const useCase = new ListPokemonsUseCase(mockRepo);
    const result = await useCase.execute(2, 10);

    expect(mockRepo.findAll).toHaveBeenCalledWith(2, 10);
    expect(result.pokemons).toEqual(mockPokemons);
    expect(result.pagination.page).toBe(2);
    expect(result.pagination.limit).toBe(10);
  });
});
