"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface SearchbarProps {
  pokemon: string[];
}

export default function Searchbar({ pokemon }: SearchbarProps) {
  const [query, setQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<string[] | null>(null);

  useEffect(() => {
    const filterPokemon = () => {
      if (!query) {
        setFilteredPokemon(null);
      } else {
        setFilteredPokemon(
          pokemon
            .filter((pokemonName) => pokemonName.includes(query.toLowerCase()))
            .sort((a, b) => {
              // sort such that pokemon names that start with query are at the top of the list
              let s1 = a.indexOf(query.toLowerCase());
              let s2 = b.indexOf(query.toLowerCase());
              if (s1 > s2) return 1;
              else if (s1 < s2) return -1;
              else return 0;
            }),
        );
      }
    };

    filterPokemon();
  }, [query, pokemon]);

  return (
    <>
      <div className="dropdown">
        <div className="form-control">
          <input
            tabIndex={0}
            name="searchQuery"
            type="search"
            placeholder="Search pokemon..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered w-full max-w-xs bg-base-200 placeholder-black placeholder-opacity-50 focus:outline-none"
          />
        </div>
        {filteredPokemon != null && (
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] mt-2 w-52 rounded-b-lg border-t-2 border-black bg-base-200 p-2 shadow"
          >
            {filteredPokemon.slice(0, 10).map((pokemonName) => (
              <li key={pokemonName}>
                <Link
                  href={`/pokemon/${pokemonName}`}
                  onClick={() => {
                    setFilteredPokemon(null);
                    setQuery("");
                    return;
                  }}
                  className="capitalize"
                >
                  {pokemonName}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
