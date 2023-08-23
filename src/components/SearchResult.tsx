import React, { useState } from "react";
import { PokemonDetailResult } from "../interfaces";
import ShortDesc from "./ShortDesc";

export interface SearchResultProps {
  item: PokemonDetailResult;
  onClickItem: (pokemon: PokemonDetailResult) => void;
}
const SearchResult: React.FC<SearchResultProps> = ({ item, onClickItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col">
      <header className="p-4 bg-gray-200">
        <h1 className="text-xl font-semibold text-light">Search Result :</h1>
      </header>
      <div className="flex flex-wrap p-4 gap-y-4">
        <div
          className="w-1/5 px-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onClickItem(item)}
        >
          <div
            className={`bg-light rounded flex items-center border flex-col relative ${
              isHovered ? "transform scale-110" : ""
            }`}
          >
            <img
              src={item?.sprites?.front_default}
              alt={item?.name}
              className="w-full h-auto object-cover rounded transition-transform duration-300"
            />
            {isHovered && <ShortDesc id={item?.id} title={item?.name} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
