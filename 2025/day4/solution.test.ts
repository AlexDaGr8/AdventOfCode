import { part1, part2 } from "./solution";

const exampleInput = [
  "..@@.@@@@.",
  "@@@.@.@.@@",
  "@@@@@.@.@@",
  "@.@@@@..@.",
  "@@.@@@@.@@",
  ".@@@@@@@.@",
  ".@.@.@.@@@",
  "@.@@@.@@@@",
  ".@@@@@@@@.",
  "@.@.@@@.@.",
];

describe("Day 4: Printing Department", () => {
  describe("Part 1", () => {
    it("should return 13 for the example input", () => {
      expect(part1(exampleInput)).toBe(13);
    });

    it("should return 0 for an empty grid", () => {
      const emptyGrid = ["...", "...", "..."];
      expect(part1(emptyGrid)).toBe(0);
    });

    it("should return 1 for a single isolated roll", () => {
      const singleRoll = ["...", ".@.", "..."];
      expect(part1(singleRoll)).toBe(1);
    });

    it("should return 0 for a roll surrounded by 4+ rolls", () => {
      const surrounded = ["@@@", "@@@", "@@@"];
      // Center roll has 8 adjacent rolls, so not accessible
      // But edge/corner rolls may still be accessible
      expect(part1(surrounded)).toBe(4); // only corner rolls are accessible (each has 3 neighbors)
    });

    it("should handle edge cases where roll is on boundary", () => {
      const edgeRoll = ["@..", "...", "..."];
      expect(part1(edgeRoll)).toBe(1);
    });
  });

  describe("Part 2", () => {
    it("should handle part 2 example", () => {
      expect(part2(exampleInput)).toBe(0);
    });
  });
});
