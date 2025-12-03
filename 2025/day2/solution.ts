/**
 * Day 2: Gift Shop
 *
 * Find invalid product IDs in given ranges. An invalid ID is one made of
 * a sequence of digits repeated exactly twice (e.g., 55, 6464, 123123).
 *
 * Example Input:
 *   "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"
 *
 * Example Output:
 *   1227775554 (sum of all invalid IDs)
 *
 * Invalid IDs found in example:
 *   - 11-22: 11, 22
 *   - 95-115: 99
 *   - 998-1012: 1010
 *   - 1188511880-1188511890: 1188511885
 *   - 222220-222224: 222222
 *   - 446443-446449: 446446
 *   - 38593856-38593862: 38593859
 */

export function isInvalidId(id: number): boolean {
  return false;
}

export function findInvalidIds(input: string): number[] {
  return [];
}

export function sumInvalidIds(input: string): number {
  return 0;
}
