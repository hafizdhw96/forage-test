import { useEffect, useRef, useState } from "react";
import Ability from "../components/Ability";
import Header from "../components/Header";
import { PokemonClient } from "pokenode-ts";
import { PokemonDetailResult, PokemonListResult } from "../interfaces";
import { useNavigate } from "react-router-dom";
import SearchResult from "../components/SearchResult";

const HomePage = () => {
  const navigate = useNavigate();
  const [abilities, setAbilities] = useState<PokemonListResult | null>(null);
  const [searchPokemon, setSearchPokemon] =
    useState<PokemonDetailResult | null>();
  const api = useRef<PokemonClient>();

  useEffect(() => {
    async function fetchAbilities() {
      try {
        api.current = new PokemonClient(); // create a PokemonClient
        const res = await api.current.listAbilities(0, 3);
        setAbilities(res as unknown as PokemonListResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchAbilities();
  }, []);

  const onClickItem = (pokemon: PokemonDetailResult) => {
    navigate("/detail", { state: { ...pokemon } });
  };

  const onSearch = async (key: string) => {
    if (key) {
      try {
        const res = await api.current?.getPokemonByName(key);
        setSearchPokemon(res as unknown as PokemonDetailResult);
      } catch (error) {
        setSearchPokemon(null);
      }
    } else {
      setSearchPokemon(null);
    }
  };

  console.log(searchPokemon);

  return (
    <div className="min-h-screen flex justify-center bg-secondary w-full flex-col relative">
      <Header title="Pokemon Ability" onSearch={onSearch} />
      <div className="flex flex-col mt-20 mb-20">
        {!!searchPokemon && (
          <SearchResult item={searchPokemon} onClickItem={onClickItem} />
        )}
        {abilities?.results.map((item, index) => (
          <Ability key={index} {...item} onClickItem={onClickItem} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
