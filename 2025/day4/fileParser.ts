import * as fs from "fs";
import * as path from "path";
import { part1, part2 } from "./solution";

const args = process.argv.slice(2);
const part = args[0] || "1";

const dataPath = path.join(__dirname, "data.txt");
const rawData = fs.readFileSync(dataPath, "utf-8");
const input = rawData.trim().split("\n");

if (part === "1") {
  console.log("Part 1:", part1(input));
} else if (part === "2") {
  console.log("Part 2:", part2(input));
} else {
  console.error("Invalid part. Use 1 or 2.");
}
