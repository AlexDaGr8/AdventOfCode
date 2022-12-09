import { Day } from '../Util.js';

console.clear();

export class Part1 extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);

        let elves = [];

        this.data.reduce((a,c,i,arr) => {
            if (c === '') {
                let slc = arr.slice(a,i);
                a = i + 1;

                let elf = {
                    id: 'elf-' + 'elves.length + 1',
                    snacks: slc,
                    total: slc.reduce((a,c) => a + (+c), 0)
                }
                elves.push(elf);
            } 

            if (i === arr.length - 1 && c !== '') {
                let diff = (i - a) + 1;
                let slc = arr.slice(-diff);
                let elf = {
                    id: 'elf-' + 'elves.length + 1',
                    snacks: slc,
                    total: slc.reduce((a,c) => a + (+c), 0)
                }
                elves.push(elf);
            }
            return a;
        }, 0)

        console.log(elves);

        let maxCals = Math.max(...elves.map(d => d.total));

        console.log(maxCals)

        let topThree = elves.sort((a,b) => b.total - a.total).slice(0,3);
        let topThreeSum = topThree.reduce((a,c) => a + c.total, 0);
        
        console.log(topThree)
        console.log(topThreeSum)
    }
}