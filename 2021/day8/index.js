import { getResult } from '../Util.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day8/input.txt').then(part2);

}
let smInput = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
let segments = {
  "zero": {
      "value": "abdefg",
      "length": 6
  },
  "one": {
      "value": "cf",
      "length": 2
  },
  "two": {
      "value": "acdeg",
      "length": 5
  },
  "three": {
      "value": "acdfg",
      "length": 5
  },
  "four": {
      "value": "bcdf",
      "length": 4
  },
  "five": {
      "value": "abdfg",
      "length": 5
  },
  "six": {
      "value": "abdefg",
      "length": 6
  },
  "seven": {
      "value": "acf",
      "length": 3
  },
  "eight": {
      "value": "abcdefg",
      "length": 7
  },
  "nine": {
      "value": "abcdfg",
      "length": 6
  }
}
function part1(input) {
  console.log('-----part1-----')
  let data = input
    .split('\n')
    .map(d => d.split(' | ').map(d => d.split(' ')));
  console.log(data)
  
  let easyDigs = 0;
  let len1478 = [
    segments.one.length,
    segments.four.length,
    segments.seven.length,
    segments.eight.length
  ]
  for (let d of data) {
    easyDigs += decode(d)
  }
  console.log('result', easyDigs)
  result.innerText = easyDigs;
  function decode(input) {
    let find1478 = input[1].filter(d => {
      let dLen = d.length;
      return len1478.includes(dLen)
    });
    return find1478.length;
  } 

};

function part2(input) {
  console.log('-----part2-----')
  let data = input
    .split('\n')
    .map(d => d.split(' | ').map(d => d.split(' ')));

  let output = [];
  for (let d of data) {
    output.push(+decode(d));
  }
  
  console.log('result', output.reduce((a,c) => a + c, 0))


  function decode(input) {
    let testSignal = input[0];
    let sorted = testSignal.map(d => {
      return d.split('').sort().join('');
    });
    let newNums = [
      '',
      sorted.find(d => d.length === segments.one.length),
      '',
      '',
      sorted.find(d => d.length === segments.four.length),
      '',
      '',
      sorted.find(d => d.length === segments.seven.length),
      sorted.find(d => d.length === segments.eight.length),
      '',
    ];
    sorted.filter(d => d.length === 5)
      .forEach(d => {
        let foundOne = 0;
        let foundFour = 0;
        let oneSplit = newNums[1].split('');
        let fourSplit = newNums[4].split('');
        d.split('').forEach(d => {
          if (oneSplit.includes(d)) {
            foundOne++;
          }
          if (fourSplit.includes(d)) {
            foundFour++;
          }
        })
        if (foundOne === 2) {
          newNums[3] = d
        }
        if (foundFour === 3 && foundOne === 1) {
          newNums[5] = d;
        }
        if (foundFour === 2 && foundOne === 1) {
          newNums[2] = d
        }
      });
    
    sorted.filter(d => d.length === 6)
      .forEach(d => {
        let foundOne = 0;
        let foundFour = 0;
        let oneSplit = newNums[1].split('');
        let fourSplit = newNums[4].split('');
        d.split('').forEach(d => {
          if (oneSplit.includes(d)) {
            foundOne++;
          }
          if (fourSplit.includes(d)) {
            foundFour++;
          }
        });

        if (foundOne === 1) {
          newNums[6] = d;
        } else if (foundFour === 4) {
          newNums[9] = d;
        } else {
          newNums[0] = d;
        }
      });

    let outputVals = input[1].map(d => {
      let dSort = d.split('').sort().join('');
      return newNums.findIndex(nn => nn === dSort);
    });
    return outputVals.join('')
  }
};
