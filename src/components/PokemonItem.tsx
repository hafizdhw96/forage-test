import React, { useEffect, useState } from "react";
import { PokemonDetailResult, PokemonItem } from "../interfaces";
import { PokemonClient } from "pokenode-ts";
import ShortDesc from "./ShortDesc";

interface PokemonItemProps {
  is_hidden: boolean;
  pokemon: PokemonItem;
  slot: number;
  onClickItem: (pokemon: PokemonDetailResult) => void;
}

const PokemonItemComponent: React.FC<PokemonItemProps> = ({
  pokemon: pokemonProps,
  onClickItem,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonDetailResult>();

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const api = new PokemonClient(); // create a PokemonClient
        const res = await api.getPokemonByName(pokemonProps?.name);

        setPokemon(res as unknown as PokemonDetailResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchPokemon();
  }, [pokemonProps?.name]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (pokemon?: PokemonDetailResult) => {
    if (pokemon) {
      onClickItem(pokemon);
    }
  };

  return (
    <div
      className="w-1/5 px-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(pokemon)}
    >
      <div
        className={`bg-light rounded flex items-center border flex-col relative ${
          isHovered ? "transform scale-110" : ""
        }`}
      >
        <img
          src={pokemon?.sprites?.front_default}
          alt={pokemonProps?.name}
          className="w-full h-auto object-cover rounded transition-transform duration-300"
        />
        {isHovered && <ShortDesc id={pokemon?.id} title={pokemonProps?.name} />}
      </div>
    </div>
  );
};

export default PokemonItemComponent;
