function diagonals(input) {
    let id = 0;
    this.input = input.split('\n').map((d,i) => {
        return d.split('').map((g,j) => { 
            return {
                astroid: g !== '.',
                x: j,
                y: i,
                canSee: [],
                id: id++
            };
        });
    });
    this.output = [];
    for (var i = 0; i < this.input.length; i++) {
        for (var j = 0; j < this.input[i].length; j++) {
            let currentPoint = this.input[i][j];
            if (currentPoint.astroid) {
                let allSlopesForPoint = this.getAllSlopes(currentPoint)
                this.input[i][j].canSee = allSlopesForPoint;
            }
        }
    }
    console.log('input', this.input)
    this.pointCanSeeMost = this.input.slice().flat()
        .reduce((acc, cur) => cur.canSee.length > acc.canSee.length ? cur : acc);
    console.log('most', this.pointCanSeeMost)
    console.log(`most seen point - x: ${this.pointCanSeeMost.x}, y: ${this.pointCanSeeMost.y}`)
}

diagonals.prototype.getAllSlopes = function(point) {
    for (var i = 0; i < this.input.length; i++) {
        for (var j = 0; j < this.input[0].length; j++) {
            let testPoint = this.input[i][j];
            if (testPoint.astroid) {
                let slope = this.getSlope(point, testPoint);
                
                console.log('------- point --------', point)
                console.log('slope', slope)
                let slopeExists = point.canSee.some(d => Object.is(d.slope, slope));
               
                if (!Number.isNaN(slope) && !slopeExists) {
                    point.canSee.push({slope: slope, point: testPoint})
                } else if (slopeExists && !Number.isNaN(slope)) {
                    let filterSlopePoints = point.canSee.filter(d => Object.is(d.slope, slope));
                    // check if point is between testPoint and point already in canSee
                    let collisionPoints = [testPoint, ...filterSlopePoints.map(d => d.point)].slice()
                    collisionPoints.forEach(d => {
                        d.hypot = Math.hypot(point.x - d.x, point.y - d.y);
                    })
                    let closestPoint = collisionPoints.reduce((acc, curr) => curr.hypot < acc.hypot ? curr : acc); 
                    
                    console.log('collisionPoints', collisionPoints)
                    let xBetween = Math.min(...collisionPoints.map(d => d.x)) <= point.x && Math.max(...collisionPoints.map(d => d.x)) >= point.x;
                    let yBetween = Math.min(...collisionPoints.map(d => d.y)) <= point.y && Math.max(...collisionPoints.map(d => d.y)) >= point.y;
                   
                    console.log('xBetween', xBetween)
                    console.log('yBetween', yBetween)

                    if (xBetween && yBetween) {

                        let exists = point.canSee.findIndex(d => d.point.id === closestPoint.id);
                        console.log('point.canSee', point.canSee.slice())
                        console.log('exists', closestPoint)
                        console.log('exists', exists)
                        if (exists > -1) {
                            collisionPoints.splice(collisionPoints.findIndex(d => d.id === exists), 1);
                            closestPoint = collisionPoints.reduce((acc, curr) => curr.hypot < acc.hypot ? curr : acc); 
                            point.canSee.push({slope: slope, point: closestPoint})
                        } else {
                            point.canSee.push({slope: slope, point: closestPoint})
                        }
                    } else {
                        let getLastSlopeId = point.canSee.findIndex(d => Object.is(d.slope, slope));
                        point.canSee.splice(getLastSlopeId, 1, {slope: slope, point: closestPoint});
                        console.log(getLastSlopeId)
                    }
                    
                    console.log('canSee', point.canSee.slice())
                }
                console.log('-------------------')
            }
        }
    }
    return point.canSee;
}

