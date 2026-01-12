import type { Pokemon } from "../../../core/domain/models/pokemon";
import { PokemonCard } from "../PokemonCard/PokemonCard";


export function PokemonGrid({ pokemons }: { pokemons: Pokemon[] }) {
    return (
      <div className="grid grid-cols-3 gap-3 p-4">
        {pokemons.map(p => (
          <PokemonCard key={p.number} pokemon={p} />
        ))}
      </div>
    );
  }
