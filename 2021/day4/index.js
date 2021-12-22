import { getResult } from '../Util.js';
console.clear();
init();
async function init() {
  let startTime = performance.now();
  let chartArr1 = await getResult('./day4/input.txt').then(part2);
  let endime = performance.now();
  console.log(`the result was found in ${endime - startTime} ms`)
}
function part1(input) {
  console.log('-----part1-----')
  let inputArr = input.split('\n');
  let drawings = inputArr[0].split(',').map(d => +d);
  inputArr.splice(0, 2)
  console.log(drawings)
  let boards = getBoards(inputArr);
  console.log('boards', boards);
  let winner = { board: [], num: -1 };

  for (let num of drawings) {
    boards.forEach(board => {
      board.forEach(row => {
        let found = row.find(rowNum => rowNum.value === num);
        if (found) found.found = true;
      });
    });

    for (let i = 0; i < 5; i++) {
      try {
        boards.forEach(board => {
          board.forEach(row => {
            let rowWin = row.filter(r => r.found).length === 5;

            if (rowWin) throw { board, num };
          });
          for (let col = 0; col < 5; col++) {
            let columnWin = board.map(b => b[col]).filter(c => c.found).length === 5;

            if (columnWin) throw { board, num };
          }
        });
      } catch (e) {
        winner = e;
      }
      if (winner.num > -1) break;
    }
    if (winner.num > -1) break;
  }

  let sumOfUnmarked = winner.board
    .flat()
    .filter(bf => !bf.found)
    .reduce((a,c) => a += c.value, 0)
  console.log('sumOfUnmarked', sumOfUnmarked);
  console.log('result', sumOfUnmarked * winner.num);
};

function part2(input) {
  console.log('-----part2-----')
  let inputArr = input.split('\n');
  let drawings = inputArr[0].split(',').map(d => +d);
  inputArr.splice(0, 2)
  console.log(drawings)
  let boards = getBoards2(inputArr);
  console.log('boards', boards);
  let winner = { board: [], num: -1 };

  for (let num of drawings) {
    console.log('boards.length', boards.length);
    boards.forEach(board => {
      board.board.forEach(row => {
        let found = row.find(rowNum => rowNum.value === num);
        if (found) found.found = true;
      });
    });

    for (let i = 0; i < 5; i++) {
      try {
        boards.forEach((board, id) => {
          // rows
          board.board.forEach(row => {
            let rowWin = row.filter(r => r.found).length === 5;

            if (rowWin) {
              board.won = true;
              if (boards.filter(winners => winners.won).length === boards.length) {
                throw { board, num };
              } else {
                boards.splice(id, 1);
              }
            }
          });

          // columns
          for (let col = 0; col < 5; col++) {
            let columnWin = board.board.map(b => b[col]).filter(c => c.found).length === 5;

            if (columnWin) {
              board.won = true;
              if (boards.filter(winners => winners.won).length === boards.length) {
                throw { board, num };
              } else {
                boards.splice(id, 1);
              }
            }
          }
        });
      } catch (e) {
        console.log('e', e)
        winner = e;
      }
      if (winner.num > -1) break;
    }
    if (winner.num > -1) break;
  }

  let sumOfUnmarked = winner.board.board
    .flat()
    .filter(bf => !bf.found)
    .reduce((a,c) => a += c.value, 0)
  console.log('sumOfUnmarked', sumOfUnmarked);
  console.log('result', sumOfUnmarked * winner.num);
};

function getBoards(arr) {
  let boards = [[]];
  let boardNumber = 0;

  arr.forEach(item => {
    let row = item.split(' ')
      .filter(d => d !== '')
      .map(d => ({ found: false, value: +d }));
    if (row.length === 0) {
      boardNumber++;
      boards.push([])
    } else {
      boards[boardNumber].push(row)
    }
  });

  return boards;
}
function getBoards2(arr) {
  let boards = [{ won: false, board: [] }];
  let boardNumber = 0;

  arr.forEach(item => {
    let row = item.split(' ')
      .filter(d => d !== '')
      .map(d => ({ found: false, value: +d }));
    if (row.length === 0) {
      boardNumber++;
      boards.push({ won: false, board: [] })
    } else {
      boards[boardNumber].board.push(row)
    }
  });

  return boards;
}

