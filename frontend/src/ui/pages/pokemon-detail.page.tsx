import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { makeGetPokemonDetailUseCase } from "../../infra/factories/pokemon.factory";
import type { PokemonDetail } from "../../core/domain/models/pokemon-detail";
import { getPokemonTypeColor } from "../constants/pokemon-type-colors";

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatStatName(stat: string): string {
  const statMap: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    special_attack: "SATK",
    special_defense: "SDEF",
    speed: "SPD",
  };
  return statMap[stat] || stat.toUpperCase();
}

export function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Pokemon ID is required");
      setLoading(false);
      return;
    }

    const useCase = makeGetPokemonDetailUseCase();
    useCase
      .execute(Number(id))
      .then(setPokemon)
      .catch((err) => {
        setError(err.message || "Failed to load pokemon");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-medium">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-medium">{error || "Pokemon not found"}</div>
        </div>
      </div>
    );
  }

  const primaryTypeColor = getPokemonTypeColor(pokemon.primaryType);
  const maxStat = Math.max(...Object.values(pokemon.baseStats));
  const currentId = pokemon.id;
  const hasPrevious = currentId > 1;
  const hasNext = currentId < 1025; 

  const handlePrevious = () => {
    if (hasPrevious) {
      navigate(`/pokemons/${currentId - 1}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      navigate(`/pokemons/${currentId + 1}`);
    }
  };

  return (
    <div className={`flex flex-col min-h-screen w-full ${primaryTypeColor}`}>
      <div className="w-full pt-16 pb-6 px-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/pokemons")}
            className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white"
          >
            ←
          </button>
          <span className="text-white font-bold text-lg capitalize">{pokemon.name}</span>
          <span className="text-white/70 text-sm">#{String(pokemon.id).padStart(3, "0")}</span>
        </div>

        {/* Pokemon Image */}
        <div className="flex justify-center relative">
          <button
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className={`absolute left-0 top-1/2 -translate-y-1/2 text-white text-2xl ${
              hasPrevious ? "hover:opacity-80" : "opacity-50 cursor-not-allowed"
            }`}
          >
            ←
          </button>
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="w-64 h-64 object-contain"
          />
          <button
            onClick={handleNext}
            disabled={!hasNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 text-white text-2xl ${
              hasNext ? "hover:opacity-80" : "opacity-50 cursor-not-allowed"
            }`}
          >
            →
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-6 pt-6 px-4 pb-8 mx-2">
        {/* Types */}
        <div className="flex gap-2 mb-6 justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`${getPokemonTypeColor(type)} text-white text-xs font-semibold px-3 py-1 rounded-full`}
            >
              {capitalizeFirst(type)}
            </span>
          ))}
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h2 className={`${primaryTypeColor.replace("bg-", "text-")} font-bold text-base mb-4`}>
            About
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-medium mb-1">Weight</div>
              <div className="text-sm font-semibold text-gray-dark">
                {pokemon.weight} kg
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-medium mb-1">Height</div>
              <div className="text-sm font-semibold text-gray-dark">
                {pokemon.height} m
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-medium mb-1">Moves</div>
              <div className="text-sm font-semibold text-gray-dark">
                {pokemon.moves.join(", ")}
              </div>
            </div>
          </div>
        </div>

        {/* Base Stats Section */}
        <div>
          <h2 className={`${primaryTypeColor.replace("bg-", "text-")} font-bold text-base mb-4`}>
            Base Stats
          </h2>
          <div className="space-y-3">
            {Object.entries(pokemon.baseStats).map(([stat, value]) => (
              <div key={stat} className="flex items-center gap-4">
                <div className="w-12 text-xs font-semibold text-gray-dark">
                  {formatStatName(stat)}
                </div>
                <div className="w-10 text-xs text-gray-dark">{String(value).padStart(3, "0")}</div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-light rounded-full overflow-hidden">
                    <div
                      className={`h-full ${primaryTypeColor} rounded-full`}
                      style={{ width: `${(value / maxStat) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
