function diagonals(input) {
    let id = 0;
    this.input = input.split('\n').map((d,i) => {
        return d.split('').map((g,j) => { 
            return {
                astroid: g !== '.',
                x: j,
                y: i,
                slopes: [],
                id: id++,
                hypot: '',
            };
        });
    });
    this.output = [];
    for (var i = 0; i < this.input.length; i++) {
        for (var j = 0; j < this.input[i].length; j++) {
            let currentPoint = this.input[i][j];
            let allSlopesForPoint = this.getAllSlopes(currentPoint, this.input)
            this.input[i][j].slopes = allSlopesForPoint;
        }
    }
    console.log('input', this.input)
    this.input.flat().forEach(d => {
        if (d.astroid) this.canSee(d); 
    })
    this.answer = this.input.flat()
        .reduce((acc, cur) => {
            let accList = acc.slopes.filter(sl => sl.canSee && sl.point.astroid);
            let curList = cur.slopes.filter(sl => sl.canSee && sl.point.astroid);
            return accList.length > curList.length ? acc : cur;
        });
    this.vaporize(this.answer.slopes);
}

diagonals.prototype.getAllSlopes = function(point, fieldArray) {
    let result = [];
    for (var i = 0; i < fieldArray.length; i++) {
        for (var j = 0; j < fieldArray[0].length; j++) {
            let testPoint = fieldArray[i][j];
            let slope = this.getSlope(point, testPoint);
            let hypot = Math.hypot(point.x - testPoint.x, point.y - testPoint.y);
            result.push({ 
                point: testPoint, 
                slope: slope, 
                hypot: hypot,
                canSee: false
            });
        }
    }
    return result;
}

diagonals.prototype.getSlope = function(point1, point2) {
    return (point2.y - point1.y) / (point2.x - point1.x);
}

diagonals.prototype.canSee = function(point) {
    let slopes = [...new Set(point.slopes.map(d => d.slope))]
        .sort((a,b) => a - b);
    slopes.forEach(slope => {
        var filteredSlopes = point.slopes.filter(f => f.slope === slope);
        var hypots = [...new Set(filteredSlopes.map(h => h.hypot))]
            .sort((a,b) => a - b);
        let leftAstroid = false, rightAstroid = false;
        hypots.forEach(hypot => {
            var filtered = point.slopes
                .filter(f => f.slope === slope && Object.is(f.hypot, hypot));
            let left = [], right = [];
            if (Math.abs(slope) === Infinity) {
                left = filtered.filter(l => l.point.y < point.y);
                right = filtered.filter(r => r.point.y > point.y);
            }
            else {
                left = filtered.filter(l => l.point.x < point.x);
                right = filtered.filter(r => r.point.x > point.x);
            }
            left.forEach(p => {
                if (!leftAstroid) {
                    leftAstroid = p.point.astroid;
                    point.slopes.find(fi => fi.point.id === p.point.id).canSee = true;
                }
            })
            right.forEach(p => {
                if (!rightAstroid) {
                    rightAstroid = p.point.astroid;
                    point.slopes.find(fi => fi.point.id === p.point.id).canSee = true;
                }
            })
        })
    });
}

diagonals.prototype.vaporize = function(arr) {
    let sorted = arr
        .filter(d => d.point.astroid && !Number.isNaN(d.slope) && d.canSee)
        .sort((a,b) => b.slope - a.slope || a.hypot - b.hypot);
    let left = [
        ...sorted.filter(d => d.point.x > this.answer.x),
        sorted.find(d => Object.is(d.slope, -Infinity))
    ];
    let right = [
        ...sorted.filter(d => d.point.x < this.answer.x),
        sorted.find(d => Object.is(d.slope, Infinity)),
    ];
    let full = right.concat(left);
    console.log('full', full.reverse())
    console.log('sorted[199]', full[199]);
    console.log('answer vaporize', full[199].point.x * 100 + full[199].point.y)
    // let slopes = [...new Set(sorted.map(d => d.slope))];
    // slopes.forEach(slope => {
    //     console.log(sorted.filter(d => d.slope === getAllSlopes))
    // })
    console.log('arr', sorted);
}

diagonals.prototype.display = function(elem) {
    const mainElem = elem ? elem : document.getElementsByTagName("body")[0];
    let grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.width = '30vw';
    grid.style.margin = 'auto';
    grid.style.gridTemplateColumns = `repeat(${this.input[0].length}, 1fr)`;
    grid.style.gridGap = '2px';


    let thisPoint = document.createElement('h3');
    thisPoint.id = 'coordinates';
    thisPoint.innerText = `x: NaN, y: NaN, canSeeNum: NaN`;
    thisPoint.style.textAlign = 'center';
    let flatInput = this.input.slice().flat()

    // let table = this.createTable(mainElem.querySelector('.column3'), flatInput);
    // this.sortTable(mainElem.querySelector('.column3'));
    flatInput.forEach(d => {
        var newElem = document.createElement('div');
        newElem.id = `elem-${d.id}`;
        newElem.innerText = d.astroid ? '#' : '.';
        newElem.style.textAlign = 'center';
        newElem.style.border = 'solid 1px #777'
        newElem.classList.add(d.astroid ? 'astroid' : 'empty', 'elem');
        if (d.astroid) {
            newElem.style.cursor = 'pointer';
            newElem.addEventListener('click', (ev) => {
                var all = document.querySelectorAll('.elem');
                [].forEach.call(all, a => {
                    a.style.border = 'solid 1px red';
                    a.style.color = 'red';
                    a.dataset.isClicked = false;
                    if (a.classList.contains('empty')) {
                        a.style.opacity = '0.5'
                    }
                })
                newElem.dataset.isClicked = true;
                var iCanSeeYou = d.slopes.filter(sl => sl.canSee);
                iCanSeeYou.forEach(seen => {
                    var seenElem = document.querySelector(`#elem-${seen.point.id}`);
                    seenElem.style.border = 'solid 1px green';
                    seenElem.style.color = 'green';
                })
                newElem.style.border = 'solid 1px blue';
                newElem.style.color = 'blue';

                thisPoint.innerText = `x: ${d.x}, y: ${d.y}, canSeeNum: ${iCanSeeYou.filter(sy => sy.point.astroid).length}`;
            })
        }
        grid.appendChild(newElem)
    })

    let column2 = mainElem.querySelector('.column2');

    column2.appendChild(thisPoint)
    column2.appendChild(grid);


    console.log('answer', this.answer.id)
    let answer = grid.querySelector(`#elem-${this.answer.id}`);
    answer.style.border = 'solid blue'
    answer.click();
}

