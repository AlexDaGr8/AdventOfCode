import { Day } from '../Util.js';
import {interpolateBrBG} from "https://cdn.skypack.dev/d3-scale-chromatic@3";


console.clear();

class Node {
    constructor({x,y,elevation,value,name}) {
        this.x = x;
        this.y = y;
        this.elevation = elevation;
        this.name = name;
        this.head = !!elevation.match(/S/);
        this.tail = !!elevation.match(/E/);
        this.value = value;
        this.next = undefined;
        this.children = {};
        this.top = undefined;
        this.right = undefined;
        this.left = undefined;
        this.bottom = undefined;
        this.visited = false;
    }
}

export class Part extends Day {
    constructor(fileName) {
        super(fileName);

        this.part1Answer = [
            "0,19",
            "1,19",
            "2,19",
            "3,19",
            "4,19",
            "5,19",
            "6,19",
            "7,19",
            "8,19",
            "8,20",
            "8,21",
            "9,21",
            "10,21",
            "10,22",
            "10,23",
            "11,23",
            "12,23",
            "13,23",
            "14,23",
            "15,23",
            "16,23",
            "17,23",
            "17,24",
            "17,25",
            "17,26",
            "18,26",
            "19,26",
            "20,26",
            "21,26",
            "22,26",
            "23,26",
            "24,26",
            "24,27",
            "24,28",
            "24,29",
            "25,29",
            "26,29",
            "27,29",
            "28,29",
            "29,29",
            "30,29",
            "31,29",
            "32,29",
            "32,30",
            "32,31",
            "32,32",
            "33,32",
            "34,32",
            "35,32",
            "36,32",
            "37,32",
            "38,32",
            "39,32",
            "40,32",
            "41,32",
            "42,32",
            "43,32",
            "44,32",
            "45,32",
            "46,32",
            "47,32",
            "48,32",
            "49,32",
            "49,33",
            "50,33",
            "51,33",
            "52,33",
            "53,33",
            "53,34",
            "54,34",
            "54,35",
            "54,36",
            "54,37",
            "54,38",
            "54,39",
            "55,39",
            "56,39",
            "57,39",
            "58,39",
            "59,39",
            "60,39",
            "61,39",
            "62,39",
            "63,39",
            "64,39",
            "65,39",
            "65,38",
            "65,37",
            "66,37",
            "67,37",
            "67,36",
            "67,35",
            "67,34",
            "66,34",
            "65,34",
            "64,34",
            "64,35",
            "63,35",
            "62,35",
            "61,35",
            "60,35",
            "59,35",
            "59,34",
            "58,34",
            "57,34",
            "57,33",
            "56,33",
            "56,32",
            "55,32",
            "55,31",
            "54,31",
            "53,31",
            "53,30",
            "52,30",
            "51,30",
            "50,30",
            "49,30",
            "49,29",
            "48,29",
            "48,28",
            "47,28",
            "47,27",
            "47,26",
            "47,25",
            "47,24",
            "47,23",
            "47,22",
            "47,21",
            "47,20",
            "47,19",
            "47,18",
            "47,17",
            "47,16",
            "47,15",
            "47,14",
            "47,13",
            "47,12",
            "47,11",
            "48,11",
            "48,10",
            "49,10",
            "49,9",
            "50,9",
            "51,9",
            "51,8",
            "52,8",
            "53,8",
            "54,8",
            "55,8",
            "56,8",
            "57,8",
            "58,8",
            "59,8",
            "60,8",
            "61,8",
            "62,8",
            "63,8",
            "64,8",
            "65,8",
            "66,8",
            "67,8",
            "67,9",
            "68,9",
            "68,10",
            "68,11",
            "69,11",
            "69,12",
            "69,13",
            "69,14",
            "69,15",
            "70,15",
            "70,16",
            "71,16",
            "71,17",
            "71,18",
            "72,18",
            "72,19",
            "72,20",
            "72,21",
            "72,22",
            "72,23",
            "71,23",
            "71,24",
            "71,25",
            "70,25",
            "69,25",
            "69,26",
            "68,26",
            "67,26",
            "67,27",
            "66,27",
            "66,28",
            "65,28",
            "65,29",
            "65,30",
            "65,31",
            "64,31",
            "64,32",
            "63,32",
            "62,32",
            "61,32",
            "60,32",
            "59,32",
            "59,31",
            "58,31",
            "58,30",
            "57,30",
            "57,29",
            "56,29",
            "56,28",
            "55,28",
            "54,28",
            "53,28",
            "52,28",
            "51,28",
            "51,27",
            "50,27",
            "50,26",
            "49,26",
            "49,25",
            "49,24",
            "49,23",
            "49,22",
            "49,21",
            "50,21",
            "50,20",
            "50,19",
            "50,18",
            "50,17",
            "50,16",
            "50,15",
            "50,14",
            "50,13",
            "50,12",
            "51,12",
            "51,11",
            "52,11",
            "53,11",
            "54,11",
            "55,11",
            "56,11",
            "57,11",
            "58,11",
            "59,11",
            "60,11",
            "61,11",
            "62,11",
            "63,11",
            "64,11",
            "65,11",
            "66,11",
            "66,12",
            "66,13",
            "67,13",
            "67,14",
            "67,15",
            "67,16",
            "67,17",
            "68,17",
            "68,18",
            "69,18",
            "69,19",
            "69,20",
            "69,21",
            "69,22",
            "69,23",
            "68,23",
            "68,24",
            "67,24",
            "66,24",
            "65,24",
            "65,25",
            "64,25",
            "64,26",
            "64,27",
            "63,27",
            "63,28",
            "63,29",
            "62,29",
            "61,29",
            "60,29",
            "59,29",
            "59,28",
            "58,28",
            "58,27",
            "57,27",
            "57,26",
            "56,26",
            "55,26",
            "54,26",
            "53,26",
            "53,25",
            "52,25",
            "52,24",
            "52,23",
            "52,22",
            "52,21",
            "52,20",
            "53,20",
            "53,19",
            "53,18",
            "53,17",
            "53,16",
            "53,15",
            "53,14",
            "54,14",
            "55,14",
            "56,14",
            "57,14",
            "58,14",
            "59,14",
            "60,14",
            "61,14",
            "62,14",
            "63,14",
            "64,14",
            "64,15",
            "64,16",
            "64,17",
            "64,18",
            "65,18",
            "65,19",
            "66,19",
            "66,20",
            "66,21",
            "66,22",
            "65,22",
            "64,22",
            "64,23",
            "63,23",
            "62,23",
            "62,24",
            "62,25",
            "62,26",
            "61,26",
            "60,26",
            "59,26",
            "59,25",
            "58,25",
            "58,24",
            "58,23",
            "57,23",
            "56,23",
            "55,23",
            "55,22",
            "55,21",
            "56,21",
            "57,21",
            "58,21",
            "58,20"
          ].map(d => ({ x: d.split(',')[0], y: d.split(',')[1]}))
    }

