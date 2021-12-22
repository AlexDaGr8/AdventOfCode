import { getResult } from '../Util.js';
console.clear();
init();
async function init() {
  let chartArr1 = await getResult('./day3/input.txt').then(part2);

}
function part1(input) {
  console.log("input".split(''))
  let inputArr = input.match(/\w+/gm).map(d => d.split(''));
  let half = inputArr.length / 2;
  let gamma = Array(inputArr[0].length)
  let epsilon = Array(inputArr[0].length)
  for (let i = 0; i < inputArr[0].length; i++) {
    let ones = inputArr.reduce((a,c) => {
      a += +c[i]
      return a;
    }, 0);
    if (ones > half) {
      gamma[i] = 1;
      epsilon[i] = 0;
    } else {
      gamma[i] = 0;
      epsilon[i] = 1;
    }
    console.log('ones', ones)
  }
  console.log('gamma', parseInt(gamma.join(''),2))
  console.log('epsilon', parseInt(epsilon.join(''),2))

  let result = parseInt(gamma.join(''),2) * parseInt(epsilon.join(''),2);

  console.log('result', result)
};

function part2(input) {
  console.log('-----part2-----')
  let inputArr = input.match(/\w+/gm).map(d => d.split(''));
  console.log(inputArr.slice())
  let bitCount = inputArr[0].length;
  let oxygen = inputArr.slice();
  let c02 = inputArr.slice();
  for (let i = 0; i < bitCount; i++) {
    oxygen = getReduction(oxygen, i, [1,0]);
    c02 = getReduction(c02, i, [0,1]);
  }

  console.log('oxygen', oxygen);
  console.log('c02', c02);

  let result = parseInt(oxygen[0].join(''), 2) * parseInt(c02[0].join(''), 2);

  console.log('result', result)

  function getReduction(arr, ind, captureDig) {
    if (arr.length === 1) return arr;
    let ones = arr.reduce((a,c) => {
      a += +c[ind]
      return a;
    }, 0);
    let tempArr = arr.slice();
    if (ones > tempArr.length/2) {
      arr = tempArr.filter(d => +d[ind] === captureDig[0]);
    } else if (ones === tempArr.length/2) {
      arr = tempArr.filter(d => +d[ind] === captureDig[0]);
    } else {
      arr = tempArr.filter(d => +d[ind] === captureDig[1]);
    }

    return arr;
  }
};


