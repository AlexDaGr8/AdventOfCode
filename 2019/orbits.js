function Orbits(input) {
    this.orbitsInput = input.split("\n");
    this.graph = new Graph();
    this.orbitPairs = this.orbitsInput.map(orbit => {
        let pair = orbit.split(')');
        return [
            pair[0],
            pair[1]
        ]
    });
    this.uniqueNodes = [...new Set(this.orbitPairs.flat())];

    this.uniqueNodes.forEach(node => {
        this.graph.addNode(node);
    })

    this.orbitPairs.forEach(pair => {
        this.graph.addEdge(pair[0], pair[1])
    })

    this.graph.display();
    this.graph.setStepsFromStartPoint("COM", true)

    console.log('steps', this.graph.steps);
    console.log('total steps', this.graph.getTotalSteps())
}



function testOrbit (input) {
    this.orbitsInput = input.split("\n");
    
    this.orbitPairs = this.orbitsInput.map(orbit => {
        let pair = orbit.split(')');
        return {
            orbitee: pair[0],
            orbiter: pair[1]
        }
    });

    this.linkLists = [];
    this.currLL = null;

    this.orbits = new LinkedList();
    this.orbits.add("COM");
    this.linkedList = this.orbits;
    console.log(this.orbitPairs)
    this.formatOrbit();

    console.log('lts', this.linkLists)
    // console.log(this.orbits)
    // console.log('linkedList', this.linkedList)
    // console.log(this.orbits.getById(1))
    // console.log(this.orbits.getByData("B"))
}

testOrbit.prototype.formatOrbit = function() {
    let com = this.orbitPairs.find(d => d.orbitee === "COM");
    console.log('all', this.findAllBreak("COM"));
}

testOrbit.prototype.findAllBreak = function (orbit) {
    console.log('orbit', orbit)
    if (this.currLL === null) {
        this.currLL = new LinkedList();
        this.currLL.add(orbit);
    }
    let filter = this.orbitPairs.filter(d => d.orbitee === orbit);
    for (let f of filter) {
        this.currLL.add(f.orbiter)
        console.log('f', f);
        console.log(this.findAllBreak(f.orbiter))
        break; 
    }
    console.log('orbit', orbit)
    if (orbit === "COM") {
        this.linkLists.push(this.currLL);
        this.currLL = null;
    }
    return 'done';
}

testOrbit.prototype.findInLinkedLists = function () {

}

testOrbit.prototype.findAll = function (orbit, id = null) {
    let arr = [];
    let filter = this.orbitPairs.filter(d => d.orbitee === orbit);
    console.log('filter', filter);
    let llId = this.orbits.add(orbit);
    console.log('llId', llId)
    console.log('id', id)
    if (filter.length > 1) {
        this.orbits.getByData(orbit).linkedList = new LinkedList(true, this.orbits.getByData(orbit));
        this.linkedList = this.orbits.getByData(orbit).linkedList;
    }
    filter.forEach((d,i) => {
            console.log('d', d);
            if (i > 0) this.linkedList.add(d.orbiter)
            console.log(this.findAll(d.orbiter, llId))
            console.log('d', d);
            console.log('orbiter', this.orbits.getByData(d.orbiter).previous)
            //console.log('test', this.linkedList.getByData(d.orbiter))
            this.linkedList = this.orbits.getByData(d.orbiter).previous.linkedList !== undefined ? this.orbits.getByData(d.orbiter).previous.linkedList : this.linkedList;
        });
    return 'done';
}