    render() {
        console.log(this.data);

        this.paths = [];

        // **** Part 1 *** //
        this.part1(this.data);

        // *** Part 2 *** //
        // this.part2(this.data);

    }

    async part1(data) {
        this.map = data.map((d,i) => {
            return d.split('').map((r,j) => ({
                x: j,
                y: i,
                elevation: r,
                value: !!r.match(/S/) ? 0 : !!r.match(/E/) ? 25 : r.charCodeAt(0) - 97,
                name: `${j},${i}`,
                visited: false,
                isPath: false,
                answer: false
            }));
        });
        this.maxX = this.map[0].length;
        this.maxY = this.map.length;

        this.flatMap = this.map.flat();

        this.drawMap();

        let start = this.flatMap.find(d => d.elevation.match(/S/));
        let end = this.flatMap.find(d => d.elevation.match(/E/));
        this.tree = {};

        for (let fm of this.flatMap) {
            this.getChildren(fm);
        }

        // const path = await this.dijkstra(this.tree, start.name, end);
        const path = await this.breadthFirst(this.tree, start, end);
 
        console.log('final path', path);

        for (let a of this.part1Answer) {
            let findMap = this.flatMap.find(d => d.name === `${a.x},${a.y}`);
        
            findMap.answer = true;
        }

        await this.updateMap(this.flatMap)

        console.log('isPath', this.flatMap.filter(d => d.isPath).length);



        // for (let p of path) {
        //     let find = this.flatMap.find(d => d.name === p);

        //     find.isPath = true;

        //     await this.updateMap(this.flatMap)
        // }

        // console.log('path', path.length - 1);

        // let found = this.breadthFirstSearch(this.tree, this.tree[start.name], end.name);

        // console.log('found', [...new Set(found)]);
    }

