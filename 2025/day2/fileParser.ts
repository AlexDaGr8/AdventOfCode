import * as fs from "fs";
import * as path from "path";
import { sumInvalidIds, sumInvalidIdsPart2 } from "./solution";

const dataPath = path.join(__dirname, "data.txt");

async function run() {
  const content = fs.readFileSync(dataPath, "utf-8");
  const result = sumInvalidIds(content);
  const result2 = sumInvalidIdsPart2(content);
  console.log("Day 2 Result:", result);
  console.log("Day 2 Result Part 2:", result2);
}

run().catch(console.error);
