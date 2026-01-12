import type { PokemonRepository, PokemonListResult } from "../../core/application/ports/pokemon-repo";
import { Pokemon } from "../../core/domain/models/pokemon";
import { PokemonDetail } from "../../core/domain/models/pokemon-detail";
import type { PokemonListResponseDTO, PokemonDetailResponseDTO } from "./dtos/pokemon.dto";
import { apiFetch } from "../../http";

export class PokemonHttpRepository implements PokemonRepository {
    async findAll(page = 1, limit = 20): Promise<PokemonListResult> {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString()
        });
        const res = await apiFetch(`/api/v1/pokemons?${params.toString()}`);
    
        if (!res.ok) {
          throw new Error("Failed to fetch pokemons");
        }
    
        const data: PokemonListResponseDTO = await res.json();
    
        if (!data.success) {
          throw new Error("Failed to fetch pokemons");
        }
    
        return {
          pokemons: data.pokemons.map((item) =>
            new Pokemon(item.number, item.name, item.image_url)
          ),
          pagination: data.pagination
        };
      }

  async findById(id: number): Promise<PokemonDetail> {
    const res = await apiFetch(`/api/v1/pokemons/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch pokemon detail");
    }

    const data: PokemonDetailResponseDTO = await res.json();

    return new PokemonDetail(
      data.id,
      data.name,
      data.types as PokemonDetail["types"][number][],
      data.height,
      data.weight,
      data.abilities,
      data.moves,
      data.base_stats,
      data.image_url
    );
  }

  async searchByName(name: string): Promise<Pokemon | null> {
    if (!name.trim()) {
      return null;
    }

    const res = await apiFetch(`/api/v1/pokemons/search?name=${encodeURIComponent(name.trim())}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("Failed to search pokemon");
    }

    const data = await res.json();
    return new Pokemon(data.number, data.name, data.image_url);
  }
}