    getChildren(point) {
        let node = new Node(point);
        let xPlus = node.x + 1;
        let xMinus = node.x - 1;
        let yPlus = node.y + 1;
        let yMinus = node.y - 1;

        if (xMinus > 0 || xPlus < this.maxX) {
            this.checkX(node);
        }
    
        if (yMinus > 0 || yPlus < this.maxY) {
            this.checkY(node);
        }

        this.tree[point.name] = node;

        return node;
    }

    checkX(node) {
        let findLeft = this.flatMap.find(fm => fm.x === node.x - 1 && fm.y === node.y); 
        let findRight = this.flatMap.find(fm => fm.x === node.x + 1 && fm.y === node.y); 

        if (findLeft) {
            if (this.checkVal(node, findLeft)) {
                
                node.left = new Node(findLeft);
                node.children[findLeft.name] = new Node(findLeft);
            }
        }

        if (findRight) {
            if (this.checkVal(node, findRight)) {
                node.right = new Node(findRight);
                node.children[findRight.name] = new Node(findRight);
            }
        }

        if (node.elevation === 'z') {
            console.log('findRight', findRight);
            console.log('findLeft', findLeft);
            console.log('node', node);
        }
    }

    checkY(node) {
        let findTop = this.flatMap.find(fm => fm.x === node.x && fm.y === node.y - 1); 
        let findBottom = this.flatMap.find(fm => fm.x === node.x && fm.y === node.y + 1); 

        if (findTop) {
            if (this.checkVal(node, findTop)) {
                node.top = new Node(findTop);
                node.children[findTop.name] = new Node(findTop);
            }
        }

        if (findBottom) {
            if (this.checkVal(node, findBottom)) {
                node.bottom = new Node(findBottom);
                node.children[findBottom.name] = new Node(findBottom);
            }
        }
    }

    checkVal(og,test) {
        return og.value >= test.value || og.value + 1 === test.value;
    }

    formatGraph(graph) {
        const temp = {};

        Object.keys(graph).forEach(key => {
            const obj = graph[key];
            const arr = [];

            Object.keys(obj.children).forEach(ch => {
                arr.push({ 
                    vertex: ch, 
                    cost: obj.children[ch].value,
                    x: obj.children[ch].x,
                    y: obj.children[ch].y,
                    parent: null
                });
            });

            temp[key] = {
                name: key,
                isVisited: false,
                isPath: false,
                parent: null,
                distance: 0,
                children: arr
            };
        })

        return temp;
    }

    heuristic(node, end) {
        let d1 = Math.abs(end.x - node.x);
        let d2 = Math.abs(end.y - node.y);

        return d1 + d2;
    }

