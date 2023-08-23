export interface AbilityItem {
  is_hidden: boolean;
  pokemon: PokemonItem;
  slot: number;
}

export interface PokemonItem {
  name: string;
  url: string;
}

export interface PokemonListResult {
  count: number;
  next: string;
  previous?: number;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface AbilityResult {
  id: number;
  name: string;
  pokemon: AbilityItem[];
}

export interface PokemonDetailResult {
  id: number;
  sprites: Sprites;
  species: PokemonItem;
  name: string;
}

export interface Sprites {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}

export interface SpeciesResult {
  flavor_text_entries: FlavorTextEntry[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Color;
  version: Color;
}

interface Color {
  name: string;
  url: string;
}
