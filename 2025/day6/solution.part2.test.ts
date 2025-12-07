import { solvePart2 } from "./solution";
//  ALL OF THESE TESTS ARE BROKEN BECAUSE THE PROBLEM GIVES US A STUPID EXAMPLE WITH A DIFFERENT NUMBER OF ROWS (3 vs 4). so stupid..
describe("Day 6: Trash Compactor - Part 2", () => {
  describe("Part 2", () => {
    it("should solve the example problem", () => {
      // Input read right-to-left, column by column
      // 123 328 51 64
      // 45 64 387 23
      // 6 98 215 314
      // Rightmost: 4 + 431 + 623 = 1058
      // Second: 175 * 581 * 32 = 3253600
      // Third: 8 + 248 + 369 = 625
      // Leftmost: 356 * 24 * 1 = 8544
      // Total: 3263827
      // Operators from Part 1 example: * + * +
      // Part 2 reads right-to-left, so operators become: + * + *
      const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
      expect(solvePart2(input)).toBe(3263827);
    });
    it("should read numbers column by column from right to left", () => {
      // Simple test: single column per problem
      // If we have "1\n2\n3" that's digits 1, 2, 3 read top-to-bottom = number 123
      const input = "1\n2\n3\n\n+";

      // Single number 123, with + operator, should just be 123
      expect(solvePart2(input)).toBe(123);
    });

    it("should handle multiplication with column-based numbers", () => {
      // Two single-digit columns separated by space
      // "1 2\n1 2\n1 2" → first column is 111, second column is 222
      const input = "1 2\n1 2\n1 2\n\n* *";

      // 111 and 222 as separate problems with * operator
      // Each problem has only one number, so result is just that number
      // Wait - need to understand problem structure better
      // Problems are separated by space columns
      expect(solvePart2(input)).toBe(111 + 222);
    });

    it("should correctly identify problem boundaries by space columns", () => {
      // Numbers are arranged in columns by character position
      // Looking at the grid character by character:
      // Position:  0123456789...
      // Row 1:     123 328 51 64
      // Row 2:     45 64 387 23
      // Row 3:     6 98 215 314
      // Reading right-to-left by character column, space columns separate problems
      const input = "123 328 51 64\n45 64 387 23\n6 98 215 314\n\n* + * +";

      expect(solvePart2(input)).toBe(3263827);
    });
  });
});
