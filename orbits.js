function Orbits (input) {
    this.orbitsInput = input.split("\n");
    this.orbitPairs = this.orbitsInput.map(orbit => {
        let pair = orbit.split(')');
        return {
            orbitee: pair[0],
            orbiter: pair[1]
        }
    })
    this.orbits = new LinkedList();
    this.orbits.add("COM");
    this.linkedList = this.orbits;
    console.log(this.orbitPairs)
    this.formatOrbits();
    console.log(this.orbits)
    console.log('linkedList', this.linkedList)
    console.log(this.orbits.getById(1))
    console.log(this.orbits.getByData("B"))
}

Orbits.prototype.formatOrbits = function() {
    let com = this.orbitPairs.find(d => d.orbitee === "COM");
    console.log('all', this.findAll(com.orbiter))
}

Orbits.prototype.findAll = function (orbit, id = null) {
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