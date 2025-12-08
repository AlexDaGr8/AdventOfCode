/**
 * Advent of Code 2025 - Day 7: Laboratories
 *
 * Problem overview:
 * A tachyon beam enters a manifold diagram at the location marked `S` and always
 * moves downward. Empty space is represented by `.`, and splitters are
 * represented by `^`. When a tachyon beam reaches a splitter, the current beam
 * stops and two new beams continue from the immediate left and immediate right
 * positions of the splitter.
 *
 * Goal (Part 1):
 * Given a diagram of the tachyon manifold, determine how many times the beam is
 * split before all beams either reach another splitter or exit the manifold.
 *
 * Example Input:
 *  .......S.......
 *  ...............
 *  .......^.......
 *  ...............
 *  ......^.^......
 *  ...............
 *  .....^.^.^.....
 *  ...............
 *  ....^.^...^....
 *  ...............
 *  ...^.^...^.^...
 *  ...............
 *  ..^...^.....^..
 *  ...............
 *  .^.^.^.^.^...^.
 *  ...............
 *
 * Example Output:
 *  In this example, the beam is split a total of 21 times.
 *
 * Part 2:
 * The exact rules for Part 2 will be added once the second description for this
 * day is available.
 */

export interface TachyonManifoldDiagram {
  /** The raw input text for the manifold diagram. */
  parsed: string[][];
}

class DiagramSpot {
  below: string;
  bottomRight: string;
  bottomLeft: string;
  constructor(public value: string, x: number, y: number) {
    this.below = String(x + 1) + "-" + y;
    this.bottomLeft = String(x + 1) + "-" + String(y - 1);
    this.bottomRight = String(x + 1) + "-" + String(y + 1);
  }
}

/**
 * Parse the raw input into a structured representation of the tachyon manifold
 * diagram. This function is intentionally left unimplemented.
 */
export function parseInput(input: string): TachyonManifoldDiagram {
  const rows = input.split("\n");
  let tachyyonDiagram = [];
  for (const row of rows) {
    let rowArray = [];
    for (const value of row) {
      rowArray.push(value);
    }
    tachyyonDiagram.push(rowArray);
  }
  return { parsed: tachyyonDiagram };
}

export function createLookup(input: TachyonManifoldDiagram) {
  // creates a lookup object where the keys are string coordinates like '12', and the values are DiagramSpot instances
  let lookupMap: Record<string, DiagramSpot> = {};

  for (let i = 0; i < input.parsed.length; i++) {
    for (let j = 0; j < input.parsed[0].length; j++) {
      const coordsAsString = String(i) + "-" + String(j);
      lookupMap[coordsAsString] = new DiagramSpot(input.parsed[i][j], i, j);
    }
  }

  return lookupMap;
}

/**
 * Solve Part 1 of the puzzle.
 * This function is intentionally left unimplemented.
 */
export function solvePart1(input: string): number {
  const tachyonDiagram: TachyonManifoldDiagram = parseInput(input);
  const lookupMap = createLookup(tachyonDiagram);
  let totalSplits = 0;
  for (let i = 0; i < tachyonDiagram.parsed.length; i++) {
    for (let j = 0; j < tachyonDiagram.parsed[0].length; j++) {
      const stringCoords = String(i) + "-" + String(j);

      const diagramSpot = lookupMap[stringCoords];
      const spotBelow: string | undefined = lookupMap[diagramSpot.below]?.value;
      const spotBottomRight: string | undefined =
        lookupMap[diagramSpot.bottomRight]?.value;
      const spotBottomLeft: string | undefined =
        lookupMap[diagramSpot.bottomLeft]?.value;
      if (!spotBelow || !spotBottomRight || !spotBottomLeft) {
        continue;
      }

      // if the current value is either | or S, then the bottom spot needs to be a |
      if (diagramSpot.value === "|" || diagramSpot.value === "S") {
        // if the spot below is ^ then we need a | to the right and left of the spot below
        if (spotBelow === "^") {
          //if the bottom left spot is ^ then leave it as-is, otherwise replace with |
          lookupMap[diagramSpot.bottomLeft].value =
            spotBottomLeft !== "^" ? "|" : "^";
          //if the bottom right spot is ^ then leave it as-is, otherwise replace with |
          lookupMap[diagramSpot.bottomRight].value =
            spotBottomRight !== "^" ? "|" : "^";
          totalSplits++;
        } else if (lookupMap[diagramSpot.below] !== undefined) {
          lookupMap[diagramSpot.below].value = "|";
        }
      }
    }
  }
  return totalSplits;
}

/**
 * Solve Part 2 of the puzzle.
 * This function is intentionally left unimplemented.
 */
export function solvePart2(input: string): number {
  throw new Error("Not implemented.");
}
