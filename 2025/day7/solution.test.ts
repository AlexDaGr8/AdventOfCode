import { parseInput, solvePart1, createLookup } from "./solution";

const exampleInput = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

describe("parseInput", () => {
  it("should return a 2D array of characters", () => {
    const result = parseInput(exampleInput);
    expect(result.parsed).toBeDefined();
    expect(Array.isArray(result.parsed)).toBe(true);
    expect(Array.isArray(result.parsed[0])).toBe(true);
  });

  it("should parse each row into individual characters", () => {
    const simpleInput = "ABC\nDEF";
    const result = parseInput(simpleInput);
    expect(result.parsed).toEqual([
      ["A", "B", "C"],
      ["D", "E", "F"],
    ]);
  });

  it("should handle a minimal input with just S", () => {
    const minimalInput = "S";
    const result = parseInput(minimalInput);
    expect(result.parsed).toEqual([["S"]]);
  });

  it("should handle input with no splitters", () => {
    const noSplitters = `.S.
...
...`;
    const result = parseInput(noSplitters);
    expect(result.parsed.length).toBe(3);
    expect(result.parsed[0]).toEqual([".", "S", "."]);
  });
});

describe("createLookup", () => {
  it("should create a lookup map with string coordinate keys", () => {
    const input = parseInput("AB\nCD");
    const lookup = createLookup(input);
    expect(lookup).toBeDefined();
    expect(typeof lookup).toBe("object");
  });

  it("should have entries for all positions in the grid", () => {
    const input = parseInput("AB\nCD");
    const lookup = createLookup(input);
    // 2x2 grid = 4 entries
    expect(Object.keys(lookup).length).toBe(4);
  });

  it("should store DiagramSpot instances with correct values", () => {
    const input = parseInput("AB\nCD");
    const lookup = createLookup(input);
    // Check that each spot has a value property
    for (const key of Object.keys(lookup)) {
      expect(lookup[key]).toHaveProperty("value");
    }
  });

  it("should provide getBelow method on DiagramSpot instances", () => {
    const input = parseInput("A\nB");
    const lookup = createLookup(input);
    const firstKey = Object.keys(lookup)[0];
    expect(typeof lookup[firstKey].below).toBe("string");
  });
});

describe("solvePart1", () => {
  it("should return 21 for the example input", () => {
    expect(solvePart1(exampleInput)).toBe(21);
  });

  it("should return 0 when beam exits without hitting any splitter", () => {
    const noSplitInput = `.S.
...
...`;
    expect(solvePart1(noSplitInput)).toBe(0);
  });

  it("should return 1 for a single splitter hit", () => {
    const singleSplit = `.S.
...
.^.`;
    expect(solvePart1(singleSplit)).toBe(1);
  });

  it("should return 3 for two levels of splitting", () => {
    // S hits first splitter (1 split), then both beams hit second row splitters (2 more splits)
    const twoLevelSplit = `..S..
.....
..^..
.....
.^.^.`;
    expect(solvePart1(twoLevelSplit)).toBe(3);
  });
});
