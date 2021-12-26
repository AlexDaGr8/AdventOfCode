import { getResult } from '../Util.js';
document.body.style.background = '#444';
document.body.style.color = '#ddd';
document.body.style.textAlign = 'center';

console.clear();
init();
async function init() {
  let data = await getResult('./day11/input.txt').then(part1);
}


function part1(input) {
  console.log('-----part1-----')
  let data = input
    .split('\n')
    .map((d,i) => d.split('').map(s => +s));

  console.log('data', data)
  let flashes = [];
  let totalFlashes = 0;
  let steps = 10000;
  let br = '<br/>';

  result.innerHTML += `initial State ${br}`;
  result.innerHTML += data.map(addSpans).join(br) + br + br;

  // part2

  for (let step in Array(steps).fill()) {
    flashes.push([])
    let resultStr = `--- after step ${+step + 1} ---` + br + br;
    for (let row in data) {
      // console.log('row', row)
      for (let column in data[row]) {
        if (data[row][column] + 1 > 9) {
          flashes[step].push({row, column});
          data[row][column] = 0;
        } else {
          data[row][column] = data[row][column] + 1
        }
      }
    }
    flashes[step].forEach(energyTransfer)
    resultStr += data.map(addSpans).join(br) + br + br;
    resultStr += `Step flashes: ${flashes[step].length} ${br}`;
    totalFlashes += flashes[step].length;
    resultStr += `Total flashes: ${totalFlashes} ${br} ${br}`;
    console.log('dataLenght', data.flat().length);
    console.log('flashes[step].length', flashes[step].length);
    setTimeout(() => {
      result.innerHTML = resultStr;
    }, 100 * step);
    if (flashes[step].length === 100) break;
  }
  
  // -------- part 1 -----
  // steps = 100;
  // const stepIterator = stepGenerator();
  // let val = stepIterator.next();
  // console.log('val', val)
  // for (let i = 1; i < steps + 1; i++) {
  //   setTimeout(function() {
  //     result.innerHTML = val.value;
  //     val = stepIterator.next();
  //     console.log('val', val);
  //   }, 300 * i);
  //   if (val.done) break;
  // }

  function* stepGenerator() {
    for (let step in Array(steps).fill()) {
      flashes.push([])
      let resultStr = `--- after step ${+step + 1} ---` + br + br;
      for (let row in data) {
        // console.log('row', row)
        for (let column in data[row]) {
          if (data[row][column] + 1 > 9) {
            flashes[step].push({row, column});
            data[row][column] = 0;
          } else {
            data[row][column] = data[row][column] + 1
          }
        }
      }
      flashes[step].forEach(energyTransfer)
      resultStr += data.map(addSpans).join(br) + br + br;
      resultStr += `Step flashes: ${flashes[step].length} ${br}`;
      totalFlashes += flashes[step].length;
      resultStr += `Total flashes: ${totalFlashes} ${br} ${br}`;
      console.log('dataLenght', data.flat().length);
      console.log('flashes[step].length', flashes[step].length);
      if (flashes[step].length > 10) break;
      yield resultStr;
    }
  }

  function addSpans(d) {
    let colors =
    ["#fff399","#4700C3","#5B19AD","#703298","#844B82","#99646C","#AD7D57","#C29641","#D6AF2B","#EBC816"]
    
    let dStr =  d.reduce((a,c) => {
      let color = (+c === 0) ? 'yellow' : '#ddd';
      a = a + '<span style="color:' + colors[+c] + '">' +  c + '</span>';
      return a;
    }, '');
    return dStr;
  }
  function energyTransfer({row, column}, i, arr) {
    row = +row;
    column = +column;
    // console.log(`energy transfer row: ${row}, column ${column}`)
    // console.log('arr', arr);
    let current = data[row][column];
    // console.log('current', current)
    let proximity = [];
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = column - 1; c <= column + 1; c++) {
        try {
          if (!(r === row && c === column)) {
            proximity.push({ val: data[r][c], row: r, column: c}); 
          }
        } catch (e) { proximity.push({ val: undefined }); }
      }
    }
    
    proximity.filter(d => d.val !== undefined)
      .forEach(prox => {
        if (data[prox.row][prox.column] !== 0) {
          data[prox.row][prox.column] += 1;
          if (data[prox.row][prox.column]  > 9) {
            arr.push({ row: prox.row, column: prox.column });
            data[prox.row][prox.column] = 0;
            energyTransfer({ row: prox.row, column: prox.column}, i, arr);
          } 
        }
      });
  }
};

function part2(input) {
  console.log('-----part2-----')
};
