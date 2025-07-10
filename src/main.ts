import { startREPL } from "./repl.js";
import { initState, type State } from "./state.js";

async function main() {
  const state: State = initState(1000 * 60 * 5);
  await startREPL(state);
}

await main();
