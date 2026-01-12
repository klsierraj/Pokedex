import { describe, expect, it, vi } from "vitest";
import { SearchPokemonUseCase } from "./search-pokemon.usecase";
import type { PokemonRepository } from "../ports/pokemon-repo";
import { Pokemon } from "../../domain/models/pokemon";

describe("SearchPokemonUseCase", () => {
  it("should return null if name is empty string", async () => {
    const mockRepo: PokemonRepository = {
      searchByName: vi.fn()
    } as unknown as PokemonRepository;

    const useCase = new SearchPokemonUseCase(mockRepo);
    const result = await useCase.execute("");

    expect(result).toBeNull();
    expect(mockRepo.searchByName).not.toHaveBeenCalled();
  });

  it("should return null if name is only whitespace", async () => {
    const mockRepo: PokemonRepository = {
      searchByName: vi.fn()
    } as unknown as PokemonRepository;

    const useCase = new SearchPokemonUseCase(mockRepo);
    const result = await useCase.execute("   ");

    expect(result).toBeNull();
    expect(mockRepo.searchByName).not.toHaveBeenCalled();
  });

  it("should trim name and call repository searchByName", async () => {
    const mockPokemon = new Pokemon(25, "pikachu", "https://example.com/25.png");
    const mockRepo: PokemonRepository = {
      searchByName: vi.fn().mockResolvedValue(mockPokemon)
    } as unknown as PokemonRepository;

    const useCase = new SearchPokemonUseCase(mockRepo);
    const result = await useCase.execute("  pikachu  ");

    expect(mockRepo.searchByName).toHaveBeenCalledWith("pikachu");
    expect(result).toEqual(mockPokemon);
  });

  it("should return pokemon when found", async () => {
    const mockPokemon = new Pokemon(25, "pikachu", "https://example.com/25.png");
    const mockRepo: PokemonRepository = {
      searchByName: vi.fn().mockResolvedValue(mockPokemon)
    } as unknown as PokemonRepository;

    const useCase = new SearchPokemonUseCase(mockRepo);
    const result = await useCase.execute("pikachu");

    expect(mockRepo.searchByName).toHaveBeenCalledWith("pikachu");
    expect(result).toEqual(mockPokemon);
    expect(result?.name).toBe("pikachu");
  });

  it("should return null when pokemon is not found", async () => {
    const mockRepo: PokemonRepository = {
      searchByName: vi.fn().mockResolvedValue(null)
    } as unknown as PokemonRepository;

    const useCase = new SearchPokemonUseCase(mockRepo);
    const result = await useCase.execute("unknown");

    expect(mockRepo.searchByName).toHaveBeenCalledWith("unknown");
    expect(result).toBeNull();
  });
});
