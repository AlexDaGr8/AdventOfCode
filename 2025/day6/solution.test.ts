import { solvePart1, parseInput } from "./solution";

describe("Day 6: Trash Compactor", () => {
  describe("parseInput", () => {
    it("should parse a single column worksheet", () => {
      const input = "10\n20\n30\n\n+";

      const result = parseInput(input);

      expect(result.firstNumber).toEqual([10]);
      expect(result.secondNumber).toEqual([20]);
      expect(result.thirdNumber).toEqual([30]);
      expect(result.fourthNumber).toEqual([]);
      expect(result.sign).toEqual(["+"]);
    });

    it("should parse multiple columns", () => {
      const input = "123 328 51 64\n45 64 387 23\n6 98 215 314\n\n* + * +";

      const result = parseInput(input);

      expect(result.firstNumber).toEqual([123, 328, 51, 64]);
      expect(result.secondNumber).toEqual([45, 64, 387, 23]);
      expect(result.thirdNumber).toEqual([6, 98, 215, 314]);
      expect(result.sign).toEqual(["*", "+", "*", "+"]);
    });

    it("should handle multiplication operator", () => {
      const input = "2\n3\n4\n\n*";

      const result = parseInput(input);

      expect(result.sign).toEqual(["*"]);
    });
  });

  describe("Part 1", () => {
    it("should solve the example problem", () => {
      const input = "123 328 51 64\n45 64 387 23\n6 98 215 314\n\n* + * +";

      expect(solvePart1(input)).toBe(4277556);
    });

    it("should handle a single addition problem", () => {
      const input = "10\n20\n30\n\n+";

      expect(solvePart1(input)).toBe(60);
    });

    it("should handle a single multiplication problem", () => {
      const input = "2\n3\n4\n\n*";

      expect(solvePart1(input)).toBe(24);
    });

    it("should handle multiple problems with mixed operators", () => {
      const input = "5 10\n5 10\n0 0\n\n+ *";

      expect(solvePart1(input)).toBe(10 + 0); // 5+5=10, 10*10*0=0
    });
  });
});
