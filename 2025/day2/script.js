import parseFile from '../parseFile.js';

const testFile = './test.txt';
const inputFile = './input.txt';

async function solution(file) {
    const data = await parseFile(file);
    data.columns = data.columns.map(c => {
        const [start, end] = c.split('-');

        return { start: +start, end: +end }
    });

    console.log('data', data)

    // console.log('Part 1:', part1(data.columns))
    console.log('Part 2:', part2(data.columns))
}

function part1(columns) {
    const invalidIds = [];

    for (const column of columns) {
        const { start, end } = column
        for (let r = start; r <= end; r++) {
            let rStr = `${r}`;
            let half_length = Math.ceil(rStr.length / 2);    
            let leftSide = rStr.slice(0,half_length);
            let rightSide = rStr.slice(half_length);

            if (leftSide === rightSide) {
                invalidIds.push(r)
            }
        }
    }

    const part1 = invalidIds.reduce((a,c) => a + c, 0)

    return part1;
}

function part2(columns) {
    const invalidIds = [];
    const matchIds = []

    for (const column of columns) {
        const { start, end } = column
        for (let r = start; r <= end; r++) {
            let rStr = `${r}`;
            
            // cheating very easy way.
            let match = rStr.match(/^(\d+)\1+$/g)
            
            if (match) {
                matchIds.push(r)
            }

            // my solution with some tweeks once I knew the correct answer
            let half_length = Math.ceil(rStr.length / 2);

            // i was including single digit numbers, so remove those
            // and skip the rest
            if (rStr.length < 2) {
                continue;
            }

            // you can quickly check every number in a string is the same
            // if it is add that and skip the rest
            if (rStr.split('').every(c => c === rStr[0])) {

                if (invalidIds.indexOf(r) < 0)
                    invalidIds.push(r);
                
                continue;
            }
            
            for (let i = 1; i <= half_length; i++) {
                // if the string length does not equally split, skip that number
                if (rStr.length % i !== 0) {
                    continue;
                }

                // creating a set of unique numbers based on chunked string
                const set = [...new Set(chunkStr(i,rStr))];

                // if set is equal to one... all numbers are the same
                if (set.length === 1 && invalidIds.indexOf(r) < 0) {
                    invalidIds.push(r);
                }
            }
        }
    }

    function chunkStr(chunkSize, arr) {
        const newArr = [];

        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            
            newArr.push(chunk)
        }

        return newArr;
    }

    console.log('math', matchIds)
    console.log('inval', invalidIds)
    const uniqueInvalidIds = [...new Set(invalidIds)]
    console.log('unique', uniqueInvalidIds)
    const answer = uniqueInvalidIds.reduce((a,c) => a + c, 0)

    return answer;
}

// solution(testFile);
solution(inputFile);

// part2 attempts;
// 20942028300
// 20942028255
// 21116775773