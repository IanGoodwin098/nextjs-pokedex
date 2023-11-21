import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import Searchbar from "./Searchbar";

async function searchPokemon(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) {
    redirect(`/pokemon/${searchQuery}`);
  }
}

async function getPokemon(): Promise<string[]> {
  return await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1017")
    .then((res) => res.json())
    .then((data) => data.results.map((obj: { name: string }) => obj.name));
}

export default async function Navbar() {
  const pokemon = await getPokemon();
  return (
    <div className="navbar border-b-2 border-b-black bg-primary shadow-2xl">
      <div className="gap-2">
        <Link className="btn btn-ghost" href={"/"}>
          <Image src={logo} height={120} width={120} alt="Pokedex logo" />
        </Link>
        <form action={searchPokemon}>
          <Searchbar pokemon={pokemon} />
        </form>
      </div>
    </div>
  );
}
