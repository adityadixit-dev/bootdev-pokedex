import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "hello world",
    expected: ["hello", "world"],
  },
  {
    input: "hello world dixi",
    expected: ["hello", "world", "dixi"],
  },
  {
    input: "Hello world dixi",
    expected: ["hello", "world", "dixi"],
  },
  {
    input: "HeLlo worlD diXi",
    expected: ["hello", "world", "dixi"],
  },
  {
    input: "   HeLlo    worlD    diXi  ",
    expected: ["hello", "world", "dixi"],
  },
  {
    input: "   HeLlo    worlD    diXi is the best  ",
    expected: ["hello", "world", "dixi", "is", "the", "best"],
  },
  {
    input: "  ",
    expected: [],
  },
  {
    input: "  hello  ",
    expected: ["hello"],
  },
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "  HellO  World  ",
    expected: ["hello", "world"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const idx in expected) {
      expect(actual[idx]).toBe(expected[idx]);
    }
  });
});