    async dijkstra(graph, start, end) {
        let map = this.formatGraph(graph);
        
        console.log('map', map)
        
        let visited = [];
        let unvisited = [start];
        let shortestDistances = { [start]: { vertex: start, cost: 0 } };
        let vertex = undefined;
        
        while (unvisited.length > 0) { 
            console.log('init vertex', vertex);

            let lowestIndex = 0;
            vertex = unvisited[lowestIndex]
            for (let i in unvisited) {
                if (shortestDistances[unvisited[i]].cost < shortestDistances[unvisited[lowestIndex]].cost) {
                    lowestIndex = i;
                }
            }

            if (lowestIndex > 0) {
                vertex = unvisited[lowestIndex]
            }

            // explore unvisited neighbors
            let neighbors = map[vertex].filter(n => !visited.includes(n.vertex));

            // Add neighbors to the unvisited list
            unvisited.push(...neighbors.map(d => d.vertex));
            
            let costToVertex = shortestDistances[vertex].cost;
            
            for (let { vertex: to, cost, x, y } of neighbors) {
                let currentCostToNeighbor = shortestDistances[to] && shortestDistances[to].cost;
                let newCostToNeighbor = costToVertex + cost + this.heuristic({ x, y }, end);
                
                if (currentCostToNeighbor === undefined || newCostToNeighbor < currentCostToNeighbor) {
                    // update the table
                    shortestDistances[to] = { vertex, cost: newCostToNeighbor };
                }
            }
            
            visited.push(vertex);

            let findMap = this.flatMap.find(d => d.name === vertex);

            findMap.visited = true;

            await this.updateMap(this.flatMap);

            // remove from unvisited if its been visited
            // let unvisFilter = unvisited.filter(uv => uv === vertex);
            // if (unvisFilter.length > 1) {
            //     unvisFilter.forEach(d => {
            //         let id = unvisited.findIndex(un => un === d);
            //         unvisited.splice(id, 1);
            //     });
            // }

            unvisited.splice(lowestIndex, 1);

            console.log('vertex', vertex);
            console.log('end', end);
            console.log('visited', visited.slice());
            console.log('unvisisted', unvisited);
            console.log('shortestDistance', shortestDistances);
            console.log('found in unvisisted', unvisited.filter(uv => uv === vertex));
    
        }
        
        // console.log("Table of costs:");
        console.log('shortestDistances', shortestDistances);
        console.log('end distance', shortestDistances[end.name]);
    
        const path = this.tracePath(shortestDistances, start, end.name);

        return path;
    }

    async aStar(graph, start, end) {
        let map = this.formatGraph(graph);
        
        console.log('map', map)
        
        let visited = [];
        let unvisited = [start];
        let shortestDistances = { [start]: { vertex: start, cost: 0 } };
        let vertex = undefined;
        
        while (unvisited.length > 0) {
            // find lowest
            let lowestIndex = 0;
            for (let i in unvisited) {
                if (shortestDistances[unvisited[i]].cost < shortestDistances[unvisited[lowestIndex]].cost) {
                    lowestIndex = i;
                }
            }

            vertex = unvisited[lowestIndex];

            if (vertex === end.name) {
                console.log('we done here');
            }

            unvisited.splice(lowestIndex, 1);
            visited.push(vertex);

            let costToVertex = shortestDistances[vertex].cost;
            
            for (let { vertex: to, cost, x, y } of map[vertex]) {
                if (!visited.includes(to)) {
                    let currentCost = shortestDistances[to] && shortestDistances[to].cost;
                    let newCost = costToVertex + cost + this.heuristic({ x, y }, end);

                    // console.log('currentCost', currentCost)
                    // console.log('newCost', newCost)

                    if (!unvisited.includes(to)) {
                        unvisited.push(to)
                    }

                    if (currentCost === undefined || newCost < currentCost) {
                        shortestDistances[to] = { vertex, cost: newCost};
                    }
                }
            }

            let findMap = this.flatMap.find(d => d.name === vertex);

            findMap.visited = true;

            await this.updateMap(this.flatMap);
        }
        // console.log("Table of costs:");
        console.log('shortestDistances', shortestDistances);
        console.log('end distance', shortestDistances[end.name]);
    
        const path = this.tracePath(shortestDistances, start, end.name);

        console.log('path', path);

        return path;
    }

