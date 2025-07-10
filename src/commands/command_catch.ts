import { addToPokedex, State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Catch Command takes 1 and only 1 pokemon");
  }

  const pokemonToCatch = args[0];
  console.log(`Throwing a Pokeball at ${pokemonToCatch}...`);

  const wasPokemonCaught = Math.random() > 0.5;

  if (wasPokemonCaught) {
    addToPokedex(state, pokemonToCatch);
    console.log(`${pokemonToCatch} was caught!`);
  } else {
    console.log(`${pokemonToCatch} escaped!`);
  }
}
