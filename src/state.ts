import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands/commands.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  poke: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    rl: rl,
    commands: getCommands(),
    poke: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
