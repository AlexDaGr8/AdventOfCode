import { findMaxJoltage, calculateTotalJoltage } from "./solution";

describe("Day 3: Lobby", () => {
  describe("findMaxJoltage", () => {
    it("should return 98 for bank 987654321111111 (first two batteries)", () => {
      expect(findMaxJoltage("987654321111111")).toBe(98);
    });

    it("should return 89 for bank 811111111111119 (non-adjacent batteries)", () => {
      expect(findMaxJoltage("811111111111119")).toBe(89);
    });

    it("should return 78 for bank 234234234234278 (last two batteries)", () => {
      expect(findMaxJoltage("234234234234278")).toBe(78);
    });

    it("should return 92 for bank 818181911112111", () => {
      expect(findMaxJoltage("818181911112111")).toBe(92);
    });

    it("should handle a simple two-digit bank", () => {
      expect(findMaxJoltage("12")).toBe(12);
    });

    it("should handle a bank with all same digits", () => {
      expect(findMaxJoltage("11111")).toBe(11);
    });

    it("should return 99 for bank with two 9s", () => {
      expect(findMaxJoltage("99")).toBe(99);
    });
  });

  describe("calculateTotalJoltage", () => {
    it("should return 357 for the example input", () => {
      const banks = [
        "987654321111111",
        "811111111111119",
        "234234234234278",
        "818181911112111",
      ];
      expect(calculateTotalJoltage(banks)).toBe(357);
    });

    it("should handle a single bank", () => {
      const banks = ["987654321111111"];
      expect(calculateTotalJoltage(banks)).toBe(98);
    });

    it("should handle empty array", () => {
      expect(calculateTotalJoltage([])).toBe(0);
    });
  });
});
