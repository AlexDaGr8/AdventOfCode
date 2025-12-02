# Advent of Code

Solutions for [Advent of Code](https://adventofcode.com/) challenges in TypeScript.

## 2025 Solutions

The 2025 folder contains TypeScript solutions with Jest tests.

### Project Structure

```
2025/
├── fileParser.ts         # Shared runner for all days
└── day<N>/
    ├── solution.ts       # Main solution logic
    ├── solution.test.ts  # Jest tests
    ├── data.txt          # Puzzle input (create this file)
    └── desc.md           # Problem description
```

### Setup

```bash
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests for a specific day
npm test -- day1
```

### Running Solutions Against Puzzle Input

1. Create a `data.txt` file in the day's folder with your puzzle input
2. Run the shared file parser with the day number:

```bash
# Run day 1
npm run run 2025/fileParser.ts 1

# Run day 2
npm run run 2025/fileParser.ts 2
```

The shared `fileParser.ts` dynamically loads the solution for the specified day, reads its `data.txt`, and prints the result.
