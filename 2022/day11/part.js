import { Day } from '../Util.js';

console.clear();

class Monkey {
    constructor(monkeyId, items, operation, test) {
        this.monkeyId = monkeyId;
        this.items = items;
        this.operation = operation;
        this.test = test;
        this.inspections = 0;
    }

    operate(worryLevel, superModulo) {
        let value =  this.operation.value === 'old' ? worryLevel : this.operation.value
        let newWorryLevel = eval(worryLevel + this.operation.operator + value);

        this.inspections++;

        if (superModulo) {
            return newWorryLevel % superModulo;
        }

        return Math.floor(newWorryLevel);
    }

    doTest(worryLevel) {
        let testWorry = worryLevel % this.test.value;

        if (testWorry === 0) {
            return this.test.true;
        }

        return this.test.false;
    }
}

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);

        this.monkeys = [];

        this.getMonkeys();

        // **** Part 1 *** //
        this.part1(this.monkeys);

        // *** Part 2 *** //
        // this.part2(this.data);

    }

    getMonkeys() {
        for (let i in this.data) {
            i = +i;
            if (this.data[i].match(/Monkey \d:/g)) {
                let monkeyId = this.data[i].match(/Monkey \d/g)[0].split(' ').join('');
                let items = this.data[i + 1].match(/\d+/g).map(d => +d);
                let operation = {
                    operator: this.data[i + 2].match(/[*+]/g)[0],
                    value: this.data[i + 2].match(/\d+/g) ? this.data[i + 2].match(/\d+/g)[0] : 'old'
                };
                let test = {
                    value: +this.data[i + 3].match(/\d+/g)[0],
                    'true': +this.data[i + 4].match(/\d+/g)[0],
                    'false': +this.data[i + 5].match(/\d+/g)[0]
                }
                
                this.monkeys.push(new Monkey(monkeyId, items, operation, test));
            }
        }
    }

    logMonkeys(i) {
        console.group(`%cRound ${i}`, 'color:yellow')
        for (let monkey of this.monkeys) {
            console.log(`---- ${monkey.monkeyId}: ${monkey.inspections}`);
            console.log('items', monkey.items);
        }
        console.groupEnd()
    }

    part1(data) {
        console.log(this.monkeys)

        let rounds = 10000;

        for (let i = 0; i < rounds; i++) {
            for (let m in this.monkeys) {
                if (this.monkeys[m].items.length > 0) {
                    while (this.monkeys[m].items.length > 0) {
                        let worryLevel = this.monkeys[m].items.shift();
        
                        let superModulo = this.monkeys.reduce((a,c) => a * c.test.value, 1);
                        worryLevel = this.monkeys[m].operate(worryLevel, superModulo);
        
                        let newMonkey = this.monkeys[m].doTest(worryLevel);

                        this.monkeys[newMonkey].items.push(worryLevel);
                    }
                } 
            }

            // this.logMonkeys(i + 1);
        }

        console.log(this.monkeys)

        let mostActive = this.monkeys.sort((a,b) => b.inspections - a.inspections);

        console.log('monkey business', this.monkeys.slice(0,2).reduce((a,c) => a * c.inspections, 1));
    }

    part2(data) {
        
    }
}