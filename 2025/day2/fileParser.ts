import * as fs from "fs";
import * as path from "path";
import { sumInvalidIds } from "./solution";

const dataPath = path.join(__dirname, "data.txt");

async function run() {
  const content = fs.readFileSync(dataPath, "utf-8");
  const result = sumInvalidIds(content);
  console.log("Day 2 Result:", result);
}

run().catch(console.error);
