import type { State } from "../state.js";

export function commandHelp(state: State) {
  const { commands } = state;

  console.log("");
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");
  console.log("");

  for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`);
  }

  console.log("");
}
