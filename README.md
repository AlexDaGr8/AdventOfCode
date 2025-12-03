# Advent of Code

Solutions for [Advent of Code](https://adventofcode.com/) challenges in TypeScript.

## 2025 Solutions

The 2025 folder contains TypeScript solutions with Jest tests.

### Project Structure

```
2025/
└── day<N>/
    ├── fileParser.ts     # Day-specific runner
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
2. Run the day-specific file parser:

```bash
# Run day 1
npm run run 2025/day1/fileParser.ts

# Run day 2
npm run run 2025/day2/fileParser.ts
```

Each day has its own `fileParser.ts` that handles day-specific input parsing and calls the appropriate solution function.
