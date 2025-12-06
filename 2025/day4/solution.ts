/**
 * --- Day 4: Printing Department ---
 *
 * The rolls of paper (@) are arranged on a large grid. The forklifts can only
 * access a roll of paper if there are fewer than four rolls of paper in the
 * eight adjacent positions.
 *
 * Task: Count how many rolls of paper can be accessed by a forklift.
 *
 * Example Input:
 * ..@@.@@@@.
 * @@@.@.@.@@
 * @@@@@.@.@@
 * @.@@@@..@.
 * @@.@@@@.@@
 * .@@@@@@@.@
 * .@.@.@.@@@
 * @.@@@.@@@@
 * .@@@@@@@@.
 * @.@.@@@.@.
 *
 * Example Output: 13
 *
 * Explanation: A roll (@) is accessible if it has fewer than 4 adjacent rolls
 * (including diagonals). The 13 accessible rolls are marked with 'x' in the
 * problem description.
 */

export function part1(input: string[]): number {
  /**
   * create the 'grid', for each item in the grid, create a map of the position: value
   * for i in rows, for j in columns:
   * check each of the 8 possible neighbors. handle out-of-index values
   * if value of current position is @, then check if neighbor-count of neighbors is less than 4.
   * if both are true, then increment total-count by 1
   */
  let itemsArray: string[] = [];
  let gridMap: Record<string, string> = {};
  let totalCount = 0;
  input.forEach((row, rowIdx) => {
    row.split("").forEach((column, columnIdx) => {
      const positionString = `${rowIdx},${columnIdx}`;
      gridMap[positionString] = column;
      itemsArray.push(positionString);
    });
  });

  itemsArray.forEach((item) => {
    if (gridMap[item] !== "@") return;
    let neighborcCount = 0;
    const [rowIdx, columnIdx] = item.split(",").map(Number);
    const topNeighborIdx = `${rowIdx},${columnIdx + 1}`;
    const bottompNeighborIdx = `${rowIdx},${columnIdx - 1}`;
    const topRightNeighborIdx = `${rowIdx + 1},${columnIdx + 1}`;
    const rightNeighborIdx = `${rowIdx + 1},${columnIdx}`;
    const bottomRightNeighborIdx = `${rowIdx + 1},${columnIdx - 1}`;
    const bottomLeftNeighborIdx = `${rowIdx - 1},${columnIdx - 1}`;
    const leftNeighborIdx = `${rowIdx - 1},${columnIdx}`;
    const topLeftNeighborIdx = `${rowIdx - 1},${columnIdx + 1}`;
    const neighborArray = [
      topNeighborIdx,
      topRightNeighborIdx,
      rightNeighborIdx,
      bottomRightNeighborIdx,
      bottompNeighborIdx,
      bottomLeftNeighborIdx,
      topLeftNeighborIdx,
      leftNeighborIdx,
    ];
    neighborArray.forEach((neighborIdx) => {
      let idxValue = gridMap[neighborIdx];
      if (idxValue === "@") {
        neighborcCount += 1;
      }
    });
    if (neighborcCount < 4) {
      totalCount++;
    }
  });
  return totalCount;
}

export function part2(input: string[]): number {
  let itemsArray: string[] = [];
  let gridMap: Record<string, string> = {};
  let totalCount = 0;
  input.forEach((row, rowIdx) => {
    row.split("").forEach((column, columnIdx) => {
      const positionString = `${rowIdx},${columnIdx}`;
      gridMap[positionString] = column;
      itemsArray.push(positionString);
    });
  });
  let changed = true;
  while (changed) {
    changed = false;
    itemsArray.forEach((item) => {
      if (gridMap[item] !== "@") return;
      let neighborcCount = 0;
      const [rowIdx, columnIdx] = item.split(",").map(Number);
      const topNeighborIdx = `${rowIdx},${columnIdx + 1}`;
      const bottompNeighborIdx = `${rowIdx},${columnIdx - 1}`;
      const topRightNeighborIdx = `${rowIdx + 1},${columnIdx + 1}`;
      const rightNeighborIdx = `${rowIdx + 1},${columnIdx}`;
      const bottomRightNeighborIdx = `${rowIdx + 1},${columnIdx - 1}`;
      const bottomLeftNeighborIdx = `${rowIdx - 1},${columnIdx - 1}`;
      const leftNeighborIdx = `${rowIdx - 1},${columnIdx}`;
      const topLeftNeighborIdx = `${rowIdx - 1},${columnIdx + 1}`;
      const neighborArray = [
        topNeighborIdx,
        topRightNeighborIdx,
        rightNeighborIdx,
        bottomRightNeighborIdx,
        bottompNeighborIdx,
        bottomLeftNeighborIdx,
        topLeftNeighborIdx,
        leftNeighborIdx,
      ];
      neighborArray.forEach((neighborIdx) => {
        let idxValue = gridMap[neighborIdx];
        if (idxValue === "@") {
          neighborcCount += 1;
        }
      });
      if (neighborcCount < 4) {
        gridMap[item] = ".";
        totalCount++;
        changed = true;
      }
    });
  }
  return totalCount;
}
