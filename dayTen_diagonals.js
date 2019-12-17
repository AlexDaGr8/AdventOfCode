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
                   
                    if (xBetween && yBetween) {
                        point.canSee.push({slope: slope, point: closestPoint})
                    } else {
                        let getLastSlopeId = point.canSee.findIndex(d => Object.is(d.slope, slope));
                        point.canSee.splice(getLastSlopeId, 1, {slope: slope, point: closestPoint});
                        console.log(getLastSlopeId)
                        console.log('canSee', point.canSee.slice())
                    }
                    
                }
                console.log('-------------------')
            }
        }
    }
    return point.canSee;
}

diagonals.prototype.getSlope = function(point1, point2) {
    // console.log('point1', point1);
    // console.log('point2', point2);
    return (point2.y - point1.y) / (point2.x - point1.x);
}

diagonals.prototype.display = function(elem) {
    const mainElem = elem ? elem : document.getElementsByTagName("body")[0];
    let grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.width = '30vmin';
    grid.style.margin = 'auto';
    grid.style.gridTemplateColumns = `repeat(${this.input[0].length}, 1fr)`;
    grid.style.gridGap = '2px';

    let thisPoint = document.createElement('h3');
    thisPoint.id = 'coordinates';
    thisPoint.innerText = `x: NaN, y: NaN, canSee: NaN`;
    thisPoint.style.textAlign = 'center';
    this.input.slice().flat().forEach(d => {
        var newElem = document.createElement('div');
        newElem.id = `elem-${d.id}`;
        newElem.innerText = d.astroid ? '#' : '.';
        newElem.style.textAlign = 'center';
        newElem.style.border = 'solid 1px #777'
        newElem.classList.add(d.astroid ? 'astroid' : 'empty');
        if (d.astroid) {
            newElem.addEventListener('mouseover', (ev) => {
                var astroids = document.querySelectorAll('.astroid');
                [].forEach.call(astroids, ast => {
                    ast.style.color = 'red'
                });
                d.canSee.forEach(cs => {
                    console.log('cs', cs)
                    var csElem = document.getElementById(`elem-${cs.point.id}`)
                    csElem.style.color = 'green'
                });
                newElem.style.color = 'blue'
                var coords = document.getElementById('coordinates');
                coords.innerText = `x: ${d.x}, y: ${d.y}, canSee: ${d.canSee.length}`;
            })
            newElem.addEventListener('mouseleave', (ev) => {
                var astroids = document.querySelectorAll('.astroid');
                [].forEach.call(astroids, ast => {
                    ast.style.color = 'initial'
                })
                var coords = document.getElementById('coordinates');
                coords.innerText = `x: NaN, y: NaN, canSee: NaN`;
            })
        }
        grid.appendChild(newElem)
    })
    mainElem.appendChild(thisPoint)
    mainElem.appendChild(grid);

}

const test = `.#..#
.....
#####
....#
...##`;

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
test2Answer.display();

let tests = [test, test2, test3, test4, test5];

// tests.forEach(t => {
//     t.diags = new diagonals(t);
//     console.log('---------------')
// })