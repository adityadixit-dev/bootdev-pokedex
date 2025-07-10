import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { CLICommand } from "../state.js";
import { commandMap, commandMapB } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays a list of areas for the pokemon",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays a list of previous areas for the pokemon",
      callback: commandMapB,
    },
    explore: {
      name: "explore",
      description: "Explore an area for pokemon",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },
  };
}
