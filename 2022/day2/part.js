import { Day } from '../Util.js';

console.clear();

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
        this.win = 6;
        this.draw = 3;
        this.lose = 0;
        this.rock = {
            opp: 'A',
            mine: 'X',
            value: 1,
            C: this.win,
            B: this.lose,
            A: this.draw,
            X: () => this.lose + this.scissors.value,
            Y: () => this.draw + this.rock.value,
            Z: () => this.win + this.paper.value
        }
        this.paper = {
            opp: 'B',
            mine: 'Y',
            value: 2,
            A: this.win,
            C: this.lose,
            B: this.draw,
            X: () => this.lose + this.rock.value,
            Y: () => this.draw + this.paper.value,
            Z: () => this.win + this.scissors.value
        }
        this.scissors = {
            opp: 'C',
            mine: 'Z',
            value: 3,
            B: this.win,
            A: this.lose,
            C: this.draw,
            X: () => this.lose + this.paper.value,
            Y: () => this.draw + this.scissors.value,
            Z: () => this.win + this.rock.value
        }
        this.rps = [ this.rock, this.paper, this.scissors ];
    }

    render() {
        console.log(this.data);
        const rounds = this.data.map(d => ({ throws: d.split(' ') }));

        // **** Part 1 *** //
        // this.part1(rounds);

        // *** Part 2 *** //
        this.part2(rounds);

    }

    part1(rounds) {
        rounds.forEach(round => {
            let choice = this.rps.find(d => d.mine === round.throws[1]);
            round.total = choice.value + choice[round.throws[0]];
        });

        console.log(rounds);

        let totalRounds = rounds.reduce((a,c) => a + c.total, 0);

        console.log(totalRounds)
    }

    part2(rounds) {
        rounds.forEach(round => {
            let theirs = this.rps.find(d => d.opp === round.throws[0]);
            round.total = theirs[round.throws[1]]();
        });

        console.log(rounds);
        
        let totalRounds = rounds.reduce((a,c) => a + c.total, 0);

        console.log(totalRounds)
    }
}