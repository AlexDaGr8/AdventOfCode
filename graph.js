function Graph() {
    this.nodes = [];
    this.edges = {};
    
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

    this.display = function() {
        let graph = "";
        this.nodes.forEach(node => {
           graph += node + "->" + this.edges[node].map(n => n.node).join(", ") + "\n";
        });
        console.log(graph);
     }
}

