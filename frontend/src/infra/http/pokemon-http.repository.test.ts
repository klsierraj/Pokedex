import { describe, expect, it, beforeEach } from "vitest";
import { PokemonHttpRepository } from "./pokemon-http.repository";
import { Pokemon } from "../../core/domain/models/pokemon";
import { PokemonDetail } from "../../core/domain/models/pokemon-detail";

describe("PokemonHttpRepository", () => {
  let repository: PokemonHttpRepository;

  beforeEach(() => {
    repository = new PokemonHttpRepository();
  });

  describe("findAll", () => {
    it("should return pokemons list with pagination", async () => {
      const result = await repository.findAll(1, 20);

      expect(result.pokemons).toBeInstanceOf(Array);
      expect(result.pokemons.length).toBeGreaterThan(0);
      expect(result.pokemons[0]).toBeInstanceOf(Pokemon);
      expect(result.pagination).toEqual({
        total: expect.any(Number),
        page: 1,
        limit: 20,
        total_pages: expect.any(Number)
      });
    });

    it("should use default page and limit when not provided", async () => {
      const result = await repository.findAll();

      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(20);
    });

    it("should handle different page and limit", async () => {
      const result = await repository.findAll(2, 10);

      expect(result.pagination.page).toBe(2);
      expect(result.pagination.limit).toBe(10);
    });
  });

  describe("findById", () => {
    it("should return pokemon detail for valid id", async () => {
      const result = await repository.findById(1);

      expect(result).toBeInstanceOf(PokemonDetail);
      expect(result.id).toBe(1);
      expect(result.name).toBeDefined();
      expect(result.types).toBeInstanceOf(Array);
      expect(result.baseStats).toBeDefined();
      expect(result.imageUrl).toBeDefined();
    });

    it("should throw error for invalid id", async () => {
      await expect(repository.findById(99999)).rejects.toThrow("Failed to fetch pokemon detail");
    });
  });

  describe("searchByName", () => {
    it("should return pokemon when found", async () => {
      const result = await repository.searchByName("pikachu");

      expect(result).toBeInstanceOf(Pokemon);
      expect(result?.name).toBe("pikachu");
      expect(result?.number).toBeDefined();
      expect(result?.imageUrl).toBeDefined();
    });

    it("should return null for empty string", async () => {
      const result = await repository.searchByName("");

      expect(result).toBeNull();
    });

    it("should return null for whitespace-only string", async () => {
      const result = await repository.searchByName("   ");

      expect(result).toBeNull();
    });

    it("should return null when pokemon is not found", async () => {
      const result = await repository.searchByName("nonexistentpokemon12345");

      expect(result).toBeNull();
    });

    it("should trim whitespace from search term", async () => {
      const result = await repository.searchByName("  pikachu  ");

      expect(result).toBeInstanceOf(Pokemon);
      expect(result?.name).toBe("pikachu");
    });
  });
});
