
function optCode(instructionsStr, input, noun, verb) {
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
    
    this.runTest();
}

optCode.prototype.immediate = function() {

}

optCode.prototype.position = function() {

}

optCode.prototype.checkType = function(partialArr) {
    let value = 0, position = partialArr[partialArr.length - 1];
    let params = partialArr.slice(1, partialArr.length - 1);
    let jump = false;
    console.log('params', params)
    switch (partialArr[0]) {
        case 1: 
            value = params.reduce((acc,curr) => acc + curr, 0);
            this.instr[position] = value;
            break;
        case 2: 
            value = params.reduce((acc,curr) => acc * curr, 1);
            this.instr[position] = value;
            break;
        case 3:
            value = 'input'
            this.instr[position] = this.input;
            break;
        case 4:
            value = position;
            this.output.push(position);
            break;
        case 5: 
            if (params[0] !== 0) {
                value = position
                jump = true;
            }
            else value = -1;
            break;
        case 6: 
            if (params[0] === 0) {
                value = position
                jump = true
            }
            else value = -1;
            break;
        case 7:
            if (params[0] < params[1]) this.instr[position] = 1;
            else this.instr[position] = 0;
            break;
        case 8:
            if (params[0] === params[1]) this.instr[position] = 1;
            else this.instr[position] = 0;
            break;
        default: 
            console.log('not found')
            break;
    }
    return { value: value, position: position, jump: jump };
}

optCode.prototype.runTest = function() {
    var i = 0;
    while (this.instr[i] !== 99 && i < this.instr.length) {
        let code = (this.instr[i] + "");
        console.log('code', code);

        let splitCode = code.split('').map(d => +d);
        let firstVal = splitCode[splitCode.length - 1];
        console.log(firstVal)
        console.log([3,4].some(d => d === firstVal))
        let opC = [3,4].some(d => d === firstVal) 
            ? this.instr.slice(i, i += 2) 
            : [5,6].some(d => d === firstVal) 
                ? this.instr.slice(i, i += 3)
                : this.instr.slice(i, i += 4);
        opC[0] = firstVal;
        let revSplitCodeParamMode = splitCode.slice(0,splitCode.length - 2).reverse();
        console.log('opC', opC.slice())
        console.log('revSplitCode', revSplitCodeParamMode)
        console.log('opC.slice(1,opC.length - 1)', opC.slice(1,[5,6].some(d => d === firstVal) ? opC.length : opC.length - 1))
        opC.slice(1,[5,6].some(d => d === firstVal) ? opC.length : opC.length - 1)
                .forEach((d,i) => {
                    console.log('revSPlit[i]', revSplitCodeParamMode[i]);
                    console.log('d', d);
                    if (revSplitCodeParamMode[i] === 0 || revSplitCodeParamMode[i] === undefined) {
                        console.log('position')
                        opC[i+1] = this.instr[opC[i+1]];
                    } else if (revSplitCodeParamMode[i] === 1) {
                        console.log('immediate')
                        opC[i+1] = opC[i+1];
                    }
                    console.log('opC[i+1]', opC[i+1]);
                });
        if (opC.slice(1,opC.length - 1).length === 0 && firstVal === 4) {
            opC[1] = revSplitCodeParamMode[0] === 1 ? opC[1] : this.instr[opC[1]];
        } 
        console.log('opC', opC)
        console.log('split code slice', splitCode.slice(0,splitCode.length - 2))

        let out = this.checkType(opC);
        console.log('out', out)

        if (out.jump) {
            i = out.value;
        }

        console.log('set', this.instr.slice());
        console.log('i', i);
    }
    this.answer = this.instr[0];
}