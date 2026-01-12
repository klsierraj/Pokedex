export type PokemonType =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "normal"
  | "grass"
  | "ground"
  | "ice"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export type BaseStats = {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
};

export class PokemonDetail {
  readonly id: number;
  readonly name: string;
  readonly types: PokemonType[];
  readonly height: number;
  readonly weight: number;
  readonly abilities: string[];
  readonly moves: string[];
  readonly baseStats: BaseStats;
  readonly imageUrl: string;

  constructor(
    id: number,
    name: string,
    types: PokemonType[],
    height: number,
    weight: number,
    abilities: string[],
    moves: string[],
    baseStats: BaseStats,
    imageUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.moves = moves;
    this.baseStats = baseStats;
    this.imageUrl = imageUrl;
  }

  get primaryType(): PokemonType {
    return this.types[0] || "normal";
  }
}
