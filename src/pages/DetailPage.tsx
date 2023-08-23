import { useLocation } from "react-router-dom";
import ShortDesc from "../components/ShortDesc";
import { FlavorTextEntry, PokemonDetailResult } from "../interfaces";
import { PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";
import { getDescription } from "../utils/utils";

const DetailPage = () => {
  const [description, setDescription] = useState<string>("");
  const location = useLocation();
  const pokemonResult = location.state as PokemonDetailResult;

  useEffect(() => {
    async function fetchSpecies() {
      try {
        const api = new PokemonClient(); // create a PokemonClient
        const res = await api.getPokemonSpeciesById(pokemonResult.id);
        const desc = getDescription(
          res.flavor_text_entries as unknown as FlavorTextEntry[]
        );
        setDescription(desc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchSpecies();
  }, [pokemonResult.id]);

  return (
    <div className="bg-secondary flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white w-1/2 rounded-lg shadow-md relative">
        <div className="w-full bg-light flex justify-center">
          <img
            src={pokemonResult?.sprites?.front_default}
            alt="Product"
            className="object-cover w-1/2 h-auto"
          />
        </div>
        <ShortDesc
          title="Test"
          id={pokemonResult?.id}
          description={description}
        />
      </div>
    </div>
  );
};

export default DetailPage;
