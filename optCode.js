
function optCode(instructionsStr, noun, verb, input) {
    this.instr = instructionsStr.split(',').map(d => +d);
    this.noun = noun;
    this.verb = verb;
    this.input = input;
    this.output = [];
    this.answer = 0;

    if (this.noun && this.verb) {
        this.instr[1] = noun;
        this.instr[2] = verb;
    }
    
    this.run();
}

optCode.prototype.immediate = function() {

}

optCode.prototype.position = function() {

}

optCode.prototype.checkType = function(partialArr) {
    let value = 0, position = partialArr[3];
    switch (partialArr[0]) {
        case 1: 
            value = this.instr[partialArr[1]] + this.instr[partialArr[2]];
            break;
        case 2: 
            value = this.instr[partialArr[1]] * this.instr[partialArr[2]];
            break;
        default: 
            console.log('not found')
            break;
    }
    return { value: value, position: position };
}

optCode.prototype.run = function() {
    var i = 0;
    while (this.instr[i] !== 99) {
        if (this.instr[i] === 1 || this.instr[i] === 2) {
            console.log('1 or 2');
            var optCodeOutput = this.checkType(this.instr.slice(i, i + 4));
            this.instr[optCodeOutput.position] = optCodeOutput.value;
            i += 4;
        } else if (this.instr[i] === 3 || this.instr[i] === 4) {
            console.log('3 or 4');
            var op = this.instr.slice(i, i + 2);
            if (this.instr[i] === 3) {
                this.instr[op[1]] = this.input 
            } else if (this.instr[i] === 4) {
                this.output.push(this.instr[op[1]]); 
            }
            i += 2;
        }
        console.log(this.instr);
        console.log('i', i);
    }
    this.answer = this.instr[0];
}