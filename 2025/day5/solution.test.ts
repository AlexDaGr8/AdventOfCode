import {
  parseInput,
  // isFresh,
  countFreshIngredients,
  solvePart1,
  Range,
  ParsedInput,
} from "./solution";

const exampleInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

describe("Day 5: Cafeteria", () => {
  describe("parseInput", () => {
    it("should parse ranges and available IDs from input", () => {
      const result = parseInput(exampleInput);

      expect(result.ranges).toEqual([
        [3, 5],
        [10, 14],
        [16, 20],
        [12, 18],
      ]);
      expect(result.availableIds).toEqual([1, 5, 8, 11, 17, 32]);
    });
  });

  describe("countFreshIngredients", () => {
    it("should count 3 fresh ingredients in example", () => {
      const parsed: ParsedInput = {
        ranges: [
          [3, 5],
          [10, 14],
          [16, 20],
          [12, 18],
        ],
        availableIds: [1, 5, 8, 11, 17, 32],
      };
      expect(countFreshIngredients(parsed)).toBe(3);
    });
  });

  describe("solvePart1", () => {
    it("should return 3 for example input", () => {
      expect(solvePart1(exampleInput)).toBe(3);
    });
  });
});
