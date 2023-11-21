import PaginationBar from "./PaginationBar/PaginationBar";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  searchParams: { page: string };
}

async function getPokemon(): Promise<string[]> {
  return await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1017")
    .then((res) => res.json())
    .then((data) => data.results.map((obj: { name: string }) => obj.name));
}

export default async function Home({
  searchParams: { page = "1" },
}: HomeProps) {
  const allPokemon = await getPokemon();

  //Pagination vars
  const currentPage = parseInt(page);
  const pokemonPerPage = 36;
  const totalPokemon = allPokemon.length;
  const totalPages = Math.ceil(totalPokemon / pokemonPerPage);

  const pokemon = allPokemon.slice(
    pokemonPerPage * (currentPage - 1),
    pokemonPerPage * currentPage,
  );
  return (
    <div className="grid-bg-black flex flex-col items-center bg-secondary">
      <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        {pokemon.map((pokemonName, idx) => (
          <Link key={pokemonName} href={`/pokemon/${pokemonName}`}>
            <figure>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  idx + 1 + pokemonPerPage * (currentPage - 1)
                }.png`}
                alt="Pokemon"
                width={200}
                height={200}
                className=""
              />
            </figure>
            <div className="card card-compact bg-base-100 shadow-xl hover:bg-base-200 hover:shadow-2xl active:bg-base-300 active:shadow-md">
              <div className="card-body">
                <div className="card-title capitalize">{pokemonName}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <PaginationBar currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
