/**
 * Day 3: Lobby
 *
 * PART 1:
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
 *
 * PART 2:
 * Now you need to turn on exactly twelve batteries within each bank.
 * The joltage output is the number formed by the 12 digits of the batteries you turn on.
 * Batteries cannot be rearranged - they must stay in their original positions.
 *
 * Example Input:
 * 987654321111111
 * 811111111111119
 * 234234234234278
 * 818181911112111
 *
 * Example Output:
 * - 987654321111111 -> 987654321111 (turn off some 1s at the end)
 * - 811111111111119 -> 811111111119 (turn off some 1s)
 * - 234234234234278 -> 434234234278 (turn off a 2, 3, and 2 near the start)
 * - 818181911112111 -> 888911112111 (turn off some 1s near the front)
 * Total: 987654321111 + 811111111119 + 434234234278 + 888911112111 = 3121910778619
 */

/**
 * Finds the maximum joltage that can be produced from a single bank of batteries
 * by selecting exactly two batteries (digits) that form the largest 2-digit number.
 * The batteries cannot be rearranged.
 * @param bank - A string of digits representing a bank of batteries
 * @returns The maximum joltage (2-digit number) that can be produced
 */
export function findMaxJoltage(bank: string): number {
  /**
   *   give the tens digit the first number, ones digit the second number
   *   start iterating at the second number:
   *   if current digit is greater than tens, replace tens digit, make sure that there is at least one number left for the ones digit,
   *   and use that digit for the new one
   *   if its greater than ones, replace ones, just replace that digit
   */
  const bankNumbers = Number(bank);
  let tens = Number(bank[0]);
  let ones = Number(bank[1]);
  if (tens === undefined || ones === undefined) {
    return bankNumbers;
  }
  const idxMap: Record<number, number> = {};
  bank.split("").forEach((number, idx) => {
    idxMap[idx] = Number(number);
  });

  for (let i = 2; i <= bank.length - 1; i++) {
    if (idxMap[i] > tens && bank.length - i >= 2) {
      tens = idxMap[i];
      ones = 0;
    } else if (idxMap[i] > ones) {
      ones = idxMap[i];
    }
  }

  return Number(String(tens) + String(ones));
}

/**
 * Calculates the total output joltage by summing the maximum joltage from each bank.
 * @param banks - Array of battery bank strings
 * @returns The total output joltage
 */
export function calculateTotalJoltage(banks: string[]): number {
  let total = 0;
  banks.forEach((bank) => {
    total += findMaxJoltage(bank);
  });
  return total;
}

/**
 * PART 2 FUNCTIONS
 */

/**
 * Finds the maximum joltage that can be produced from a single bank of batteries
 * by selecting exactly twelve batteries (digits) that form the largest 12-digit number.
 * The batteries cannot be rearranged - they must stay in their original positions.
 * @param bank - A string of digits representing a bank of batteries
 * @returns The maximum joltage (12-digit number) that can be produced
 */
export function findMaxJoltage12(bank: string): number {
  /**
   * start by finding the largest number such that there are 12 numbers to the right
   * that number becomes the starting number since we cant make the string any smaller
   * than 12 numbers.
   *
   * iterate over the remaining numbers 'to the left' of that starting number and
   * see if there is a larger number.
   * find the largest number of those to the left of the starting number, and add that
   * to the 'builtNumber'
   *
   * decrement the remaining numbers from 12 to 11 and do the same thing, untill
   * the remaining numbers are 0
   */
  let remainingNumbers = 12;
  const idxMap: Record<number, number> = {};
  for (let i = -1; i >= -bank.length; i--) {
    idxMap[i] = Number(bank.at(i));
  }
  let builtNumber = "";
  while (remainingNumbers > 0) {
    let currMax = idxMap[-remainingNumbers];
    let maxIdx = -remainingNumbers;
    for (let i = -remainingNumbers; i >= -bank.length; i--) {
      const stringAsNumber = idxMap[i];
      if (stringAsNumber >= currMax) {
        currMax = stringAsNumber;
        maxIdx = i;
      }
    }
    bank = bank.slice(maxIdx + 1);
    builtNumber += String(currMax);
    remainingNumbers--;
  }

  return Number(builtNumber);
}

/**
 * Calculates the total output joltage by summing the maximum 12-digit joltage from each bank.
 * @param banks - Array of battery bank strings
 * @returns The total output joltage
 */
export function calculateTotalJoltage12(banks: string[]): number {
  let total = 0;
  banks.forEach((bank) => {
    total += findMaxJoltage12(bank);
  });
  return total;
}
