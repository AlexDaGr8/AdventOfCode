import * as fs from "fs";
import * as path from "path";
import { solvePart1, solvePart2 } from "./solution";

const args = process.argv.slice(2);
const part = args[0] || "1";

const dataPath = path.join(__dirname, "data.txt");
const input = fs.readFileSync(dataPath, "utf-8");

if (part === "1") {
  const result = solvePart1(input);
  console.log(`Part 1 Result: ${result}`);
} else if (part === "2") {
  const result = solvePart2(input);
  console.log(`Part 2 Result: ${result}`);
} else {
  console.log("Usage: npx ts-node fileParser.ts [1|2]");
}