    async breadthFirst(graph, start, end) {
        let map = this.formatGraph(graph);
        
        console.log('map', map)
        console.log('start', start)
        console.log('end', end)

        map[start.name].isVisited = true;

        let queue = [map[start.name]];
        let path = [];

        while (queue.length > 0) {
            let currentNode = queue.shift();

            path.push(currentNode);

            if (currentNode.name === end.name) {
                return this.createPath(path);
            }

            for (let child of currentNode.children) {
                let mapChild = map[child.vertex];

                if (!mapChild.isVisited) {
                    mapChild.isVisited = true;
                    mapChild.distance = currentNode.distance + 1;
                    mapChild.parent = currentNode;

                    let findMap = this.flatMap.find(d => d.name === mapChild.name);
        
                    findMap.visited = true;

                    queue.push(mapChild);
                }
            }

            this.createPath(path);

            // un comment to create animation
            // await this.updateMap(this.flatMap)
        }

        return [];
    }

    printTable(table) {
        return Object.keys(table)
        .map((vertex) => {
            let { vertex: from, cost } = table[vertex];
            return `${vertex}: ${cost} via ${from}`;
        })
        .join("\n");
    }

    createPath(list) {
        let path = [];
        let next = list.pop();

        for (let fm of this.flatMap) {
            fm.isPath = false;
        }

        while (next) {
            path.push(next);

            if (next.parent === null) {
                break;
            }

            let findMap = this.flatMap.find(d => d.name === next.name);
        
            findMap.isPath = true;

            next = next.parent;
        }

        return path;
    }

    tracePath(table, start, end) {
        let path = [];
        let next = end;
        while (true) {
            path.unshift(next);
            if (next === start) {
                break;
            }
            next = table[next].vertex;
        }
    
        return path;
    }

    drawMap() {
        this.margin = { top: 20, right: 20, bottom: 20, left: 50 };
        this.width = document.body.clientWidth - this.margin.right - this.margin.left;
        this.height = document.body.clientHeight - this.margin.top - this.margin.bottom;
        this.svg = d3.select('body').append('svg')
            .attr('width', this.width + this.margin.right + this.margin.left)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
                .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);


        
        this.x = d3.scaleBand()
            .domain(Array.from({length: this.map[0].length}, (item, index) => index))
            .range([0, this.width])
            .paddingInner(0.05)
            .paddingOuter(0.2)
            .align(0.5);
        this.y = d3.scaleBand()
        .padding(0.2)
            .domain(Array.from({length: this.map.length}, (item, index) => index))
            .range([0, this.height])
            .paddingInner(0.05)
            .paddingOuter(0.2)
            .align(0.5);

        this.rects = this.svg.selectAll('rects')
            .data(this.flatMap)
            .join(
                enter => enter.append('rect')
                    .attr('class', 'tiles')
                    .attr('x', d => this.x(d.x))
                    .attr('y', d => this.y(d.y))
                    .attr('width', this.x.bandwidth)
                    .attr('height', this.y.bandwidth)
                    .attr('fill', d => this.getBlockColor(d.elevation))
                    .attr('stroke-width', 2)
                    .attr('stroke', 'transparent'),
                update => update.attr('stroke', d => d.visited ? 'black' : 'transparent')
            );
    }

    updateMap(data) {
        return new Promise((res,rej) => {
            setTimeout(() => {
                let newRects = this.svg.selectAll('.tiles').data(data)
                    .join(
                        enter => enter
                            .attr('stroke', 'transparent')
                    )
                    .merge(this.rects)
                        .attr('stroke', d => {
                            let color = d.visited ? (d.isPath ? 'steelblue' : 'black') : 'transparent';

                            color = d.answer ? 'red' : color;

                            return color;
                        })
                        .attr('fill', d => d.isPath ? '#62AB37' : this.getBlockColor(d.elevation));
                
                res();
            }, 1)
        })
    }

    getBlockColor(s) {
        if (s.match(/[A-Z]/g)) {
            if (s === 'S') {
                return '#62AB37';
            }

            return '#7C3238';
        }
        return interpolateBrBG((s.charCodeAt(0) - 97) / 25);
    }

    part2(data) {
        
    }
}