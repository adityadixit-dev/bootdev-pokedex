import { startREPL } from "./repl.js";
import { initState, type State } from "./state.js";

function main() {
  const state: State = initState();
  startREPL(state);
}

main();
