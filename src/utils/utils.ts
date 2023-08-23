import { FlavorTextEntry } from "../interfaces";

export const capitalizeFirstWords = (inputString: string) => {
  const words = inputString.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};

export const getDescription = (flavorTextEntries: FlavorTextEntry[]) => {
  // Find the English flavor text
  let description = "";
  for (const entry of flavorTextEntries) {
    if (entry.language.name === "en") {
      description = entry.flavor_text;
      break;
    }
  }

  return description;
};
