import * as fs from "fs";
import * as path from "path";
import { calculateTotalJoltage, calculateTotalJoltage12 } from "./solution";

/**
 * Parses the input file containing battery banks.
 * Each line represents a bank of batteries as a string of digits (1-9).
 * @param filename - The name of the input file (default: 'data.txt')
 * @returns An array of strings, each representing a battery bank
 */
export function parseInput(filename: string = "data.txt"): string[] {
  const filePath = path.join(__dirname, filename);
  const content = fs.readFileSync(filePath, "utf-8");

  return content
    .trim()
    .split("\n")
    .filter((line) => line.length > 0);
}

const part = process.argv[2];
const banks = parseInput();

if (part === "1") {
  const result = calculateTotalJoltage(banks);
  console.log("Part 1:", result);
} else if (part === "2") {
  const result = calculateTotalJoltage12(banks);
  console.log("Part 2:", result);
} else {
  console.log("Usage: npm run run 2025/day3/fileParser.ts [1|2]");
}
