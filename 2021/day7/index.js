import { getResult } from '../Util.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day7/input.txt').then(part2);

}
function part1(input) {
  console.log('-----part1-----')
  let data = input.split(',').map(d => +d);

  console.log('data', data)

  let sort = data.sort((a,b) => a - b);
  let median = data[data.length / 2];
  let fuel = Array(data.length).fill()
    .map((_, i) => Math.abs(data[i] - median))
    .reduce((a,c) => a + c, 0);

  console.log(sort)
  console.log(median)
  console.log(fuel)
};

function part2(input) {
  console.log('-----part2-----')
  let data = input.split(',').map(d => +d);
  const sums = (n) => (n * (n + 1)) / 2;
  const fuelCost = (arr, value) => Array(arr.length).fill()
    .map((_, i) => Math.abs(arr[i] - value))
    .reduce((a,c) => a + sums(c), 0);
  let mean = data.reduce((a,c) => a + c, 0) / data.length;
  let fuel = fuelCost(data, Math.floor(mean));

  console.log('result', fuel)
};
