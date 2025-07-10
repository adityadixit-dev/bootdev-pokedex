import { State } from "../state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("Invalid number of arguements to explore");
  }

  const location = args[0];

  try {
    console.log(`Exploring ${location}...`);
    const exploreData = await state.poke.fetchLocation(location);
    console.log("Found Pokemon:");
    exploreData.pokemon_encounters.map((encounter) =>
      console.log(`- ${encounter.pokemon.name}`),
    );
  } catch (error) {
    console.log("Error getting pokemon from location");
  }
}
