import { useNavigate } from "react-router-dom";
import type { Pokemon } from "../../../core/domain/models/pokemon";

interface Props {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pokemons/${pokemon.number}`)}
      className="flex flex-col items-center bg-white rounded-xl shadow-drop-2 p-3 cursor-pointer"
    >
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        className="w-16 h-16 object-contain"
      />

      <span className="text-xs text-gray-medium mt-1">
        #{String(pokemon.number).padStart(3, "0")}
      </span>

      <span className="text-sm font-semibold text-gray-dark">
        {pokemon.name}
      </span>
    </div>
  );
}
