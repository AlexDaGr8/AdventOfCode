import * as fs from "fs";
import * as path from "path";
import { solve } from "./solution";

const dataPath = path.join(__dirname, "data.txt");

async function run() {
  const content = fs.readFileSync(dataPath, "utf-8");
  const result = solve(content);
  console.log("Day 1 Result:", result);
}

run().catch(console.error);
