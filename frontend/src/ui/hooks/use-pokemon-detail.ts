import { useQuery } from "@tanstack/react-query";
import { makeGetPokemonDetailUseCase } from "../../infra/factories/pokemon.factory";
import type { PokemonDetail } from "../../core/domain/models/pokemon-detail";

export function usePokemonDetail(id: number) {
  return useQuery<PokemonDetail>({
    queryKey: ["pokemon-detail", id],
    queryFn: async () => {
      const useCase = makeGetPokemonDetailUseCase();
      return useCase.execute(id);
    },
    enabled: !!id,
  });
}
