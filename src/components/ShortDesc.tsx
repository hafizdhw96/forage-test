import React, { useEffect, useState } from "react";


interface ShortDescProps {
  id?: number;
  title: string;
  description?: string;
}

const key = "PokemonFavorite";

const ShortDesc: React.FC<ShortDescProps> = ({ title, id, description }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.setItem(`${key}${id}`, "true");
    } else {
      localStorage.removeItem(`${key}${id}`);
    }
  };

  useEffect(() => {
    const isFavorite = localStorage.getItem(`${key}${id}`);
    if (isFavorite) {
      setIsFavorite(true);
    }
  }, [id]);

  return (
    <div className={!description ? "absolute bottom-0 w-full" : ""}>
      <div className="flex items-center border shadow-md bg-dark w-full px-6">
        {/* Left Side - Title */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-light">{title}</h2>
        </div>

        {/* Right Side - Favorite Button */}
        <button className={`ml-4 p-2 rounded-full`} onClick={toggleFavorite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-light ${
              isFavorite ? "text-primary" : "text-light"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17l-1.45-1.32C7.88 14.1 5.8 11.49 5.8 9.5c0-1.81 1.46-3.27 3.27-3.27.95 0 1.85.41 2.45 1.13.6-.72 1.5-1.13 2.45-1.13 1.81 0 3.27 1.46 3.27 3.27 0 1.99-2.08 4.6-4.75 8.18L12 19z"
            />
          </svg>
        </button>
      </div>
      {!!description && <p className="text-light py-5">{description}</p>}
    </div>
  );
};

export default ShortDesc;
