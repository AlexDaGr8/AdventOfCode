import { Day } from '../Util.js';

console.clear();

class Knot {
    target = {...{ x: 55, y: 23 }, history: [{ x: 55, y: 23 }]};
    knot = undefined;
    constructor(id, handler) {
        this.id = id;
        this.knot = new Proxy(this.target, handler);
    }

    moveKnot(previous) {
        let xDif = previous.knot.x - this.knot.x;
        let newX = this.knot.x;
        let yDif = previous.knot.y - this.knot.y;
        let newY = this.knot.y;


        if (Math.abs(xDif) > 0) {
            newX = this.knot.x + Math.sign(xDif);
        }
        if (Math.abs(yDif) > 0) {
            newY = this.knot.y + Math.sign(yDif);
        }

        this.knot.x = newX;
        this.knot.y = newY;
    }

    moveDiagonal(previous) {
        let lastLocation = previous.knot.history.slice(-1)[0];
        if (previous.id > 0) {
            lastLocation = previous.knot;
        }

        let isUp = (lastLocation.y - this.knot.y) > 0;
        let isRight = (lastLocation.x - this.knot.x) > 0;

        this.knot.x = isRight ? this.knot.x + 1 : this.knot.x - 1;
        this.knot.y = isUp ? this.knot.y + 1 : this.knot.y - 1;
    }

    moveHead(direction) {
        switch(direction) {
            case 'R':
                this.knot.x = this.knot.x + 1;
                break;
            case 'L':
                this.knot.x = this.knot.x - 1;
                break;
            case 'U':
                this.knot.y = this.knot.y + 1;
                break;
            case 'D':
                this.knot.y = this.knot.y - 1;
                break;
        }
    }

