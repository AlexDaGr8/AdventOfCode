import { isInvalidId, findInvalidIds, sumInvalidIds } from "./solution";

describe("Day 2: Gift Shop", () => {
  describe("isInvalidId", () => {
    it("should return true for single digit repeated twice (55)", () => {
      expect(isInvalidId(55)).toBe(true);
    });

    it("should return true for two digits repeated twice (6464)", () => {
      expect(isInvalidId(6464)).toBe(true);
    });

    it("should return true for three digits repeated twice (123123)", () => {
      expect(isInvalidId(123123)).toBe(true);
    });

    it("should return true for 11", () => {
      expect(isInvalidId(11)).toBe(true);
    });

    it("should return true for 22", () => {
      expect(isInvalidId(22)).toBe(true);
    });

    it("should return true for 99", () => {
      expect(isInvalidId(99)).toBe(true);
    });

    it("should return true for 1010", () => {
      expect(isInvalidId(1010)).toBe(true);
    });

    it("should return true for 222222", () => {
      expect(isInvalidId(222222)).toBe(true);
    });

    it("should return true for 446446", () => {
      expect(isInvalidId(446446)).toBe(true);
    });

    it("should return true for 1188511885", () => {
      expect(isInvalidId(1188511885)).toBe(true);
    });

    it("should return true for 38593859", () => {
      expect(isInvalidId(38593859)).toBe(true);
    });

    it("should return false for 101 (not a repeat pattern)", () => {
      expect(isInvalidId(101)).toBe(false);
    });

    it("should return false for 12", () => {
      expect(isInvalidId(12)).toBe(false);
    });

    it("should return false for 100", () => {
      expect(isInvalidId(100)).toBe(false);
    });

    it("should return false for 1234", () => {
      expect(isInvalidId(1234)).toBe(false);
    });

    it("should return false for odd-length numbers like 123", () => {
      expect(isInvalidId(123)).toBe(false);
    });
  });

  describe("findInvalidIds", () => {
    it("should find invalid IDs 11 and 22 in range 11-22", () => {
      expect(findInvalidIds("11-22")).toEqual([11, 22]);
    });

    it("should find invalid ID 99 in range 95-115", () => {
      expect(findInvalidIds("95-115")).toEqual([99]);
    });

    it("should find invalid ID 1010 in range 998-1012", () => {
      expect(findInvalidIds("998-1012")).toEqual([1010]);
    });

    it("should find no invalid IDs in range 1698522-1698528", () => {
      expect(findInvalidIds("1698522-1698528")).toEqual([]);
    });
  });

  describe("sumInvalidIds", () => {
    it("should return 1227775554 for the example input", () => {
      const input =
        "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
      expect(sumInvalidIds(input)).toBe(1227775554);
    });
  });
});
