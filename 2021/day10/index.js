import { LinkedList } from '../LinkedList.js';
import { getResult } from '../Util.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day10/input.txt').then(part2);

}

let tags = {
  '{': { value: '}', end: false },
  '[': { value: ']', end: false },
  '(': { value: ')', end: false },
  '<': { value: '>', end: false },
  '}': { value: '{', end: true, score: 1197 },
  ']': { value: '[', end: true, score: 57 },
  ')': { value: '(', end: true, score: 3 },
  '>': { value: '<', end: true, score: 25137 }
}

function part1(input) {
  console.log('-----part1-----')
  let data = input
    .split('\n')
    .map((d,i) => d.split(''));
  console.log('data', data);
  let dataList = [];
  let errors = [];
  let i = 0;
  for (let dt of data) {
    
    let list = new LinkedList();
    list.push(dt[0]);
    dt.splice(0,1);

    try {
      dt.forEach(d => {
        if (!list.tail) {
          list.push(d)
        } else {
          if (tags[d].value !== list.tail.value) {
            if (tags[d].end) {
              throw { found: d, expected: list.tail.value };
            }
            list.push(d)
          } else {
            let oldTail = list.pop();
            while (oldTail.value !== tags[d].value) {
              oldTail = list.pop();
            }
          }
        }
      });
      dataList.push(list);
    } catch (e) {
      console.error(`Error: found ${e.found}, expected ${e.expected}`);
      errors.push({ found: e.found, errStr: dt.join('') });
    }
    i++;
  }
  errors.forEach(err => {
    let dataId = data.findIndex(dt => dt.join('') === err.errStr);
    data.splice(dataId, 1);
  });
  return dataList;
};

function part2(input) {
  console.log('-----part2-----')
  let data = part1(input);

  console.log('data', data);

  let tagValues = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  let result = [];
  data.forEach(d => {
    let list = [];
    while (d.tail) {
      let pop = d.pop();
      list.push(tags[pop.value].value)
    }
    result.push(list);
  });
  console.log(result);
  let compValues = result.map(d => d.reduce((a,c) => (a * 5) + tagValues[c], 0));
  compValues.sort((a,b) => a - b);
  console.log('compValues', compValues)
  console.log('compValues', compValues[Math.floor(compValues.length/2)])
};