diagonals.prototype.createTable = function(elem, arr) {
    const mainElem = elem;

    while (mainElem.firstChild) {
        mainElem.removeChild(mainElem.firstChild);
    }
    let flattened = this.flattenObject(arr[0]);
    let arrayKeys = Object.keys(flattened);
    let grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `1fr`;
    grid.style.gridGap = '2px';

    let rowHeader = document.createElement('div');
    rowHeader.style.display = 'grid';
    rowHeader.style.gridTemplateColumns = `repeat(${arrayKeys.length}, 1fr)`;
    rowHeader.style.gridGap = '2px';
    rowHeader.id = 'table-header-row';

    arrayKeys.forEach(d => {
        var header = document.createElement('h4');
        header.innerText = d;
        rowHeader.appendChild(header);
    });
    grid.appendChild(rowHeader)

    arr.forEach(d => {
        var flat = this.flattenObject(d);
        let row = document.createElement('div');
        row.style.display = 'grid';
        row.style.gridTemplateColumns = `repeat(${arrayKeys.length}, 1fr)`;
        row.style.gridGap = '2px';
        row.id = flat.id;
        row.classList.add('row')
        arrayKeys.forEach(key => {
            var data = document.createElement('div');
            data.innerText = Array.isArray(flat[key]) ? flat[key].length : typeof flat[key] !== 'number' ? flat[key] : (flat[key]).toFixed(2);
            data.classList.add(`table-${key}-${flat.id}`)
            data.addEventListener('mouseover', (ev) => {
                var asteroid = document.querySelector(`#elem-${flat.id}`);
                asteroid.style.background = 'gold';
            })
            data.addEventListener('mouseout', (ev) => {
                var asteroid = document.querySelector(`#elem-${flat.id}`);
                asteroid.style.background = 'none';
            })
            row.appendChild(data);
        })
        grid.appendChild(row)
    })

    mainElem.appendChild(grid);
}

diagonals.prototype.sortTable = function(table) {
    let tableDiv = table.querySelector('div');
    let rows = tableDiv.querySelectorAll('.row');
    let rowsArray = Array.prototype.slice.call(rows, 0);
    //[].forEach.call(rows, row => tableDiv.removeChild(row));
    rowsArray.sort((a,b) => {
        let aHypot= a.querySelector('div[class^="table-hypot');
        let bHypot = b.querySelector('div[class^="table-hypot');
        if (+aHypot.innerText < +bHypot.innerText) return 1;
        if (+aHypot.innerText > +bHypot.innerText) return -1
        return 0;
    })

    rowsArray.forEach(row => {
        tableDiv.removeChild(row);
        tableDiv.appendChild(row);
    })
}

diagonals.prototype.flattenObject = function(obj) {
    return Object.assign(
        {}, 
        ...function _flatten(o) { 
          return [].concat(...Object.keys(o)
            .map(k => 
              typeof o[k] === 'object' && !Array.isArray(o[k]) ?
                _flatten(o[k]) : 
                ({[k]: o[k]})
            )
          );
        }(obj)
      )
}

const test = `.#..#
.....
#####
....#
...##`;

const testA = `#.........
...#......
...#..#...
.####....#
#.#.#.#...
.....#....
#.###.#.##
.......#..
....#...#.
...#..#..#`;

const test2 = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;

const test3 = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;

const test4 = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;

const test5 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`

const puzzleInput = `#..#.#.#.######..#.#...##
##.#..#.#..##.#..######.#
.#.##.#..##..#.#.####.#..
.#..##.#.#..#.#...#...#.#
#...###.##.##..##...#..#.
##..#.#.#.###...#.##..#.#
###.###.#.##.##....#####.
.#####.#.#...#..#####..#.
.#.##...#.#...#####.##...
######.#..##.#..#.#.#....
###.##.#######....##.#..#
.####.##..#.##.#.#.##...#
##...##.######..##..#.###
...###...#..#...#.###..#.
.#####...##..#..#####.###
.#####..#.#######.###.##.
#...###.####.##.##.#.##.#
.#.#.#.#.#.##.#..#.#..###
##.#.####.###....###..##.
#..##.#....#..#..#.#..#.#
##..#..#...#..##..####..#
....#.....##..#.##.#...##
.##..#.#..##..##.#..##..#
.##..#####....#####.#.#.#
#..#..#..##...#..#.#.#.##`;

let test2Answer = new diagonals(puzzleInput);
test2Answer.display(document.querySelector('.display-grid'));

let tests = [test, test2, test3, test4, test5];

// tests.forEach(t => {
//     t.diags = new diagonals(t);
//     console.log('---------------')
// })