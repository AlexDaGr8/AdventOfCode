import { findMaxJoltage12, calculateTotalJoltage12 } from "./solution";

describe("Day 3 Part 2: Lobby (12 batteries)", () => {
  describe("findMaxJoltage12", () => {
    it("should return 987654321111 for bank 987654321111111 (turn off some 1s at the end)", () => {
      expect(findMaxJoltage12("987654321111111")).toBe(987654321111);
    });

    it("should return 811111111119 for bank 811111111111119 (turn off some 1s)", () => {
      expect(findMaxJoltage12("811111111111119")).toBe(811111111119);
    });

    it("should return 434234234278 for bank 234234234234278 (turn off a 2, 3, and 2 near the start)", () => {
      expect(findMaxJoltage12("234234234234278")).toBe(434234234278);
    });

    it("should return 888911112111 for bank 818181911112111 (turn off some 1s near the front)", () => {
      expect(findMaxJoltage12("818181911112111")).toBe(888911112111);
    });

    it("should handle a bank with exactly 12 digits", () => {
      expect(findMaxJoltage12("123456789012")).toBe(123456789012);
    });

    it("should handle a bank with all same digits", () => {
      expect(findMaxJoltage12("111111111111111")).toBe(111111111111);
    });
  });

  describe("calculateTotalJoltage12", () => {
    it("should return 3121910778619 for the example input", () => {
      const banks = [
        "987654321111111",
        "811111111111119",
        "234234234234278",
        "818181911112111",
      ];
      expect(calculateTotalJoltage12(banks)).toBe(3121910778619);
    });

    it("should handle a single bank", () => {
      const banks = ["987654321111111"];
      expect(calculateTotalJoltage12(banks)).toBe(987654321111);
    });

    it("should handle empty array", () => {
      expect(calculateTotalJoltage12([])).toBe(0);
    });
  });
});
