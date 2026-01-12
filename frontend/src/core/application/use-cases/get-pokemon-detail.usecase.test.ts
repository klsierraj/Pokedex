import { describe, expect, it, vi } from "vitest";
import { GetPokemonDetailUseCase } from "./get-pokemon-detail.usecase";
import type { PokemonRepository } from "../ports/pokemon-repo";
import { PokemonDetail } from "../../domain/models/pokemon-detail";

describe("GetPokemonDetailUseCase", () => {
  it("should call repository findById and return pokemon detail", async () => {
    const mockDetail = new PokemonDetail(
      1,
      "bulbasaur",
      ["grass", "poison"],
      0.7,
      6.9,
      ["overgrow"],
      ["razor-leaf", "solar-beam"],
      {
        hp: 45,
        attack: 49,
        defense: 49,
        special_attack: 65,
        special_defense: 65,
        speed: 45
      },
      "https://example.com/1.png"
    );

    const mockRepo: PokemonRepository = {
      findById: vi.fn().mockResolvedValue(mockDetail)
    } as unknown as PokemonRepository;

    const useCase = new GetPokemonDetailUseCase(mockRepo);
    const result = await useCase.execute(1);

    expect(mockRepo.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockDetail);
    expect(result.id).toBe(1);
    expect(result.name).toBe("bulbasaur");
  });
});
