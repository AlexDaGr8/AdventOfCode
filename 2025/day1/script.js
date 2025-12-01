import parseFile from '../parseFile.js';

const testFile = './day1/test.txt';
const inputFile = './day1/input.txt';

function splitNumber(num) {
  const dec = (num * .01).toFixed(2);
  const split = dec.split('.');

  return {
    hund: +split[0],
    tens: +split[1]
  }
}

async function solution(file) {
    const data = await parseFile(file);
    data.rows = data.rows.map(r => 
        ({ 
            dir: r.match(/L|R/g)[0],
            val: splitNumber(r.match(/\d+/g)[0])
        }))
    let current = 50;
    let prevCurrent = current;
    let pointsAtZero = 0;
    const valuesAfterTurn = [current];

    for (const row of data.rows) {
        console.log(row)

        prevCurrent = current;

        if (row.dir === 'L') {
            current -= row.val.tens;
        } else if (row.dir === 'R') {
            current += row.val.tens;
        }

        if (current < 0) {
            console.log('less than');
            current = current + 100;

            if (current !== 0 && prevCurrent !== 0) {
                pointsAtZero++;
            }
        } else if (current > 99) {
            console.log('greater than');
            current = current - 100;

            if (current !== 0 && prevCurrent !== 0) {
                pointsAtZero++;
            }
        } 
        
        pointsAtZero += row.val.hund;

        valuesAfterTurn.push(current);
        console.log('current', current)
        console.log('prevCurrent', prevCurrent)
        console.log('pointsAtZero', pointsAtZero)
    }

    const numberOfZeros = valuesAfterTurn.filter(v => v === 0);

    console.log('Part 1', numberOfZeros.length)

    console.log('Part 2', numberOfZeros.length + pointsAtZero)
}

solution(inputFile);