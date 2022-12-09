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
        let input = data[0].split('');
        let marker = [];
        let markerAfter = -1;
        let countCheck = 4

        for (let i in input) {
            if (marker.length > (countCheck - 1)) {
                if (this.checkUnique(marker, countCheck)) {
                    markerAfter = i;
                    break;
                }
                marker.shift();
                marker.push(input[i])
            } else {
                marker.push(input[i]);
            }
        }

        console.log('result', marker.join(''))
        console.log('markerAfter', markerAfter)
    }

    checkUnique(data, amount) {
        let u = [...new Set(data)];

        return u.length === amount;
    }

    part2(data) {
        let input = data[0].split('');
        let marker = [];
        let markerAfter = -1;
        let countCheck = 14

        for (let i in input) {
            if (marker.length > (countCheck - 1)) {
                if (this.checkUnique(marker, countCheck)) {
                    markerAfter = i;
                    break;
                }
                marker.shift();
                marker.push(input[i])
            } else {
                marker.push(input[i]);
            }
        }

        console.log('result', marker.join(''))
        console.log('markerAfter', markerAfter)
    }
}