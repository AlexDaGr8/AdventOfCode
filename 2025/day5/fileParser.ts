import * as fs from "fs";
import * as path from "path";
import { solvePart1, solvePart2 } from "./solution";

const args = process.argv.slice(2);
const part = args[0] || "1";

const dataPath = path.join(__dirname, "data.txt");
const input = fs.readFileSync(dataPath, "utf-8");

if (part === "1") {
  console.log("Part 1:", solvePart1(input));
} else if (part === "2") {
  console.log("Part 2:", solvePart2(input));
} else {
  console.error("Invalid part. Use 1 or 2.");
  process.exit(1);
}
