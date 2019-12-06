let data = [
    102480,
    121446,
    118935,
    54155,
    102510,
    142419,
    73274,
    57571,
    123916,
    99176,
    143124,
    141318,
    72224,
    145479,
    97027,
    126427,
    94990,
    100521,
    105589,
    123009,
    77143,
    142861,
    92366,
    66478,
    102195,
    128373,
    128447,
    120178,
    99122,
    98671,
    89541,
    125720,
    107984,
    126544,
    145231,
    110241,
    123926,
    72793,
    76705,
    128338,
    74262,
    68845,
    65297,
    112536,
    59892,
    57115,
    73230,
    80569,
    146118,
    108843,
    59221,
    140492,
    122616,
    140652,
    64404,
    99782,
    104375,
    86926,
    143145,
    114969,
    108948,
    77236,
    143655,
    71406,
    97588,
    64892,
    105345,
    104393,
    93442,
    54525,
    94116,
    123606,
    106813,
    59904,
    149253,
    81620,
    80892,
    66309,
    142604,
    97984,
    79743,
    79448,
    123756,
    64927,
    139703,
    71448,
    135964,
    86083,
    94767,
    116856,
    73786,
    141083,
    122581,
    82239,
    122282,
    96092,
    80029,
    52957,
    72062,
    52124,
];

let fuelByMass = (mass) => Math.floor(mass / 3) - 2;

let dayOne = document.getElementById('day-one');

// Day one part 1
let answer = data.reduce((acc, cur) => acc + fuelByMass(cur), 0);
let part1Label = document.createElement('h3');
part1Label.innerText = 'Part 1'
let part1 = document.createElement('span');
part1.innerText = answer;
dayOne.appendChild(part1Label);
dayOne.appendChild(part1);


let extraFuel = (fuel) => {
    let acc = 0;
    while ((fuel = fuelByMass(fuel)) > 0) {
        acc += fuel;
    }
    return acc;
}

// Day one part 2
let answer2 = data.reduce((acc, cur) => {
    //while ()
    return acc + extraFuel(cur);
}, 0);
let part2Label = document.createElement('h3');
part2Label.innerText = 'Part 2'
let part2 = document.createElement('span');
part2.innerText = answer2;
dayOne.appendChild(part2Label);
dayOne.appendChild(part2);