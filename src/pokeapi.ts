export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // implment this
    if (!pageURL) {
      pageURL = `${PokeAPI.baseURL}/location-area`;
    }

    const response = await fetch(pageURL);
    const data = (await response.json()) as ShallowLocations;
    if (!response.ok) {
      throw new Error(`Error Fetching URL: ${data} `);
    }

    return data;
  }

  // async fetchLocation(locationName: string): Promise<Location> {
  //   // implement this
  // }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

export type Location = {
  // add properties here
};
