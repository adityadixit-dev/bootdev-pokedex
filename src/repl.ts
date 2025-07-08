import { createInterface } from "readline";
import { getCommands } from "./commands/commands.js";

export const startREPL = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const listOfCommands = getCommands();
    const cmd = listOfCommands[commandName];

    if (commandName in listOfCommands) {
      try {
        listOfCommands[commandName].callback(listOfCommands);
        rl.prompt();
        return;
      } catch (error) {
        console.log(`Error executing command - ${(error as Error).message}`);
      }
    }

    console.log("Unknown command");

    rl.prompt();
  });
};

export const cleanInput = (inputStr: string): string[] => {
  // Split user Input into words array
  // lowercase the input and trim leading or trailing whitespaces
  return inputStr
    .toLowerCase()
    .split(" ")
    .filter((word) => word !== "");
};
