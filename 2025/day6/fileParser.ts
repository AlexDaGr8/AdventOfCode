import * as fs from "fs";
import * as path from "path";
import { solvePart1 } from "./solution";

const args = process.argv.slice(2);
const part = args[0] || "1";

const dataPath = path.join(__dirname, "data.txt");
const input = fs.readFileSync(dataPath, "utf-8");

if (part === "1") {
  const result = solvePart1(input);
  console.log(`Part 1 Result: ${result}`);
} else if (part === "2") {
  // TODO: Add part 2 when available
  console.log("Part 2 not yet implemented");
} else {
  console.log("Usage: npx ts-node fileParser.ts [1|2]");
}
