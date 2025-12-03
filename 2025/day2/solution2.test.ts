import {
  isInvalidIdPart2,
  findInvalidIdsPart2,
  sumInvalidIdsPart2,
} from "./solution";

describe("Day 2 Part 2: Gift Shop - Repeated Sequences", () => {
  describe("isInvalidIdPart2", () => {
    // Sequence repeated exactly twice (should still be invalid)
    it("should return true for 11 (1 repeated 2 times)", () => {
      expect(isInvalidIdPart2("11")).toBe(true);
    });

    it("should return true for 22 (2 repeated 2 times)", () => {
      expect(isInvalidIdPart2("22")).toBe(true);
    });

    it("should return true for 99 (9 repeated 2 times)", () => {
      expect(isInvalidIdPart2("99")).toBe(true);
    });

    it("should return true for 1010 (10 repeated 2 times)", () => {
      expect(isInvalidIdPart2("1010")).toBe(true);
    });

    it("should return true for 12341234 (1234 repeated 2 times)", () => {
      expect(isInvalidIdPart2("12341234")).toBe(true);
    });

    // Sequence repeated more than twice (new invalid cases)
    it("should return true for 111 (1 repeated 3 times)", () => {
      expect(isInvalidIdPart2("111")).toBe(true);
    });

    it("should return true for 999 (9 repeated 3 times)", () => {
      expect(isInvalidIdPart2("999")).toBe(true);
    });

    it("should return true for 1111111 (1 repeated 7 times)", () => {
      expect(isInvalidIdPart2("1111111")).toBe(true);
    });

    it("should return true for 123123123 (123 repeated 3 times)", () => {
      expect(isInvalidIdPart2("123123123")).toBe(true);
    });

    it("should return true for 1212121212 (12 repeated 5 times)", () => {
      expect(isInvalidIdPart2("1212121212")).toBe(true);
    });

    it("should return true for 565656 (56 repeated 3 times)", () => {
      expect(isInvalidIdPart2("565656")).toBe(true);
    });

    it("should return true for 824824824 (824 repeated 3 times)", () => {
      expect(isInvalidIdPart2("824824824")).toBe(true);
    });

    it("should return true for 2121212121 (21 repeated 5 times)", () => {
      expect(isInvalidIdPart2("2121212121")).toBe(true);
    });

    // Not repeated patterns (should be valid)
    it("should return false for 12 (not a repeat pattern)", () => {
      expect(isInvalidIdPart2("12")).toBe(false);
    });

    it("should return false for 101 (not a repeat pattern)", () => {
      expect(isInvalidIdPart2("101")).toBe(false);
    });

    it("should return false for 100 (not a repeat pattern)", () => {
      expect(isInvalidIdPart2("100")).toBe(false);
    });

    it("should return false for 1234 (not a repeat pattern)", () => {
      expect(isInvalidIdPart2("1234")).toBe(false);
    });

    it("should return false for 112 (not a repeat pattern)", () => {
      expect(isInvalidIdPart2("112")).toBe(false);
    });

    it("should return false for 1698522 (not a repeat pattern)", () => {
      expect(isInvalidIdPart2("1698522")).toBe(false);
    });
  });

  describe("findInvalidIdsPart2", () => {
    it("should find invalid IDs 11 and 22 in range 11-22", () => {
      expect(findInvalidIdsPart2("11-22")).toEqual(["11", "22"]);
    });

    it("should find invalid IDs 99 and 111 in range 95-115", () => {
      expect(findInvalidIdsPart2("95-115")).toEqual(["99", "111"]);
    });

    it("should find invalid IDs 999 and 1010 in range 998-1012", () => {
      expect(findInvalidIdsPart2("998-1012")).toEqual(["999", "1010"]);
    });

    it("should find no invalid IDs in range 1698522-1698528", () => {
      expect(findInvalidIdsPart2("1698522-1698528")).toEqual([]);
    });

    it("should find invalid ID 565656 in range 565653-565659", () => {
      expect(findInvalidIdsPart2("565653-565659")).toEqual(["565656"]);
    });

    it("should find invalid ID 824824824 in range 824824821-824824827", () => {
      expect(findInvalidIdsPart2("824824821-824824827")).toEqual(["824824824"]);
    });

    it("should find invalid ID 2121212121 in range 2121212118-2121212124", () => {
      expect(findInvalidIdsPart2("2121212118-2121212124")).toEqual([
        "2121212121",
      ]);
    });
  });

  describe("sumInvalidIdsPart2", () => {
    it("should return 4174379265 for the example input", () => {
      const input =
        "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124";
      expect(sumInvalidIdsPart2(input)).toBe(4174379265);
    });
  });
});
