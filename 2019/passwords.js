let inputRange = [248345,746315];

let combos = [...Array(inputRange[1] + 1).keys()];

let lessCombos = combos.slice(inputRange[0])
let asc = lessCombos.filter(ascFilter);
let pairs = asc.filter(pairFilter);
let pairsOfTwo = asc.filter(pairOfTwoFilter);
console.log('pairsOfTwo', pairsOfTwo)

let testCases = [
    "234567",
    "765432",
    "234657",
    "222222",
    "223344",
    "224433",
    "255599",
    "266777",
    "266667",
    "333333",
    "111122",
]

testCases.forEach(test => {
    console.log('--------------')
    console.log('test', test);
    console.log('asc', ascFilter(test));
    console.log('pairs', pairFilter(test));
    console.log('pairs of two', pairOfTwoFilter(test));
})

function ascFilter (d) {
    let digits = ("" + d).split("");
    let asc = true;
    let last = +digits[0];
    digits.slice(1).forEach(d => {
        if (last > +d) { asc = false; }
        last = +d;
    });
    return asc;
}
function pairFilter (d) {
    let digits = ("" + d).split("");
    let pair = false;
    let last = +digits[0];
    digits.slice(1).forEach(d => {
        if (last === +d) { pair = true; }
        last = +d;
    });
    return pair;
}
function pairOfTwoFilter(d) {
    let digits = ("" + d).split("");
    //let pair = false;
    let groupList = [];
    let group = 1;
    let numPairs = 0;
    let toManyPairs = false;
    let last = +digits[0];
    digits.slice(1).forEach(d => {
        if (last === +d) { 
            //pair = true;
            group++;
            numPairs += (group % 2 === 0 && group < 3) ? 1 : 0;
            if (group > 2) {
                toManyPairs = true;
                //numPairs -= (group % 2 !== 0) ? 1 : 0;
                if (group % 2 === 0) {
                    toManyPairs = false;
                    //numPairs++;
                } else {
                    numPairs -= 1;
                }
            }
        } else {
            groupList.push(group);
            group = 1;
        }
        last = +d;
    });
    groupList.push(group);
    return groupList.some(d => d === 2);
}