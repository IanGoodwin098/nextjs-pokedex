import { cache } from "react";
import { Metadata } from "next";
import Image from "next/image";
import pokeball from "@/assets/icons8-pokeball-48.png";

const pokemonTypeColor = {
  fire: "238, 129, 48",
  normal: "168, 167, 122",
  water: "99, 144, 240",
  grass: "122, 199, 76",
  electric: "247, 208, 44",
  ice: "150, 217, 214",
  fighting: "194, 46, 40",
  poison: "163, 62, 161",
  ground: "226, 191, 101",
  flying: "9, 143, 243",
  psychic: "249, 85, 135",
  bug: "166, 185, 26",
  rock: "182, 161, 54",
  ghost: "115, 87, 151",
  dragon: "111, 53, 252",
  dark: "112, 87, 70",
  steel: "183, 183, 206",
  fairy: "214, 133, 173",
};

interface PokemonPageProps {
  params: {
    id: string;
  };
}
export function generateMetadata({
  params: { id },
}: PokemonPageProps): Metadata {
  return {
    title: "NextJS Pokedex - " + id,
  };
}

//Dynamic route - fetch must be manually cached
const getPokemonData = cache(async (id: string) => {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(
    (res) => res.json(),
  );

  const species = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
  ).then((res) => res.json());

  const evolution = await fetch(species.evolution_chain.url).then((res) =>
    res.json(),
  );

  // fetch list of moves from pokemon
  const response = await pokemon.moves.map((move: any) =>
    fetch(move.move.url).then((res) => res.json()),
  );
  const moves = await Promise.all(response); // resolve moves promise array

  return { pokemon, species, evolution, moves };
});

export default async function PokemonPage({
  params: { id },
}: PokemonPageProps) {
  const { pokemon, moves, species, evolution } = await getPokemonData(id);
  return (
    <div className="grid-bg-black bg-secondary pt-2">
      <div className="flex-col gap-4 px-4 md:grid md:grid-cols-3 md:grid-rows-2">
        <div className="mb-2 md:row-span-1 ">
          <figure className="px-5 py-5">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt="Pokemon"
              width={500}
              height={400}
              className={`h-96 rounded-lg bg-transparent`}
            />
          </figure>
          <div className={`card card-compact bg-base-100 shadow-xl`}>
            <div className="card-body">
              <h2 className="card-title">
                {pokemon.types.map((elem: any, index: number) => (
                  <div
                    key={index}
                    className="badge font-normal"
                    style={{
                      backgroundColor: `rgba(${
                        pokemonTypeColor[
                          `${elem.type.name}` as keyof typeof pokemonTypeColor
                        ]
                      }, 0.5)`,
                    }}
                  >
                    {elem.type.name}
                  </div>
                ))}
              </h2>
              <p className="text-lg font-light italic">
                {species.flavor_text_entries
                  .find((element: any) => element.language.name === "en")
                  .flavor_text.replace("\f", "\n")
                  .replace("\u00ad\n", "")
                  .replace("\u00ad", "")
                  .replace(" -\n", " - ")
                  .replace("-\n", "-")
                  .replace("\n", " ")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 mb-2 rounded-xl bg-base-100 pb-5 shadow-xl md:col-span-2 md:ms-4 md:h-[450px] md:w-[600px] md:self-center md:justify-self-center">
          <div className="flex flex-row rounded-t-xl border-b-2 border-black bg-primary p-2  text-white shadow-lg">
            <Image
              src={pokeball}
              alt="Pokeball"
              height={48}
              width={48}
              className=""
            />
            <h1 className="mt-1 text-4xl font-semibold uppercase">{`${pokemon.id}\u00A0\u00A0\u00A0\u00A0${pokemon.name}`}</h1>
          </div>
          <div className="mt-1 ps-4">
            <h2 className="mb-2 text-2xl font-semibold capitalize">
              Basic Info
            </h2>
            <div className="ps-5 text-lg">
              <p className="">{`Height: ${pokemon.height / 10} m`}</p>
              <p className="">{`Weight: ${pokemon.weight / 10} kg`}</p>
              <p className="">{`Species: ${
                species.genera.find((idx: any) => idx.language.name === "en")
                  .genus
              }`}</p>
            </div>
          </div>
          <div className="divider mb-0 px-3"></div>
          <div className="mt-1 ps-4">
            <h2 className="mb-2 text-2xl font-semibold capitalize">
              Base Stats
            </h2>
            <div className="flex flex-row justify-between ps-5 text-lg">
              {pokemon.stats.map((stat: any) => (
                <div key={stat.stat.name} className="flex flex-col">
                  <p className="text-sm capitalize underline md:text-lg">
                    {stat.stat.name}
                  </p>
                  <p className="text-center">{stat.base_stat}</p>
                </div>
              ))}
              <div className="pe-2"></div>
            </div>
          </div>
          <div className="divider mb-0 px-3"></div>
          <div className="mt-1 ps-4">
            <h2 className="mb-2 text-2xl font-semibold capitalize">
              Abilities
            </h2>
            <div className="flex flex-row justify-evenly ps-5 text-lg">
              {pokemon.abilities.map((idx: any) => (
                <p key={idx.ability.name}>{idx.ability.name}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-3  mb-4 justify-self-center">
          <div className="h-[600px] overflow-y-auto">
            <table className="table bg-base-100">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Attack Name</th>
                  <th>Type</th>
                  <th>Cat.</th>
                  <th>Att.</th>
                  <th>Acc.</th>
                  <th>PP</th>
                  <th>Effect %</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {moves.map((move, idx) => (
                  <tr key={move.name}>
                    <th>{idx + 1}</th>
                    <td>{move.name}</td>
                    <td>{move.type.name}</td>
                    <td>{move.damage_class.name}</td>
                    <td>{move.power || "--"}</td>
                    <td>{move.accuracy}</td>
                    <td>{move.pp}</td>
                    <td>{move.effect_chance || "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
