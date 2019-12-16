const test = `.#..#
.....
#####
....#
...##`;


function diagonals(input) {
    this.input = input.split('\n').map((d,i) => {
        return d.split('').map((g,j) => { 
            return {
                astroid: g !== '.',
                x: j,
                y: i,
                canSee: [],
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
}

diagonals.prototype.getAllSlopes = function(point) {
    for (var i = 0; i < this.input.length; i++) {
        for (var j = 0; j < this.input[0].length; j++) {
            let testPoint = this.input[i][j];
            if (testPoint.astroid) {
                let slope = this.getSlope(point, testPoint);
                console.log('point', point)
                console.log('slope', slope)
                let slopeExists = point.canSee.some(d => Object.is(d.slope, slope));
                if (slopeExists) {
                    let filterSlope = point.canSee.filter(d => d.slope === slope);
                    console.log('filterSlope', filterSlope);
                }
                if (!Number.isNaN(slope) && !slopeExists) {
                    point.canSee.push({slope: slope, point: testPoint})
                }
            }
        }
    }
    return point.canSee;
}

diagonals.prototype.getSlope = function(point1, point2) {
    console.log('point1', point1);
    console.log('point2', point2);
    return (point2.y - point1.y) / (point2.x - point1.x);
}
let testDiags = new diagonals(test);
