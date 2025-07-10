import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #pokeCache: Cache;

  constructor(cacheInterval: number) {
    this.#pokeCache = new Cache(cacheInterval);
  }

  closeCache() {
    this.#pokeCache.stopReapLoop();
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // implment this

    if (!pageURL) {
      pageURL = `${PokeAPI.baseURL}/location-area`;
    }

    const cachedData = this.#pokeCache.get<ShallowLocations>(pageURL);
    if (cachedData) {
      return cachedData;
    }

    const response = await fetch(pageURL);
    const data = (await response.json()) as ShallowLocations;
    if (!response.ok) {
      throw new Error(`Error Fetching URL: ${data} `);
    }

    this.#pokeCache.add(pageURL, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#pokeCache.get<Location>(url);
    if (cached) {
      return cached;
    }

    try {
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }

      const location: Location = await resp.json();
      this.#pokeCache.add(url, location);
      return location;
    } catch (e) {
      throw new Error(
        `Error fetching location '${locationName}': ${(e as Error).message}`,
      );
    }
  }
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
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
