let inputRange = [248345,746315];

let combos = [...Array(inputRange[1] + 1).keys()];

let lessCombos = combos.slice(inputRange[0])
let asc = lessCombos.filter(ascFilter);
let pairs = asc.filter(pairFilter);
let pairsOfTwo = pairs.filter(pairOfTwoFilter);
console.log(lessCombos)
console.log(asc)
console.log(pairs)
console.log(pairsOfTwo)

console.log(pairOfTwoFilter("255599"))
console.log(pairOfTwoFilter("266777"))
console.log(pairOfTwoFilter("248888"))
console.log(pairOfTwoFilter("333333"))

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
    let pair = false;
    let group = 1;
    let toManyPairs = false;
    let last = +digits[0];
    digits.slice(1).forEach(d => {
        if (last === +d) { 
            pair = true; 
            group++;
            if (group > 2) {
                toManyPairs = true;
                if (group % 2 === 0) {
                    toManyPairs = false;
                }
            }
        } else {
            group = 1;
        }
        last = +d;

    });
    return pair && !toManyPairs;
}