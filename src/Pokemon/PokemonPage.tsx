import { useCounter } from "./Hook/useCounter";
import { usePockemon } from "./Hook/usePokemon";

export const PokemonPage = () => {

  const { count, increment, decrement } = useCounter()
  const { pokemon, isLoading, formattedId } = usePockemon({ id: count })

  if (isLoading) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">Cargando ...</h3>
      </div>
    )
  }


  if (!pokemon) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">No encontrado</h3>
      </div>
    )
  }

  return (
    <div className="bg-gradient flex flex-col items-center">
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>
      <h3 className="text-xl font-bold text-white">#{formattedId}  {pokemon?.name}</h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`}
        alt={pokemon.name}
      />

      <div className="flex gap-2">

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={decrement}
        >
          Anterior
        </button>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={increment}
        >
          Siguiente
        </button>

      </div>
    </div>
  );
};