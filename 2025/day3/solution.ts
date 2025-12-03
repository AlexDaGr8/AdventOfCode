/**
 * Day 3: Lobby
 *
 * You need to power the escalator using battery banks.
 * Each line of digits in your input corresponds to a single bank of batteries.
 * Within each bank, you need to turn on exactly two batteries.
 * The joltage produced is equal to the number formed by the digits on the two batteries you turn on.
 * You cannot rearrange batteries - they must stay in their original positions.
 *
 * Find the largest possible joltage each bank can produce, then sum them all.
 *
 * Example Input:
 * 987654321111111
 * 811111111111119
 * 234234234234278
 * 818181911112111
 *
 * Example Output:
 * - 987654321111111 -> 98 (first two batteries)
 * - 811111111111119 -> 89 (battery 8 and battery 9)
 * - 234234234234278 -> 78 (last two batteries)
 * - 818181911112111 -> 92
 * Total: 98 + 89 + 78 + 92 = 357
 */

/**
 * Finds the maximum joltage that can be produced from a single bank of batteries
 * by selecting exactly two batteries (digits) that form the largest 2-digit number.
 * The batteries cannot be rearranged.
 * @param bank - A string of digits representing a bank of batteries
 * @returns The maximum joltage (2-digit number) that can be produced
 */
export function findMaxJoltage(bank: string): number {
  console.log("hello day 3");
  return 0;
}

/**
 * Calculates the total output joltage by summing the maximum joltage from each bank.
 * @param banks - Array of battery bank strings
 * @returns The total output joltage
 */
export function calculateTotalJoltage(banks: string[]): number {
  console.log("hi");
  return 0;
}
