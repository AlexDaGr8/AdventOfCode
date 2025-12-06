/**
 * Day 5: Cafeteria
 *
 * The database consists of:
 * 1. A list of fresh ingredient ID ranges (inclusive)
 * 2. A blank line
 * 3. A list of available ingredient IDs
 *
 * Ranges can overlap. An ingredient ID is fresh if it falls within ANY range.
 *
 * --- Part 1 ---
 * Count how many of the available ingredient IDs are fresh.
 *
 * Example Input:
 *   Ranges: [[3,5], [10,14], [16,20], [12,18]]
 *   Available IDs: [1, 5, 8, 11, 17, 32]
 *
 * Example Output:
 *   3 (IDs 5, 11, and 17 are fresh)
 *
 * Explanation:
 *   - ID 1: spoiled (not in any range)
 *   - ID 5: fresh (in range 3-5)
 *   - ID 8: spoiled (not in any range)
 *   - ID 11: fresh (in range 10-14)
 *   - ID 17: fresh (in ranges 16-20 and 12-18)
 *   - ID 32: spoiled (not in any range)
 *
 * --- Part 2 ---
 * Count the total number of unique ingredient IDs that are considered fresh
 * by the fresh ingredient ID ranges. The available IDs list is irrelevant.
 *
 * Example Input:
 *   Ranges: [[3,5], [10,14], [16,20], [12,18]]
 *
 * Example Output:
 *   14 (IDs 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 are fresh)
 *
 * Explanation:
 *   - Range 3-5: covers 3, 4, 5
 *   - Range 10-14: covers 10, 11, 12, 13, 14
 *   - Range 16-20: covers 16, 17, 18, 19, 20
 *   - Range 12-18: covers 12, 13, 14, 15, 16, 17, 18 (overlaps with above)
 *   - Union of all ranges: 14 unique IDs
 */

export type Range = number[];

export interface ParsedInput {
  ranges: Range[];
  availableIds: number[];
}

/**
 * Parses the raw input string into ranges and available IDs
 */
export function parseInput(input: string): ParsedInput {
  const inputAndIds = input.split("\n\n");
  let ranges: Range[] = [];
  inputAndIds[0].split("\n").forEach((rangeString) => {
    const [start, end] = rangeString.split("-");
    ranges.push([Number(start), Number(end)]);
  });
  let availableIds: number[] = [];
  inputAndIds[1].split("\n").forEach((idString) => {
    availableIds.push(parseInt(idString));
  });
  return { ranges: ranges, availableIds: availableIds };
}

/**
 * Determines if an ingredient ID is fresh (falls within any range)
 */
// export function isFresh(id: number, ranges: Range[]): boolean {

// }

/**
 * Counts how many of the available ingredient IDs are fresh
 */
export function countFreshIngredients(input: ParsedInput): number {
  let ingredientCount = 0;
  const ranges: Range[] = input.ranges;
  const ingredients: number[] = input.availableIds;

  ingredients.forEach((ingredient) => {
    for (const range of ranges) {
      if (ingredient >= range[0] && ingredient <= range[1]) {
        ingredientCount++;
        break;
      }
    }
  });

  return ingredientCount;
}

/**
 * Main solution function for Part 1
 */
export function solvePart1(input: string): number {
  const parsed = parseInput(input);
  return countFreshIngredients(parsed);
}

/**
 * Counts the total number of unique ingredient IDs covered by all ranges
 */
export function countUniqueFreshIds(ranges: Range[]): number {
  let totalIds = 0;
  for (const range of ranges) {
    totalIds += range[1] - range[0] + 1;
  }
  return totalIds;
}

export function combineIntervals(ranges: Range[]): Range[] {
  /**
   * Sort ranges by order of smallest range-start (range[0])
   * Initialize currentRange as the first item in the range list
   * Iterate over the range list, and for each iteration:
   *    If start of range is <= end of currentRange:
   *      If end of range is greater than/equal to end of currentRange:
   *        currentRange stays the same, and go to next iteration
   *      else:
   *        currentRange = [ currentRange[start], range[end] ]
   *    else:
   *      combinedRanges.push(currentRange), currentRange = range
   * at the end of iterations, push currentRange to combinedRanges
   * Return combinedRanges
   */
  const sortedRanges = ranges.sort((a: Range, b: Range) => {
    return a[0] - b[0];
  });
  let combinedRanges: Range[] = [];
  let currentRange = sortedRanges[0];
  for (const range of sortedRanges) {
    if (range[0] <= currentRange[1]) {
      if (range[1] <= currentRange[1]) {
        currentRange = currentRange;
      } else {
        currentRange = [currentRange[0], range[1]];
      }
    } else {
      combinedRanges.push(currentRange);
      currentRange = range;
    }
  }
  combinedRanges.push(currentRange);
  return combinedRanges;
}

/**
 * Main solution function for Part 2
 */
export function solvePart2(input: string): number {
  const parsed = parseInput(input);
  const combinedRanges = combineIntervals(parsed.ranges);

  return countUniqueFreshIds(combinedRanges);
}
