import React, { useEffect, useState } from "react";
import { capitalizeFirstWords } from "../utils/utils";
import { PokemonClient } from "pokenode-ts";
import { AbilityResult, PokemonDetailResult } from "../interfaces";
import PokemonItemComponent from "./PokemonItem";

export interface AbilityProps {
  name: string;
  url: string;
  onClickItem: (pokemon: PokemonDetailResult) => void;
}
const Ability: React.FC<AbilityProps> = ({ name, onClickItem }) => {
  const [ability, setAbility] = useState<AbilityResult | null>(null);

  useEffect(() => {
    async function fetchAbility() {
      try {
        const api = new PokemonClient(); // create a PokemonClient
        const res = await api.getAbilityByName(name);
        setAbility(res as unknown as AbilityResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAbility();
  }, [name]);

  return (
    <div className="flex flex-col">
      <header className="p-4 bg-gray-200">
        <h1 className="text-xl font-semibold text-light">
          {capitalizeFirstWords(name)}
        </h1>
      </header>
      <div className="flex flex-wrap p-4 gap-y-4">
        {ability?.pokemon.map((item, index) => (
          <PokemonItemComponent
            key={index + item.pokemon.url}
            {...item}
            onClickItem={onClickItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Ability;
