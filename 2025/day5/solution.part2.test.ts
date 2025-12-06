import {
  parseInput,
  countUniqueFreshIds,
  combineIntervals,
  solvePart2,
  Range,
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

describe("Day 5 Part 2: Cafeteria", () => {
  describe("countUniqueFreshIds", () => {
    it("should return 14 for example ranges", () => {
      const ranges: Range[] = [
        [3, 5],
        [10, 14],
        [16, 20],
        [12, 18],
      ];
      expect(countUniqueFreshIds(ranges)).toBe(14);
    });

    it("should handle a single range", () => {
      const ranges: Range[] = [[1, 5]];
      expect(countUniqueFreshIds(ranges)).toBe(5);
    });

    it("should handle fully overlapping ranges", () => {
      const ranges: Range[] = [
        [1, 10],
        [3, 7],
      ];
      expect(countUniqueFreshIds(ranges)).toBe(10);
    });

    it("should handle adjacent ranges", () => {
      const ranges: Range[] = [
        [1, 5],
        [6, 10],
      ];
      expect(countUniqueFreshIds(ranges)).toBe(10);
    });

    it("should handle non-overlapping ranges", () => {
      const ranges: Range[] = [
        [1, 3],
        [10, 12],
      ];
      expect(countUniqueFreshIds(ranges)).toBe(6);
    });
  });

  describe("combineIntervals", () => {
    it("should combine overlapping ranges", () => {
      const ranges: Range[] = [
        [3, 5],
        [4, 8],
      ];
      expect(combineIntervals(ranges)).toEqual([[3, 8]]);
    });

    it("should combine multiple overlapping ranges from example", () => {
      const ranges: Range[] = [
        [3, 5],
        [10, 14],
        [16, 20],
        [12, 18],
      ];
      expect(combineIntervals(ranges)).toEqual([
        [3, 5],
        [10, 20],
      ]);
    });

    it("should handle adjacent ranges (touching at boundary)", () => {
      const ranges: Range[] = [
        [1, 5],
        [5, 10],
      ];
      expect(combineIntervals(ranges)).toEqual([[1, 10]]);
    });

    it("should keep non-overlapping ranges separate", () => {
      const ranges: Range[] = [
        [1, 3],
        [10, 12],
      ];
      expect(combineIntervals(ranges)).toEqual([
        [1, 3],
        [10, 12],
      ]);
    });

    it("should handle a single range", () => {
      const ranges: Range[] = [[5, 10]];
      expect(combineIntervals(ranges)).toEqual([[5, 10]]);
    });

    it("should handle fully contained ranges", () => {
      const ranges: Range[] = [
        [1, 10],
        [3, 7],
      ];
      expect(combineIntervals(ranges)).toEqual([[1, 10]]);
    });

    it("should handle unsorted input ranges", () => {
      const ranges: Range[] = [
        [10, 15],
        [1, 5],
        [3, 8],
      ];
      expect(combineIntervals(ranges)).toEqual([
        [1, 8],
        [10, 15],
      ]);
    });

    it("should handle multiple separate groups", () => {
      const ranges: Range[] = [
        [1, 3],
        [5, 7],
        [9, 11],
      ];
      expect(combineIntervals(ranges)).toEqual([
        [1, 3],
        [5, 7],
        [9, 11],
      ]);
    });
  });

  describe("solvePart2", () => {
    it("should return 14 for example input", () => {
      expect(solvePart2(exampleInput)).toBe(14);
    });
  });
});
