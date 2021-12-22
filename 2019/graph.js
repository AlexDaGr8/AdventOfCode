function Graph() {
    this.nodes = [];
    this.edges = {};
    this.steps = {};
    
    this.addNode = function(node) {
        this.nodes.push(node);
        this.edges[node] = [];
    }
    
    this.addEdge = function(node1, node2) {
        this.edges[node1].push({ node: node2 });
        this.edges[node2].push({ node: node1 });
    }

    this.addDirectedEdge = function(node1, node2) {
        this.edges[node1].push({ node: node2 });
    }

    this.getTotalSteps = function() {
        const keys = Object.keys(this.steps);
        return keys.reduce((acc, curr) => acc += this.steps[curr], 0);
    }

    this.setStepsFromStartPoint = function(node, start = false) {
        if (!this.emptyObj(this.steps) && start) {
            this.steps = {};
        }
        if (start) { this.steps[node] = 0; }
        this.edges[node].forEach(edge => {
            if (Object.keys(this.steps).findIndex(d => d === edge.node) < 0) {
                this.steps[edge.node] = this.steps[node] + 1;
                this.setStepsFromStartPoint(edge.node);
            }
        })
    }

    this.emptyObj = function (_o) {
        return Object.entries(_o).length === 0 && _o.constructor === Object
    }

    this.display = function() {
        let graph = "";
        this.nodes.forEach(node => {
           graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
        });
        console.log(graph);
     }
}

