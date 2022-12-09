import { Day } from '../Util.js';

console.clear();

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
        this.priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    render() {
        console.log(this.data);

        // **** Part 1 *** //
        // this.part1(this.data);

        // *** Part 2 *** //
        this.part2(this.data);

    }

    part1(data) {
        let rucksacks = data.map(d => {
            let result = {};
            let half = (d.length) / 2;

            result.compartments = [d.slice(0,half), d.slice(half)];

            let foundLetter = this.findCommonItem(result.compartments);

            result.priority = this.priorities.indexOf(foundLetter) + 1;

            return result;
        });

        console.log('rucksacks', rucksacks);

        console.log('sum of prioritys', rucksacks.reduce((a,c) => a + c.priority, 0));
    }

    part2(data) {
        let groupSize = 3;
        let groups = [];

        for (let i = 0; i < data.length - 1; i += groupSize) {
            groups.push(data.slice(i,i + groupSize));
        }

        groups.map(group => {
            let badgeLetter = this.findCommonItemThreeBags(group);

            group.priority = this.priorities.indexOf(badgeLetter) + 1;

            return group;
        });

        console.log(groups.reduce((a,c) => a += c.priority, 0));
    }

    findCommonItem(compartments) { 
        return compartments[0].split('').reduce((a,c) => compartments[1].includes(c) ? c : a, '');
    }

    findCommonItemThreeBags(group) { 
        let sorted = group.sort((a,b) => b.length - a.length);

        return sorted[0].split('').reduce((a,c) => sorted[1].includes(c) && sorted[2].includes(c) ? c : a, '');
    }

}