    log() {
        console.log(`head(${this.id}) x: ${this.knot.x}, y: ${this.knot.y}`);
    }
}

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);

        // this.showResult();

        // **** Part 1 *** //
        // this.part1(this.data);

        // *** Part 2 *** //
        this.part2(this.data);

    }

    part1(data) {
        this.margin = { top: 20, right: 20, bottom: 20, left: 50 };
        this.width = document.body.clientWidth - this.margin.right - this.margin.left;
        this.height = document.body.clientHeight - this.margin.top - this.margin.bottom;
        this.svg = d3.select('body').append('svg')
            .attr('width', this.width + this.margin.right + this.margin.left)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.board = Array(100).fill(Array(100).fill('.'));
        this.start = { x: 0, y: 0 };
        this.head = new Proxy({ ...this.start, history: [this.start]}, {
            set(obj, prop, value) {
                obj['history'].push({
                    x: obj.x,
                    y: obj.y
                });

                obj[prop] = value;

                return true;
            }
        });
        this.tail = new Proxy({ ...this.start, history: [this.start]}, {
            set(obj, prop, value) {
                obj[prop] = value;

                if (prop === 'y') {
                    obj['history'].push({
                        x: obj.x,
                        y: obj.y
                    });
                }
            
                return true;
            }
        });


        this.x = d3.scaleLinear()
            .domain(d3.extent(this.tail.history, d => d.x))
            .range([0, this.width])
        this.y = d3.scaleLinear()
            .domain(d3.extent(this.tail.history, d => d.y))
            .range([this.height, 0])

        this.xAxis = this.svg.append('g')
            .attr('transform', `translate(0, ${this.y(0)})`)
            .call(d3.axisBottom(this.x));
        this.yAxis = this.svg.append('g')
            .attr('transform', `translate(${this.x(0)}, 0)`)
            .call(d3.axisLeft(this.y));
        // this.line = d3.line()
        //     .x(d => this.x(d.x))
        //     .y(d => this.y(d.y));
        // this.linePath = this.svg.append('path')
        //     .attr('d', this.line(this.tail.history))
        //     .attr('fill', 'none')
        //     .attr('stroke', 'steelblue');
        const moves = data.map(d => {
            let split = d.split(' ');
            return {
                direction: split[0],
                steps: +split[1]
            }
        });

        console.log('moves', moves)

        let finalBoard = [];

        for (let move of moves) {
            // this.showMove(move);
            for (let s in Array(move.steps).fill(1)) {
                this.moveHead(move.direction);

                if (this.getDistance(this.head, this.tail) > 1.5) {
                    this.moveTail();
                } 

                // finalBoard = this.showResult();
            }
        }

        console.log(this.head.history);

        console.log(this.tail.history);

        let unique = [...new Set(this.tail.history.map(h => `x:${h.x},y:${h.y}`))]

        console.log('unique', unique.length);

        this.drawChart();
    }

    drawChart() {
        this.x.domain(d3.extent(this.head.history, d => d.x))
        this.y.domain(d3.extent(this.head.history, d => d.y))

        this.xAxis
            .attr('transform', `translate(0, ${this.y(0)})`)
            .call(d3.axisBottom(this.x));
        this.yAxis
            .attr('transform', `translate(${this.x(0)}, 0)`)
            .call(d3.axisLeft(this.y));

        this.svg.selectAll('circle.path')
            .data(this.tail.history)
            .join(
                enter => enter.append('circle')
                    .attr('class', 'path')
                    .attr('fill', 'steelblue')
                    .attr('cx', d => this.x(0))
                    .attr('cy', d => this.y(0))
                    .transition()
                    .delay((d,i) => 10*i)
                    .duration(300)
                    .attr('r', 1)
                    .attr('cx', d => this.x(d.x))
                    .attr('cy', d => this.y(d.y)),
                update => update
                    .transition()
                    .attr('fill', 'green')
                    .attr('r', 1)
                    .attr('cx', d => this.x(d.x))
                    .attr('cy', d => this.y(d.y)),
                exit => exit.remove()
            )

        // this.svg.selectAll('circle.head')
        //     .data(this.head.history)
        //     .join(
        //         enter => enter.append('circle')
        //             .attr('class', 'head')
        //             .transition()
        //             .delay((d,i) => 400*i)
        //             .attr('r', 0)
        //             .attr('fill', 'steelblue')
        //             .attr('cx', d => this.x(d.x))
        //             .attr('cy', d => this.y(d.y))
        //             .transition()
        //             .delay((d,i) => 200*i)
        //             .attr('r', 5)
        //             .transition()
        //             .attr('r', 0),
        //         update => update
        //             .transition()
        //             .attr('fill', 'green')
        //             .attr('r', 5)
        //             .attr('cx', d => this.x(d.x))
        //             .attr('cy', d => this.y(d.y)),
        //         exit => exit.remove()
        //     )
        
        
        // this.svg.selectAll('circle.head')
        //     .data(this.tea.history)
        //     .join(
        //         enter => enter.append('circle')
        //             .attr('class', 'head')
        //             .transition()
        //             .delay((d,i) => 400*i)
        //             .attr('r', 0)
        //             .attr('fill', 'steelblue')
        //             .attr('cx', d => this.x(d.x))
        //             .attr('cy', d => this.y(d.y))
        //             .transition()
        //             .delay((d,i) => 200*i)
        //             .attr('r', 5)
        //             .transition()
        //             .attr('r', 0),
        //         update => update
        //             .transition()
        //             .attr('fill', 'green')
        //             .attr('r', 5)
        //             .attr('cx', d => this.x(d.x))
        //             .attr('cy', d => this.y(d.y)),
        //         exit => exit.remove()
        //     )

        // this.linePath.attr('d', this.line(this.tail.history))
    }

    showResult() {
        let result = document.createElement('div');

        let newBoard = this.board.map((r,i) => {
            return r.map((c,j) => {
                if (j === this.head.x && i === this.head.y) {
                    return 'H'
                }
                if (j === this.tail.x && i === this.tail.y) {
                    return 'T'
                }
                if (j === this.start.x && i === this.start.y) {
                    return 's'
                }
                if (this.tail.history.find(t => t.x === j && t.y === i)) {
                    return '#'
                }
                return c;
            });
        });

        result.innerText = newBoard.map(r => r.join('\t')).join('\n') + '\n\n';

        document.body.appendChild(result);
    }

    showMove(move) {
        let moveEl = document.createElement('div');

        moveEl.innerText = `--- ${move.direction} ${move.steps} ---- \n`;

        document.body.appendChild(moveEl);
    } 

    moveHead(direction) {
        switch(direction) {
            case 'R':
                this.head.x++;
                break;
            case 'L':
                this.head.x--;
                break;
            case 'U':
                this.head.y++;
                break;
            case 'D':
                this.head.y--;
                break;
        }
    }

    moveTail() {
        let previousHead = this.head.history.slice(-1)[0];

        this.tail.x = previousHead.x;
        this.tail.y = previousHead.y;
    }

    getDistance(head, tail) {
        let xSqrd = Math.pow((tail.x - head.x), 2);
        let ySqrd = Math.pow((tail.y - head.y), 2);
        return Math.sqrt(xSqrd + ySqrd);
    }

    part2(data) {
        console.log("/// part2 \\\\\\");

        this.resultDiv = document.createElement('div');
        this.resultDiv.id = 'result';

        this.moveEl = document.createElement('div');
        this.moveEl.id = 'move';
        this.moveEl.innerHTML = `---- <span id="direction"></span> <span id="step"></span> ----`

        document.body.appendChild(this.moveEl);
        document.body.appendChild(this.resultDiv);


        this.direction = document.getElementById('direction');

        this.step = document.getElementById('step');


        const moves = data.map(d => {
            let split = d.split(' ');
            return {
                direction: split[0],
                steps: +split[1]
            }
        });
        const headHandler = {
            set(obj, prop, value) {
                obj['history'].push({
                    x: obj.x,
                    y: obj.y
                });

                obj[prop] = value;

                return true;
            }
        };
        const handler = {
            set(obj, prop, value) {
                obj[prop] = value;

                if (prop === 'y') {
                    obj['history'].push({
                        x: obj.x,
                        y: obj.y
                    });
                }
            
                return true;
            }
        }
        const knots = [new Knot(0, headHandler)];
        const numKnots = 10;
        
        for (let i = 1; i < numKnots; i++) {
            knots.push(new Knot(i, handler))
        }

        let delay = 0;
        
        for (let move of moves) {
            this.updateDirection(move.direction, delay);

            // console.log(`%c#### move direction ${move.direction} ####`, 'color: yellow')
            for (let s in Array(move.steps).fill(1)) {
                // console.log(`%c## move step ${s} ##`, 'color: pink')
                knots[0].moveHead(move.direction);
                
                // knots[0].log();

                for (let i = 1; i < numKnots; i++) {
                    let distance = this.getDistance(knots[i - 1].knot, knots[i].knot)
                    
                    if (distance > 1.5) {
                        if ((distance - Math.floor(distance)) !== 0) {
                            knots[i].moveDiagonal(knots[i - 1])
                        } else {
                            knots[i].moveKnot(knots[i - 1]);
                        }

                        // knots[i].log();
                    } 
                }

                this.buildBoard(knots, s, delay++);
            }
        }

        let headMax = {
            x: Math.max(...knots[0].knot.history.map(d => d.x)),
            y: Math.max(...knots[0].knot.history.map(d => d.y)),
        }
        let headMin = {
            x: Math.min(...knots[0].knot.history.map(d => d.x)),
            y: Math.min(...knots[0].knot.history.map(d => d.y)),
        }
        let columns = headMax.x - headMin.x;
        let rows = headMax.y - headMin.y;

        console.log('headMax', headMax);    
        console.log('headMin', headMin);   
        console.log('columns', columns); 
        console.log('rows', rows);

        let unique = [...new Set(knots[knots.length - 1].knot.history.map(h => `x:${h.x},y:${h.y}`))]

        console.log('unique', unique.length);
        
    }
    
    updateDirection(direction, delay) {
        setTimeout(() => {
            this.direction.innerText = direction;
        }, 300 * delay);
    }

    updateStep(step, delay) {
        setTimeout(() => {
            this.step.innerText = step;
        }, 300 * delay);
    }

    buildBoard(data, step, delay) {
        this.updateStep(step, delay);

        let board = [];
        for (let r = 0; r < 190; r++) {
            board.push([]);
            for (let c = 0; c < 301; c++) {
                let find = data.find(d => d.knot.x === c && d.knot.y === r);
                let findHistory = data[data.length - 1].knot.history.find(d => d.x === c && d.y === r);

                if (find) {
                    board[r].push(find.id);
                } else if (findHistory) {
                    board[r].push('#');
                } else {
                    board[r].push('.')
                }
            }
        }

        setTimeout(() => {
            this.resultDiv.innerText = board.map(r => r.join('\t')).join('\n') + '\n\n';
        }, 300 * delay);

        // console.log('board', board);

        // let stepEl = document.createElement('div');
    
        // stepEl.innerText = `--- step ${step} ---`;
    
        // document.body.appendChild(stepEl);

        // let result = document.createElement('div');
    
        // result.innerText = board.map(r => r.join('\t')).join('\n') + '\n\n';
    
        // document.body.appendChild(result);
    }
}