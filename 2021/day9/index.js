import { getResult } from '../Util.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day9/input.txt').then(part2);

}
function part1(input) {
  console.log('-----part1-----')
  let data = input
    .split('\n')
    .map(d => d.split('').map(d => +d));
  let lowPointObj = [];
  let lowPoints = Array(data.length).fill()
    .map((_, i) => Array(data[0].length).fill(false));

  for (let row = 0; row < data.length; row++) {
    for (let column = 0; column < data[0].length; column++) {
      isLow(data[row][column], row, column);
    }
  }

  let risk = lowPointObj.reduce((a,c) => a + (c.val + 1), 0);

  function isLow(val, row, column) {
    let north, south, east, west = Infinity;
    try { north = data[row - 1][column]; } catch (e) { north = Infinity; }
    try { south = data[row + 1][column]; } catch (e) { south = Infinity; }
    try { east = data[row][column + 1] ?? Infinity; } catch (e) { east = Infinity; }
    try { west = data[row][column - 1] ?? Infinity; } catch (e) { west = Infinity; }
    
    if (val < north && val < east && val < south && val < west) {
      lowPointObj.push({ val, row, column});
    }
  }

  return { lowPointObj, data};
};

function part2(input) {
  console.log('-----part2-----')
  let { lowPointObj, data } = part1(input);
  console.log(lowPointObj)
  let basins = [];
  for (let lp of lowPointObj) {
    let basin = [lp];
    findBasin(lp.val, lp.row, lp.column, basin);
    basins.push(basin);
  }
  let threeLargest = basins.sort((a,b) => b.length - a.length).slice(0,3);
  console.log('basins', basins)
  console.log('result', threeLargest.map(d => d.length).reduce((a,c) => a * c, 1))

  function findBasin(val, row, column, basin) {
    let north, south, east, west = Infinity;
    try { north = data[row - 1][column]; } catch (e) { north = 0; }
    try { south = data[row + 1][column]; } catch (e) { south = 0; }
    try { east = data[row][column + 1] ?? 0; } catch (e) { east = 0; }
    try { west = data[row][column - 1] ?? 0; } catch (e) { west = 0; }
    
    if (north > val && north !== 9) {
      if (!basin.find(b => b.row === row - 1 && b.column === column)) {
        basin.push({ north, row: row - 1, column });
      }
      findBasin(north, row - 1, column, basin);
    }
    if (south > val && south !== 9) {
      if (!basin.find(b => b.row === row + 1 && b.column === column)) {
        basin.push({ south, row: row + 1, column });
      }
      findBasin(south, row + 1, column, basin);
    }
    if (east > val && east !== 9) {
      if (!basin.find(b => b.row === row && b.column === column + 1)) {
        basin.push({ east, row, column: column + 1 });
      }
      findBasin(east, row, column + 1, basin);
    }
    if (west > val && west !== 9) {
      if (!basin.find(b => b.row === row && b.column === column - 1)) {
        basin.push({ west, row, column: column - 1 });
      }
      findBasin(west, row, column - 1, basin);
    }
  }
};
