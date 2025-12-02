import * as fs from "fs";
import * as path from "path";

const dayArg = process.argv[2];

if (!dayArg) {
  console.error("Usage: npm run run 2025/fileParser.ts <day-number>");
  console.error("Example: npm run run 2025/fileParser.ts 1");
  process.exit(1);
}

const dayFolder = `day${dayArg}`;
const dataPath = path.join(__dirname, dayFolder, "data.txt");
const solutionPath = `./${dayFolder}/solution`;

async function run() {
  const { solve } = await import(solutionPath);
  const content = fs.readFileSync(dataPath, "utf-8");
  const result = solve(content);
  console.log(`Day ${dayArg} Result:`, result);
}

run().catch(console.error);
