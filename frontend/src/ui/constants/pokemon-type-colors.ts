import type { PokemonType } from "../../core/domain/models/pokemon-detail";

export const POKEMON_TYPE_COLORS: Record<PokemonType, string> = {
  bug: "bg-[#A7B723]",
  dark: "bg-[#755744]",
  dragon: "bg-[#7037FF]",
  electric: "bg-[#F9CF30]",
  fairy: "bg-[#F4BDC9]",
  fighting: "bg-[#C12239]",
  fire: "bg-[#F57D31]",
  flying: "bg-[#A891EC]",
  ghost: "bg-[#7059B8]",
  normal: "bg-[#AAA67F]",
  grass: "bg-[#74CB48]",
  ground: "bg-[#DEC16B]",
  ice: "bg-[#9AD6DF]",
  poison: "bg-[#A43E9E]",
  psychic: "bg-[#FB5584]",
  rock: "bg-[#B69E31]",
  steel: "bg-[#B7B9D0]",
  water: "bg-[#6493EB]",
};

export function getPokemonTypeColor(type: PokemonType): string {
  return POKEMON_TYPE_COLORS[type] || POKEMON_TYPE_COLORS.normal;
}
