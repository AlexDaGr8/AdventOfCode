import parseFile from '../parseFile.js';

const testFile = './test.txt';
const inputFile = './input.txt';

async function solution(file) {
    const data = await parseFile(file);

    const part1StartTime = performance.now();
    console.log(part1(data.rows));
    const part1EndTime = performance.now();

    console.log(`Part 1 took: ${part1EndTime - part1StartTime} ms`)

    const part2StartTime = performance.now();
    console.log(part2(data.rows));
    const part2EndTime = performance.now();

    console.log(`Part 2 took: ${part2EndTime - part2StartTime} ms`)
}

function part1(rows) {
    const joltages = [];

    for (const row of rows) {
        const batteries = row.split('').map((r,id) => ({ jolts: +r, id }))
        const largestId = row.length - 1
        const sortedBatteries = batteries.sort((a,b) => b.jolts - a.jolts)

        if (sortedBatteries[0].id < largestId) {
            const firstNumber = sortedBatteries[0];
            let i = 1;

            while (sortedBatteries[i].id < firstNumber.id) {
                i++;
            }

            joltages.push(+`${sortedBatteries[0].jolts}${sortedBatteries[i].jolts}`)
        } else {
            joltages.push(+`${sortedBatteries[1].jolts}${sortedBatteries[0].jolts}`)
        }
    }

    return joltages.reduce((a,c) => a + c, 0)
}

function part2(rows) {
    const joltages = [];

    for (const row of rows) {
        const jolts = [];
        const batteries = row.split('').map((r,id) => ({ jolts: +r, id }));
        let endingId = row.length - 12;
        let currentJoltId = 0;
        
        while(endingId !== row.length) {
            const jolt = recurse(batteries, currentJoltId, endingId);

            currentJoltId = jolt.id + 1;

            jolts.push(jolt);

            endingId++;
        }
        joltages.push(+jolts.map(j => j.jolts).join(''))
    }

    function recurse(batteries, startingId, endingID) {
        const batterySet = batteries.slice(startingId, endingID + 1);
        const sorted = batterySet.sort((a,b) => b.jolts - a.jolts);

        return sorted[0];
    }

    return joltages.reduce((a,c) => a + c, 0)
}

// solution(testFile);
solution(inputFile);
