import { Day } from '../Util.js';

console.clear();

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);


        const shortData = ['noop', 'addx 3', 'addx -5'];

        // **** Part 1 *** //
        // this.part1(this.data);

        // *** Part 2 *** //
        this.sprite = Array(40).fill('.');
        this.CRT = Array(6).fill(Array(40).fill('.'));

        this.part2(this.data);

    }

    part1(data) {
        let commands = data.map(d => ({
            command: d.split(' ')[0],
            value: isNaN(+d.split(' ')[1]) ? 0 : +d.split(' ')[1],
            cycleCount: 1,
            end: false
        }));
        let i = 1;
        let nextCommand = 0;
        let X = 1;
        let signalStrength = [
            {
                cycleCount: 20,
                value: 0,
                x: 0,
            },
            {
                cycleCount: 60,
                value: 0,
                x: 0
            },
            {
                cycleCount: 100,
                value: 0,
                x: 0
            },
            {
                cycleCount: 140,
                value: 0,
                x: 0
            },
            {
                cycleCount: 180,
                value: 0,
                x: 0
            },
            {
                cycleCount: 220,
                value: 0,
                x: 0
            },
        ]
        
        console.log('commands', commands)

        while (i !== -1) {
            console.log('cycleCount', i);
            console.log('command', commands[nextCommand]);
            
            this.startCycle(commands[nextCommand], X);

            this.endCycle(commands[nextCommand])

            // during cycle
            console.log(commands[nextCommand]);

            let findSignal = signalStrength.find(ss => ss.cycleCount === i);
    
            if (findSignal) {
                findSignal.value = X * i;
                findSignal.x = X;
            }

            // finish cycle
            if (commands[nextCommand].end) {
                console.log('command end', commands[nextCommand]);

                X = X + commands[nextCommand].value;

                nextCommand++;

            }

            console.log('end X', X)

            if (nextCommand === commands.length) {
                break;
            }

            i++;
        }

        console.log('sum of strength', signalStrength.reduce((a,c) => a += c.value, 0));

        console.log('done', signalStrength);
    }

    startCycle(command, x) {
        command.began = true;

        console.log('start x', x)
    }
    
    endCycle(command, x) {
        if (command.command === 'noop') {
            command.began = false;
            command.end = true;
        } else {
            if (!command.end) {
                if (command.cycleCount === 2) {
                    command.end = true;
                } else {
                    command.cycleCount++;
                }
            }
        }
    }

    part2(data) {
        let commands = data.map(d => ({
            command: d.split(' ')[0],
            value: isNaN(+d.split(' ')[1]) ? 0 : +d.split(' ')[1],
            cycleCount: 1,
            end: false
        }));
        let i = 1;
        let nextCommand = 0;
        let X = 1;

        this.currentRow = 0;

        this.updateSprite(X);

        while (i !== -1) {
            console.log('cycleCount', i);

            console.log('cycleCount % 40', (i - 1) % 40);

            console.log('current X', X)

            let currentPixelUpdating = this.CRT[this.currentRow].map((d,j) => {
                if (j === (i - 1)) {
                    return 'O'
                } 
                return d;
            }).join('')

            console.log('currentRow before', currentPixelUpdating);

            console.log('sprite', this.sprite.join(''));

            this.drawPixel((i - 1) % 40);

            console.log('currentRow after', this.CRT[this.currentRow].join(''));


            if (i % 40 === 0) {
                this.currentRow++;
            }

            // finish cycle
            this.endCycle(commands[nextCommand]);

            if (commands[nextCommand].end) {
                console.log('command end', commands[nextCommand]);

                X = X + commands[nextCommand].value;

                nextCommand++;

            }

            this.updateSprite(X);

            if (nextCommand === commands.length) {
                break;
            }

            i++;
        }
        console.log(this.CRT.map(d => d.join('')).join('\n'));

        
    }

    updateSprite(x) {
        this.sprite = this.sprite.map((d,i) => {
            if (i === x - 1 || i === x || i === x + 1) {
                return '#';
            }
            return '.';
        })
    }

    drawPixel(position) {
        this.CRT[this.currentRow] = this.CRT[this.currentRow].map((d,i) => {
            let findSpritePosition = this.sprite[position];

            console.log('findSpritePosition', findSpritePosition);

            if (i === position) {
                return findSpritePosition;
            }

            return d;
        });
    }
}