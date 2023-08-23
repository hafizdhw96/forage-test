import React, { useState } from "react";

interface HeaderProps {
  title: string;
  onSearch: (key: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSearch }) => {
  const [search, setSearch] = useState("");
  return (
    <header className="absolute flex justify-between items-center p-4 bg-dark w-full h-20 top-0">
      <div className="text-light text-xl font-bold">{title}</div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md border focus:outline-none focus:ring focus:border-primary"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => onSearch(search)}
          className="ml-2 px-4 py-2 bg-primary text-light rounded-md"
        >
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
