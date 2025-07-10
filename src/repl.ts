import { State } from "./state.js";

export const startREPL = async (state: State) => {
  const { rl, commands: listOfCommands } = state;

  rl.prompt();

  rl.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const cmd = listOfCommands[commandName];
    const additionaArguements: string[] = [];
    if (words.length > 1) {
      additionaArguements.push(...words.slice(1));
    }

    if (commandName in listOfCommands) {
      try {
        await cmd.callback(state, ...additionaArguements);
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
