import { Day } from '../Util.js';

console.clear();

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);

        // **** Part 1 *** //
        // this.part1(this.data);

        // *** Part 2 *** //
        this.part2(this.data);

    }

    part1(data) {
        let pairs = data.map(d => {
            let pair = d.split(',');
            let elf1 = pair[0].split('-').map(p => +p);
            let elf2 = pair[1].split('-').map(p => +p);

            let contains = this.fullyContains({ elf1, elf2 });

            return { elf1, elf2, contains };
        });

        console.log('pairs', pairs);
        console.log('how many', pairs.filter(d => d.contains).length);
    }

    fullyContains({ elf1, elf2 }) {
        let contains = false;

        if (elf1[0] <= elf2[0] && elf1[1] >= elf2[1]) {
            contains = true;
        }
        if (elf2[0] <= elf1[0] && elf2[1] >= elf1[1]) {
            contains = true
        }

        return contains;
    }

    part2(data) {
        let pairs = data.map(d => {
            let pair = d.split(',');
            let elf1 = pair[0].split('-').map(p => +p);
            let elf2 = pair[1].split('-').map(p => +p);

            let overlap = this.overlap({ elf1, elf2 });

            return { elf1, elf2, overlap };
        });

        console.log(pairs.filter(d => d.overlap).length);
    }

    overlap({ elf1, elf2 }) {
        let expanded =[ this.expandArray(elf1[0], elf1[1]), this.expandArray(elf2[0], elf2[1])].sort((a,b) => b.length - a.length);
        
        let overlap = expanded[0].reduce((a,c) => expanded[1].includes(c) ? c : a, '');

        return overlap !== '';
    }

    expandArray(start,end) {
        return Array((end - start) + 1).fill(start).map((d,i) => d + i);
    }
}