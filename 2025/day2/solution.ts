/**
 * Day 2: Gift Shop
 *
 * Part 1:
 * Find invalid product IDs in given ranges. An invalid ID is one made of
 * a sequence of digits repeated exactly twice (e.g., 55, 6464, 123123).
 *
 * Part 1 Example Input:
 *   "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"
 *
 * Part 1 Example Output:
 *   1227775554 (sum of all invalid IDs)
 *
 * Part 1 Invalid IDs found in example:
 *   - 11-22: 11, 22
 *   - 95-115: 99
 *   - 998-1012: 1010
 *   - 1188511880-1188511890: 1188511885
 *   - 222220-222224: 222222
 *   - 446443-446449: 446446
 *   - 38593856-38593862: 38593859
 *
 * Part 2:
 * An ID is invalid if it is made only of some sequence of digits repeated
 * at least twice (not just exactly twice).
 * Examples: 12341234 (1234 x2), 123123123 (123 x3), 1212121212 (12 x5), 1111111 (1 x7)
 *
 * Part 2 Example Input:
 *   (same as Part 1)
 *
 * Part 2 Example Output:
 *   4174379265 (sum of all invalid IDs)
 *
 * Part 2 Invalid IDs found in example:
 *   - 11-22: 11, 22
 *   - 95-115: 99, 111
 *   - 998-1012: 999, 1010
 *   - 1188511880-1188511890: 1188511885
 *   - 222220-222224: 222222
 *   - 1698522-1698528: (none)
 *   - 446443-446449: 446446
 *   - 38593856-38593862: 38593859
 *   - 565653-565659: 565656
 *   - 824824821-824824827: 824824824
 *   - 2121212118-2121212124: 2121212121
 */

export function isInvalidId(id: string): boolean {
  let right = id.length / 2;
  let left = 0;
  while (right < id.length) {
    if (id[left] !== id[right]) {
      return false;
    }
    left++;
    right++;
  }

  return true;
}

export function findInvalidIds(input: string): string[] {
  // parse a string range
  let idArray = [];
  if (input.includes("-")) {
    const [start, end] = input.split("-").map(Number);
    for (let i = start; i <= end; i++) {
      idArray.push(String(i));
    }
  } else {
    idArray.push(input);
  }

  return idArray.filter(isInvalidId);
}

export function sumInvalidIds(input: string): number {
  // parse input data (a single line of text seperated by commas)
  const ranges: string[] = input.split(",");
  let invalidIds: string[] = [];
  ranges.forEach((range: string) => {
    const foundInvalidIds: string[] = findInvalidIds(range);
    invalidIds.push(...foundInvalidIds);
  });
  const invalidIdNumbers = invalidIds.map(Number);
  const sum = invalidIdNumbers.reduce((x, y) => x + y, 0);
  return sum;
}

// ============================================================================
// Part 2 Functions
// ============================================================================

/**
 * Part 2: Check if an ID is made of a sequence repeated at least twice.
 * Examples: 1111111 (1 x7), 123123123 (123 x3), 1212121212 (12 x5)
 */
export function isInvalidIdPart2(id: string): boolean {
  return false;
}

export function findInvalidIdsPart2(input: string): string[] {
  return [];
}

export function sumInvalidIdsPart2(input: string): number {
  return 0;
}
