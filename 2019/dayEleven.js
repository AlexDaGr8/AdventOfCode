const input = `3,8,1005,8,319,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,1002,8,1,28,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,51,2,1008,18,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,77,1,1006,8,10,1006,0,88,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,106,1006,0,47,2,5,0,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,135,2,105,3,10,2,1101,6,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,165,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1002,8,1,186,1,1009,11,10,1,9,3,10,2,1003,10,10,1,107,11,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,225,1006,0,25,1,1009,14,10,1,1008,3,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,1002,8,1,257,1,1006,2,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,101,0,8,284,2,1004,7,10,1006,0,41,2,1106,17,10,1,104,3,10,101,1,9,9,1007,9,919,10,1005,10,15,99,109,641,104,0,104,1,21101,0,937108545948,1,21102,1,336,0,1105,1,440,21102,1,386577203612,1,21102,347,1,0,1105,1,440,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,21478178819,1,21102,1,394,0,1106,0,440,21102,21477985447,1,1,21101,405,0,0,1105,1,440,3,10,104,0,104,0,3,10,104,0,104,0,21101,984458351460,0,1,21101,428,0,0,1106,0,440,21101,709048034148,0,1,21102,439,1,0,1106,0,440,99,109,2,21201,-1,0,1,21101,0,40,2,21101,471,0,3,21102,461,1,0,1105,1,504,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,466,467,482,4,0,1001,466,1,466,108,4,466,10,1006,10,498,1101,0,0,466,109,-2,2105,1,0,0,109,4,2101,0,-1,503,1207,-3,0,10,1006,10,521,21101,0,0,-3,22102,1,-3,1,21201,-2,0,2,21102,1,1,3,21102,540,1,0,1106,0,545,109,-4,2105,1,0,109,5,1207,-3,1,10,1006,10,568,2207,-4,-2,10,1006,10,568,22101,0,-4,-4,1105,1,636,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21102,587,1,0,1106,0,545,21202,1,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,606,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,628,22101,0,-1,1,21101,628,0,0,105,1,503,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0`;

const dirEnum = { UP: 0, RIGHT: 1, DOWN: 2, LEFT: 3 };
const colorEnum = { BLACK: 0, WHITE: 1 };
const turnEnum = { LEFT: 0, RIGHT: 1 };

let Robot = function() {
    this.dir = dirEnum.UP;
    this.position = {
        x: 0,
        y: 0,
        color: colorEnum.BLACK
    };
    this.panel = [];
    this.moveAndPaint = (turn, color) => {
        this.updateCurrentPixel(color);
        switch (this.dir) {
            case dirEnum.UP: 
                this.position.x += turn ? 1 : -1;
                this.dir = turn ? dirEnum.RIGHT : dirEnum.LEFT;
                break;
            case dirEnum.RIGHT: 
                this.position.y += turn ? -1 : 1;
                this.dir = turn ? dirEnum.DOWN : dirEnum.UP;
                break;
            case dirEnum.DOWN: 
                this.position.x += turn ? -1 : 1;
                this.dir = turn ? dirEnum.LEFT : dirEnum.RIGHT;
                break;
            case dirEnum.LEFT: 
                this.position.y += turn ? 1 : -1;
                this.dir = turn ? dirEnum.UP : dirEnum.DOWN;
                break;
            default: 
                break;
        }
        return this.currentColor();
    };
    this.findCurrentPixel = () => this.panel.find(b => b.x === this.position.x && b.y === this.position.y);
    this.updateCurrentPixel = (color) => {
        if (this.findCurrentPixel() === undefined) {
            let newCoords = {
                x: this.position.x,
                y: this.position.y,
                color: color,
            }
            this.panel.push(newCoords);
        } else {
            this.findCurrentPixel().color = color;
        }
    }
    this.currentColor = () => {
        const findPosition = this.findCurrentPixel();
        if (findPosition === undefined) {
            let newCoords = {
                x: this.position.x,
                y: this.position.y,
                color: colorEnum.BLACK,
            }
            this.panel.push(newCoords);
            return newCoords.color;
        }
        return findPosition.color;
    }
}

let testMoving = [[1,0],[0,0],[1,0],[1,0],[0,1],[1,0],[1,0],[1,1]];
let robot = new Robot();



let computer = new optCode(input, 0, null, true);

let nextColor = null;
let finished = false;
while (!finished) {
    computer.run(computer.i);
    let instructions = [computer.output.slice()];
    computer.stop = false;
    computer.run(computer.i);
    instructions.push(computer.output.slice());
    computer.stop = false;
    const lastTwo = computer.output.slice(-2);
    computer.input = robot.moveAndPaint(lastTwo[1],lastTwo[0]);
    finished = computer.answer.finished;
    console.log(computer.output.slice())
    console.log('robot panel', robot.panel.slice())
}

console.log('robot', robot);

