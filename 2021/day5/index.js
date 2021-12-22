import { getResult } from '../Util.js';
console.clear();
var startTime = performance.now()
init();
async function init() {
  let chartArr1 = await getResult('./day4/input.txt').then(part2);
}
function part1(input) {
  console.log('-----part1-----')
  let inputArr = input.split('\n');
};

function part2(input) {
  console.log('-----part2-----')
  let inputArr = input.split('\n');
};
