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

    getBoard(data) {
        let input = data.map(d => d.split(''));
        let lastElem = input.splice(-1)[0].slice(-2).shift();
        let stacks = {};

        for (let s = 0; s < lastElem; s++) {
            stacks[s + 1] = []
        }

        for (let inp of input) {
            let stackNum = 1;
            for (let i = 1; i < input[0].length - 1; i += 4) {
                if (inp[i] !== ' ') {
                    stacks[stackNum].unshift(inp[i]);
                }
                stackNum++;
            }
        }
        
        return stacks;
    }

    getMoves(data) {
        let moves = data.map(d => {
            let digits = d.match(/\d+/g).map(d => +d);

            return {
                move: digits[0],
                from: digits[1],
                to: digits[2],
                digits
            }
        });

        return moves;
    }

    part1(data) {
        let emptyIndex = data.findIndex(d => d === '');

        let board = this.getBoard(data.slice(0,emptyIndex));
        let moves = this.getMoves(data.slice(emptyIndex + 1));

        console.log('board', board);
        console.log('moves', moves);

        for (let move of moves) {
            console.log('move', move)
            for (let m = 0; m < move.move; m++) {
                let moveValue = board[move.from].pop();

                board[move.to].push(moveValue);
            }
        }

        let finalStr = Object.keys(board).reduce((a,c) => a += board[c].pop(), '');

        console.log(finalStr);
    }

    part2(data) {
        let emptyIndex = data.findIndex(d => d === '');

        let board = this.getBoard(data.slice(0,emptyIndex));
        let moves = this.getMoves(data.slice(emptyIndex + 1));

        console.log('board', board);
        console.log('moves', moves);

        for (let move of moves) {
            console.log('move', move)
            let moveValue = board[move.from].splice(-move.move);

            console.log('moveValue', moveValue)

            board[move.to] = board[move.to].concat(moveValue);

            Object.keys(board).forEach(d => console.log(board[d].slice()))
        }

        let finalStr = Object.keys(board).reduce((a,c) => a += board[c].pop(), '');

        console.log(finalStr);
    }
}