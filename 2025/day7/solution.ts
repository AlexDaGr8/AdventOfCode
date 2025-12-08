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
 * Part 2: Quantum Tachyon Manifold (Many-Worlds Interpretation)
 * The manifold is actually a quantum tachyon manifold where only a single
 * tachyon particle is sent through. The particle takes BOTH the left and right
 * path at each splitter encountered, causing time itself to split into multiple
 * timelines.
 *
 * Goal (Part 2):
 * Determine the total number of timelines active after a single particle
 * completes all possible journeys through the manifold.
 *
 * Example Output (Part 2):
 * Using the same example input, the particle ends up on 40 different timelines.
 */

export interface TachyonManifoldDiagram {
  /** The raw input text for the manifold diagram. */
  parsed: string[][];
}

class DiagramSpot {
  below: string;
  bottomRight: string;
  bottomLeft: string;
  timeLineCount: number = 0;
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
      if (input.parsed[i][j] === "S") {
        lookupMap[coordsAsString].timeLineCount = 1;
      }
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
 * Solve Part 2 of the puzzle: Quantum Tachyon Manifold
 *
 * Count the number of distinct timelines that result from a single particle
 * traversing the manifold, where each splitter causes time to branch into
 * two timelines (one for left path, one for right path).
 *
 * This function is intentionally left unimplemented.
 */
export function solvePart2(input: string): number {
  /**
   * follow a similar parsing and approach to part 1.
   * instead of tracking splits, we need to track the number of timelines that
   * resulted in reaching that endpoint
   * Use numbers to denote the number of timelines that have reached an endpoint.
   * each time the bottomSpot is a ^,
   * incretment the spots to the right left of it by the current value + 1
   *
   */
  const tachyonDiagram: TachyonManifoldDiagram = parseInput(input);
  const lookupMap = createLookup(tachyonDiagram);
  let timeLineCount = 0;
  for (let i = 0; i < tachyonDiagram.parsed.length; i++) {
    for (let j = 0; j < tachyonDiagram.parsed[0].length; j++) {
      const stringCoords = String(i) + "-" + String(j);
      const diagramSpot = lookupMap[stringCoords];
      if (i === tachyonDiagram.parsed.length - 1) {
        timeLineCount += diagramSpot.timeLineCount;
      }
      const bottomValue: string | undefined =
        lookupMap[diagramSpot.below]?.value;
      const bottomRightValue: string | undefined =
        lookupMap[diagramSpot.bottomRight]?.value;
      const bottomLeftValue: string | undefined =
        lookupMap[diagramSpot.bottomLeft]?.value;
      if (!bottomValue) {
        continue;
      }

      // if the current value is either | or S, then the bottom spot needs to be a |
      if (diagramSpot.value === "|" || diagramSpot.value === "S") {
        // if the spot below is ^ then we need a | to the right and left of the spot below
        if (bottomValue === "^") {
          //if the bottom left spot is ^ then leave it as-is, otherwise replace with |
          if (lookupMap[diagramSpot.bottomLeft]) {
            lookupMap[diagramSpot.bottomLeft].value =
              bottomLeftValue !== "^" ? "|" : "^";
            lookupMap[diagramSpot.bottomLeft].timeLineCount +=
              diagramSpot.timeLineCount;
          }
          if (lookupMap[diagramSpot.bottomRight]) {
            //if the bottom right spot is ^ then leave it as-is, otherwise replace with |
            lookupMap[diagramSpot.bottomRight].value =
              bottomRightValue !== "^" ? "|" : "^";
            lookupMap[diagramSpot.bottomRight].timeLineCount +=
              diagramSpot.timeLineCount;
          }
        } else {
          lookupMap[diagramSpot.below].value = "|";
          lookupMap[diagramSpot.below].timeLineCount +=
            diagramSpot.timeLineCount;
        }
      }
    }
  }

  return timeLineCount;
}
