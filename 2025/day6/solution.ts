import { Interface } from "readline";

/**
 * Advent of Code 2025 - Day 6: Trash Compactor
 *
 * Problem:
 * Parse a math worksheet where problems are arranged vertically in columns.
 * Each column contains numbers stacked vertically, with an operator (+, *) at the bottom.
 * Columns are separated by full columns of spaces.
 *
 * Part 1:
 * - Parse each column to extract numbers and the operator
 * - Evaluate each problem (either add or multiply all numbers in the column)
 * - Return the grand total of all problem answers summed together
 *
 * Example Input:
 * 123 328 51 64
 * 45 64 387 23
 * 6 98 215 314
 *
 * - - - -
 *
 * Example Output:
 * Problem 1: 123 * 45 * 6 = 33210
 * Problem 2: 328 + 64 + 98 = 490
 * Problem 3: 51 * 387 * 215 = 4243455
 * Problem 4: 64 + 23 + 314 = 401
 *
 * Grand Total: 33210 + 490 + 4243455 + 401 = 4277556
 */
export interface workSheet {
  firstNumber: number[];
  secondNumber: number[];
  thirdNumber: number[];
  fourthNumber: number[];
  sign: string[];
}

export function parseInput(input: string): workSheet {
  const inputArrays = input.split("\n");
  const first: number[] = inputArrays[0]
    .split(" ")
    .filter((x) => x !== "")
    .map((numberString) => {
      return Number(numberString);
    });

  const second: number[] = inputArrays[1]
    .split(" ")
    .filter((x) => x !== "")
    .map((numberString) => {
      return Number(numberString);
    });
  const third: number[] = inputArrays[2]
    .split(" ")
    .filter((x) => x !== "")
    .map((numberString) => {
      return Number(numberString);
    });
  const sign: string[] = inputArrays[4].split(" ").filter((x) => x !== "");
  const fourth: number[] = inputArrays[3]
    .split(" ")
    .filter((x) => x !== "")
    .map((numberString) => {
      return Number(numberString);
    });
  return {
    firstNumber: first,
    secondNumber: second,
    thirdNumber: third,
    fourthNumber: fourth,
    sign,
  };
}

export function solvePart1(input: string): number {
  const parsedInput: workSheet = parseInput(input);
  let total = 0;
  for (let i = 0; i < parsedInput.sign.length; i++) {
    const sign = parsedInput.sign[i];
    if (sign === "+") {
      total +=
        parsedInput.firstNumber[i] +
        parsedInput.secondNumber[i] +
        parsedInput.thirdNumber[i] +
        parsedInput.fourthNumber[i];
    } else {
      total +=
        parsedInput.firstNumber[i] *
        parsedInput.secondNumber[i] *
        parsedInput.thirdNumber[i] *
        parsedInput.fourthNumber[i];
    }
  }

  return total;
}
