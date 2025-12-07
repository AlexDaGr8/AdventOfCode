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
 * * + * +
 *
 * Example Output:
 * Problem 1: 123 * 45 * 6 = 33210
 * Problem 2: 328 + 64 + 98 = 490
 * Problem 3: 51 * 387 * 215 = 4243455
 * Problem 4: 64 + 23 + 314 = 401
 *
 * Grand Total: 33210 + 490 + 4243455 + 401 = 4277556
 *
 * Part 2:
 * - Cephalopod math is written right-to-left in columns
 * - Each number is given in its own column, with most significant digit at top,
 *   least significant digit at bottom
 * - Read problems right-to-left, one column at a time
 * - The operator is still at the bottom of each problem section
 *
 * Example Input (same as Part 1):
 * 123 328 51 64
 * 45 64 387 23
 * 6 98 215 314
 * *   +   *   +
 *
 * Example Output (reading right-to-left, column by column):
 * Rightmost problem: 4 + 431 + 623 = 1058
 * Second from right: 175 * 581 * 32 = 3253600
 * Third from right: 8 + 248 + 369 = 625
 * Leftmost problem: 356 * 24 * 1 = 8544
 *
 * Grand Total: 1058 + 3253600 + 625 + 8544 = 3263827
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

interface stringWorkSheet {
  firstNumber: string[];
  secondNumber: string[];
  thirdNumber: string[];
  fourthNumber: string[];
  sign: string[];
}
export function parseInput2(input: string): stringWorkSheet {
  // loop through the length of a split array (any should do)
  // if every array's value is ' ', then add an x to the build array
  const inputArrays = input.split("\n");
  let first: string = "";
  let second: string = "";
  let third: string = "";
  let fourth: string = "";

  for (let i = 0; i < inputArrays[0].length; i++) {
    const firstItem = inputArrays[0][i];
    const secondItem = inputArrays[1][i];
    const thirdItem = inputArrays[2][i];
    const fourthItem = inputArrays[3][i];
    if (
      firstItem === " " &&
      secondItem === " " &&
      thirdItem === " " &&
      fourthItem === " "
    ) {
      first += "x";
      second += "x";
      third += "x";
      fourth += "x";
    } else {
      first += firstItem;
      second += secondItem;
      third += thirdItem;
      fourth += fourthItem;
    }
  }
  const firstNumber = first.split("x");
  const secondNumber = second.split("x");
  const thirdNumber = third.split("x");
  const fourthNumber = fourth.split("x");

  return {
    firstNumber: firstNumber,
    secondNumber: secondNumber,
    thirdNumber: thirdNumber,
    fourthNumber: fourthNumber,
    sign: inputArrays[4].split(" ").filter((x) => x !== ""),
  };
}
export function solvePart2(input: string): number {
  const parsedInput: stringWorkSheet = parseInput2(input);
  let total = 0;
  for (let i = 0; i < parsedInput.sign.length; i++) {
    const sign = parsedInput.sign[i];
    let numbersArray = [];
    for (let j = 0; j < parsedInput.firstNumber[i].length; j++) {
      const firstNumber = parsedInput.firstNumber[i][j] ?? "";
      const secondNumber = parsedInput.secondNumber[i][j] ?? "";
      const thirdNumber = parsedInput.thirdNumber[i][j] ?? "";
      const fourthNumber = parsedInput.fourthNumber[i][j] ?? "";
      numbersArray.push(
        firstNumber + secondNumber + thirdNumber + fourthNumber
      );
    }
    if (sign === "+") {
      total += numbersArray
        .map((i) => Number(i))
        .reduce((acc, curr) => acc + curr, 0);
    } else {
      total += numbersArray
        .map((i) => Number(i))
        .reduce((acc, curr) => acc * curr, 1);
    }
  }
  return total;
}
