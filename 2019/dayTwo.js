let dataDayTwo = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,9,19,23,1,23,5,27,2,27,10,31,1,6,31,35,1,6,35,39,2,9,39,43,1,6,43,47,1,47,5,51,1,51,13,55,1,55,13,59,1,59,5,63,2,63,6,67,1,5,67,71,1,71,13,75,1,10,75,79,2,79,6,83,2,9,83,87,1,5,87,91,1,91,5,95,2,9,95,99,1,6,99,103,1,9,103,107,2,9,107,111,1,111,6,115,2,9,115,119,1,119,6,123,1,123,9,127,2,127,13,131,1,131,9,135,1,10,135,139,2,139,10,143,1,143,5,147,2,147,6,151,1,151,5,155,1,2,155,159,1,6,159,0,99,2,0,14,0];
let div = document.getElementById('day-two');
let result = [];


const target = 19690720;
var noun = 12, verb = 2;
var testVal = programLess(dataDayTwo, noun, verb);

console.log('testVal', testVal);

let dayTwoStr = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,9,1,19,1,9,19,23,1,23,5,27,2,27,10,31,1,6,31,35,1,6,35,39,2,9,39,43,1,6,43,47,1,47,5,51,1,51,13,55,1,55,13,59,1,59,5,63,2,63,6,67,1,5,67,71,1,71,13,75,1,10,75,79,2,79,6,83,2,9,83,87,1,5,87,91,1,91,5,95,2,9,95,99,1,6,99,103,1,9,103,107,2,9,107,111,1,111,6,115,2,9,115,119,1,119,6,123,1,123,9,127,2,127,13,131,1,131,9,135,1,10,135,139,2,139,10,143,1,143,5,147,2,147,6,151,1,151,5,155,1,2,155,159,1,6,159,0,99,2,0,14,0";
let testFunc = new optCode(dayTwoStr, 12, 2);

console.log('testFunc', testFunc.answer);
// while (testVal < target) {
//     console.log('noun', noun)
//     console.log('testVal', testVal )
//     testVal = programLess(dataDayTwo, noun++, verb)
// }

// result.push(program(dataDayTwo, 40, 19) + '<br>');
// result.push('19690720<br>');

// div.innerHTML = result.join('');



// let part2DayTwo = document.createElement('div');
// let part2Result = [];
// part2Result.push('noun - ' + noun + '<br>');
// part2Result.push('verb - ' + verb + '<br>');
// part2Result.push('answer - ' + (100 * noun + verb) + '<br>');
// part2DayTwo.innerHTML = part2Result.join('');
// div.appendChild(part2DayTwo);

function program(d, noun, verb) {
    d[1] = noun;
    d[2] = verb;
    let i = 0;
    while (d[i] !== 99) {
        var slice = d.slice(i, i + 4);
        result.push(slice + '<br>');
        var ct = checkType(slice, d);
        result.push(ct.position + ' - ' + ct.value + '<br>');
        d[ct.position] = ct.value;
        let vizD = d.slice();
        vizD[slice[1]] = '<b class="green">' + vizD[slice[1]] + '</b>';
        vizD[slice[2]] = '<b class="purple">' + vizD[slice[2]] + '</b>';
        vizD[ct.position] = '<b class="blue">' + vizD[ct.position] + '</b>';
        result.push(vizD + '<br>');
        i += 4;
    }
    result.push('<b class="green">' + d[0] % (100 * noun + verb) + '</b><br>')
    result.push('<b class="purple">' + (100 * noun + verb) + '</b><br>')
    return d[0];
}
function programLess(d, noun, verb) {
    d[1] = noun;
    d[2] = verb;
    let i = 0;
    while (d[i] !== 99) {
        var ct = checkType(d.slice(i, i + 4) , d);
        d[ct.position] = ct.value;
        i += 4;
    }
    return d[0];
}

function checkType(arrS, arrD) {
    let value = arrS[0] === 1 ? arrD[arrS[1]] + arrD[arrS[2]] : arrD[arrS[1]] * arrD[arrS[2]] ;
    return { value: value, position: arrS[3] };
}