diagonals.prototype.getSlope = function(point1, point2) {
    console.log('point2', point2)
    return (point2.y - point1.y) / (point2.x - point1.x);
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
    thisPoint.innerText = `x: NaN, y: NaN, canSee: NaN`;
    thisPoint.style.textAlign = 'center';
    let flatInput = this.input.slice().flat()

    let table = this.createTable(mainElem.querySelector('.column3'), flatInput.filter(d => d.astroid));
    this.sortTable(mainElem.querySelector('.column3'));
    flatInput.forEach(d => {
        var newElem = document.createElement('div');
        newElem.id = `elem-${d.id}`;
        newElem.innerText = d.astroid ? '#' : '.';
        newElem.style.textAlign = 'center';
        newElem.style.border = 'solid 1px #777'
        newElem.classList.add(d.astroid ? 'astroid' : 'empty');
        if (d.astroid) {
            newElem.style.cursor = 'pointer';
            newElem.addEventListener('click', (ev) => {
                var astroids = document.querySelectorAll('.astroid');
                [].forEach.call(astroids, ast => {
                    ast.style.color = 'red'
                    ast.dataset.isClicked = false;
                });
                newElem.dataset.isClicked = true;
                var allTableAstroids = document.querySelectorAll(`div[class^="table-astroid"]`);
                [].forEach.call(allTableAstroids, _ => _.style.borderBottom = 'solid red');
                var allTableaHyptos = document.querySelectorAll(`div[class^="table-hypot"]`);
                [].forEach.call(allTableaHyptos, _ =>{ 
                    _.innerText = '';
                    _.style.color = 'initial';
                });
                d.canSee.forEach(cs => {
                    var csElem = document.getElementById(`elem-${cs.point.id}`)
                    csElem.style.color = 'green';
                    var tableAstroid = document.querySelector(`.table-astroid-${cs.point.id}`);
                    tableAstroid.style.borderBottom = 'solid green';
                    var tableHypot= document.querySelector(`.table-hypot-${cs.point.id}`);
                    tableHypot.innerText = this.getSlope(d, cs.point);
                });
                // cant see them but show slope in table
                let cannotSee = flatInput.filter(f => d.canSee.findIndex(c => c.point.id === f.id) < 0 && f.astroid);
                cannotSee.forEach(cntSee => {
                    var tableHypot= document.querySelector(`.table-hypot-${cntSee.id}`);
                    tableHypot.innerText = this.getSlope(d, cntSee);
                    tableHypot.style.color = 'red'
                })
                this.sortTable(mainElem.querySelector('.column3'));
                newElem.style.color = 'blue'
                var coords = document.getElementById('coordinates');
                coords.innerText = `x: ${d.x}, y: ${d.y}, canSee: ${d.canSee.length}`;
            })
        }
        grid.appendChild(newElem)
    })

    let column2 = mainElem.querySelector('.column2');

    let answer = grid.querySelector(`#elem-${this.pointCanSeeMost.id}`);
    answer.style.border = 'solid purple 3px'

    column2.appendChild(thisPoint)
    column2.appendChild(grid);
    //mainElem.appendChild(column2);

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
            data.innerText = Array.isArray(flat[key]) ? flat[key].length : typeof flat[key] === 'boolean' ? flat[key] : (flat[key]).toFixed(2);
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
    console.log('rowsArray before', rowsArray.slice())
    //[].forEach.call(rows, row => tableDiv.removeChild(row));
    rowsArray.sort((a,b) => {
        let aHypot= a.querySelector('div[class^="table-hypot');
        let bHypot = b.querySelector('div[class^="table-hypot');
        if (+aHypot.innerText < +bHypot.innerText) return 1;
        if (+aHypot.innerText > +bHypot.innerText) return -1
        return 0;
    })

    console.log('rowsArray', rowsArray)

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

let test2Answer = new diagonals(test2);
test2Answer.display(document.querySelector('.display-grid'));

let tests = [test, test2, test3, test4, test5];

// tests.forEach(t => {
//     t.diags = new diagonals(t);
//     console.log('---------------')
// })