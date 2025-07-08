import { type State } from "../state.js";

export async function commandMap(state: State) {
  let pageURL = state.nextLocationsURL;
  try {
    const locationsData = await state.poke.fetchLocations(pageURL);
    locationsData.results.map((location) => console.log(location.name));

    state.nextLocationsURL = locationsData.next;
    state.prevLocationsURL = locationsData.previous ?? "";
  } catch (err) {
    console.log(err);
  }
}

export async function commandMapB(state: State) {
  let pageURL = state.prevLocationsURL;

  if (!pageURL) {
    console.log("you're on the first page");
    return;
  }

  try {
    const locationsData = await state.poke.fetchLocations(pageURL);
    locationsData.results.map((location) => console.log(location.name));

    state.nextLocationsURL = locationsData.next;
    state.prevLocationsURL = locationsData.previous ?? "";
  } catch (err) {
    console.log(err);
  }
}
