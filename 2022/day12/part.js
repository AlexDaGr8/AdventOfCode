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
                answer: false,
                neighbors: []
            }));
        });
        this.maxX = this.map[0].length;
        this.maxY = this.map.length;

        this.flatMap = this.map.flat();

        this.starts = [];

        this.flatMap.forEach(d => {

            if (d.value === 0) {
                this.starts.push(d);
            }

            d.neighbors = this.setFlatMapNeighbors(d);
        });

        console.log('flatMap', this.flatMap);

        this.drawMap();

        let start = this.flatMap.find(d => d.elevation.match(/S/));
        let end = this.flatMap.find(d => d.elevation.match(/E/));
        
        await this.simpleBreadth(start);

        const shortestPath = await this.getShortestPath(start,end);

        await this.updateMap(this.flatMap);

        console.log('flatMap', this.flatMap)
        console.log('shortestPath', shortestPath)

        let minPathLength = Infinity;
        for (let start of this.starts) {
            const path = await this.getShortestPath(start, end);

            if(path.length) {
                minPathLength = Math.min(minPathLength, path.length);
            }
        }

        console.log(minPathLength);
        // this.tree = {};

        // for (let fm of this.flatMap) {
        //     this.getChildren(fm);
        // }

        // // const path = await this.dijkstra(this.tree, start.name, end);
        // const path = await this.breadthFirst(this.tree, start, end);
 
        // console.log('final path', path);

        // await this.updateMap(this.flatMap)

        // console.log('isPath', this.flatMap.filter(d => d.isPath).length);

    }

    setFlatMapNeighbors(node) {
        let top = this.flatMap.find(f => f.x === node.x && f.y + 1 === node.y);
        let bottom = this.flatMap.find(f => f.x === node.x && f.y - 1 === node.y);
        let right = this.flatMap.find(f => f.x + 1 === node.x && f.y === node.y);
        let left = this.flatMap.find(f => f.x - 1 === node.x && f.y === node.y);

        return [ top, bottom, right, left ].filter(d => d !== undefined);
    }

    async simpleBreadth(start) {
        const unvisited = [];
        unvisited.push(start);

        this.cameFrom = new Map();
        this.cameFrom.set(start.name, null);

        while (unvisited.length > 0) {
            const current = unvisited.shift();

            for (let next of current.neighbors) {
                if (next.value - current.value > 1 || this.cameFrom.has(next.name)) {
                    continue;
                }

                unvisited.push(next);
                this.cameFrom.set(next.name, current.name)
            }

            // let find = this.flatMap.find(d => d.name === current.name);
    
            // find.visited = true;

            // this.getShortestPath(start, current);
    
            // await this.updateMap(this.flatMap);
        }
    }

    async updateVisited(node) {
    }

    async getShortestPath(start, end) { 
        let current = end.name;
        let path = [];

        this.flatMap.forEach(fm => fm.isPath = false);

        while (current !== null && current !== start.name) {
            path.push(current);

            let find = this.flatMap.find(d => d.name === current);

            find.isPath = true;

            current = this.cameFrom.get(current);
        }

        if (current === null) {
            return [];
        }

        path.reverse();

        return path;
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
            await this.updateMap(this.flatMap)
        }

        return [];
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

    async updateMap(data) {
        return new Promise((res,rej) => {
            setTimeout(() => {
                let newRects = this.svg.selectAll('.tiles').data(data)
                    .join(
                        enter => enter
                            .attr('stroke', 'transparent')
                    )
                    .merge(this.rects)
                        .attr('stroke', d => {
                            if (d.isVisited) console.log('visited');

                            let color = d.visited ? (d.isPath ? 'steelblue' : 'black') : 'transparent';

                            color = d.answer ? 'red' : color;

                            return d.visited ? (d.isPath ? 'steelblue' : 'black') : 'transparent';
                        })
                        .attr('fill', d => d.isPath ? '#62AB37' : this.getBlockColor(d.elevation));
                
                res();
            }, 0)
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