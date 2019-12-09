
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
        default: 
            console.log('not found')
            break;
    }
    return { value: value, position: position };
}

// optCode.prototype.run = function() {
//     var i = 0;
//     while (this.instr[i] !== 99 && i < this.instr.length) {
//         if (this.instr[i] === 1 || this.instr[i] === 2) {
//             console.log('1 or 2');
//             var optCodeOutput = this.checkType(this.instr.slice(i, i + 4));
//             this.instr[optCodeOutput.position] = optCodeOutput.value;
//             i += 4;
//         } else if (this.instr[i] === 3 || this.instr[i] === 4) {
//             console.log('3 or 4');
//             var op = this.instr.slice(i, i + 2);
//             if (this.instr[i] === 3) {
//                 this.instr[op[1]] = this.input 
//             } else if (this.instr[i] === 4) {
//                 this.output.push(this.instr[op[1]]); 
//             }
//             i += 2;
//         } else {

//         }
//         console.log(this.instr);
//         console.log('i', i);
//     }
//     this.answer = this.instr[0];
// }

optCode.prototype.runTest = function() {
    var i = 0;
    while (this.instr[i] !== 99 && i < this.instr.length) {
        let code = (this.instr[i] + "");
        console.log('code', code);
        if (code.length > 1) {
            let splitCode = code.split('').map(d => +d);
            console.log(splitCode[splitCode.length - 1])
            let opC = [3,4].some(d => d === splitCode[splitCode.length - 1]) ? this.instr.slice(i, i += splitCode.length - 1) : this.instr.slice(i, i += 4);
            opC[0] = +splitCode[splitCode.length - 1];
            let revSplitCodeParamMode = splitCode.slice(0,splitCode.length - 2).reverse();
            console.log('opC', opC.slice())
            console.log('revSplitCode', revSplitCodeParamMode)
            opC.slice(1,opC.length - 1)
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
            console.log('opC', opC)
            console.log('split code slice', splitCode.slice(0,splitCode.length - 2))
            console.log('greater than 1')
            let out = this.checkType(opC);
            console.log('out', out)
        } else {
            // slice instruction set and send to checkType
            console.log('equal to 1');
            if (this.instr[i] === 1 || this.instr[i] === 2) {
                let opC = this.instr.slice(i, i += 4);
                opC[1] = this.instr[opC[1]];
                opC[2] = this.instr[opC[2]];
                console.log('opC', opC);
                let out = this.checkType(opC);
                console.log('out', out);
            } else {
                let opC = this.instr.slice(i, i += 2);
                console.log('opC', opC);
                opC[1] = this.instr[opC[1]];
                let out = this.checkType(opC);
                console.log('out', out);
            }
        }
        console.log('set', this.instr.slice());
        console.log('i', i);
    }
    this.answer = this.instr[0];
}