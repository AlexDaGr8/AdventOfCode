import { Day } from '../Util.js';

console.clear();

class Tree {
    constructor(x,y,v,s) {
        this.x = x;
        this.y = y;
        this.visible = v;
        this.size = s
    }

    get isVisible() {
        return  Object.keys(this.visible).some(key => this.visible[key] === 1);
    }

    get scenicScore() {
        return Object.keys(this.visible).reduce((a,c) => a *= this.visible[c], 1);
    }
}

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);

        this.generateTrees(this.data);

        // **** Part 1 *** //
        // this.part1(this.data);

        // *** Part 2 *** //
        this.part2(this.data);

    }

    generateTrees(data) {
        data = data.map(d => d.split('').map(s => +s));
        this.columns = data[0].length;
        this.rows = data.length;
        this.trees = [];

        for (let row in data) {
            for (let col in data[0]) {
                let value = data[row][col]
                let vis = {
                    top: 1,
                    right: 1,
                    bottom: 1,
                    left: 1
                };
                this.trees.push(new Tree(+col,+row,vis,value))
            } 
        }
    }

    part1(data) {
        this.checkVisible();

        let numberVisible = this.trees.filter(d => d.isVisible).length;

        console.log('numberVisible', numberVisible);
    }

    checkVisible() {
        for (let tree of this.trees) {
            if (tree.x > 0 && tree.x < this.rows - 1 &&
                tree.y > 0 && tree.y < this.columns - 1
                ) {
                this.checkRows(tree);
                this.checkColumns(tree);
            }
        }
    }

    checkRows(tree) {
        let rowsAbove = this.trees.filter(t => t.x === tree.x && t.y < tree.y);
        let rowsBelow = this.trees.filter(t => t.x === tree.x && t.y > tree.y);

        if (rowsAbove.some(ra => ra.size >= tree.size)) {
            tree.visible.top = 0;
        }
        if (rowsBelow.some(ra => ra.size >= tree.size)) {
            tree.visible.bottom = 0;
        }
    }
    checkColumns(tree) {
        let columnsLeft = this.trees.filter(t => t.x < tree.x && t.y === tree.y);
        let columnsRight = this.trees.filter(t => t.x > tree.x && t.y === tree.y);

        if (columnsLeft.some(ra => ra.size >= tree.size)) {
            tree.visible.left = 0;
        }
        if (columnsRight.some(ra => ra.size >= tree.size)) {
            tree.visible.right = 0;
        }
    }

    part2() {
        for (let tree of this.trees) {
            this.numTreesVisible(tree);
        }

        console.log('trees', this.trees);

        let highestScenicScore = this.trees.reduce((a,c) => c.scenicScore > a ? c.scenicScore : a, 0);

        console.log('highestScenicScore', highestScenicScore);
    }

    numTreesVisible(tree) {
        let rowsAbove = this.trees.filter(t => t.x === tree.x && t.y < tree.y);
        let rowsBelow = this.trees.filter(t => t.x === tree.x && t.y > tree.y);
        let columnsLeft = this.trees.filter(t => t.x < tree.x && t.y === tree.y);
        let columnsRight = this.trees.filter(t => t.x > tree.x && t.y === tree.y);

        if (rowsAbove.length > 0) {
            let index = rowsAbove.reverse().findIndex(r => r.size >= tree.size);
            tree.visible.top = index < 0 ? rowsAbove.length : index + 1;
        } else {
            tree.visible.top = 0;
        }
        if (rowsBelow.length > 0) {
            let index = rowsBelow.findIndex(r => r.size >= tree.size);
            tree.visible.bottom = index < 0 ? rowsBelow.length : index + 1;
        } else {
            tree.visible.bottom = 0;
        }
        if (columnsLeft.length > 0) {
            let index = columnsLeft.reverse().findIndex(r => r.size >= tree.size);
            tree.visible.left = index < 0 ? columnsLeft.length : index + 1;
        } else {
            tree.visible.left = 0;
        }
        if (columnsRight.length > 0) {
            let index = columnsRight.findIndex(r => r.size >= tree.size);
            tree.visible.right = index < 0 ? columnsRight.length : index + 1;
        } else {
            tree.visible.right = 0;
        }
    }
}