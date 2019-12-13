
function optCode(instructionsStr, input, phase, feedback, noun, verb) {
    this.instr = instructionsStr.split(',').map(d => +d);
    this.noun = noun;
    this.verb = verb;
    this.input = input;
    this.inputUsed = false;
    this.phase = phase;
    this.phaseUsed = false;
    this.output = [];
    this.answer = null;
    this.stop = false;
    this.feedback = feedback;
    if (!this.feedback) {
        this.phaseUsed = true;
    }
    this.relativeBase = 0;

    if (this.noun && this.verb) {
        this.instr[1] = noun;
        this.instr[2] = verb;
    }
    
    this.run();
}

optCode.prototype.checkType = function(partialArr) {
    let value = 0, position = partialArr[partialArr.length - 1];
    let params = partialArr.slice(1, partialArr.length - 1);
    let jump = false;
    //console.log('params', params)
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
            this.instr[position] = this.phaseUsed ? this.input : this.phase;
            this.phaseUsed = true;
            break;
        case 4:
            value = position;
            this.output.push(position);
            this.stop = this.feedback ? true : false;
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
        case 9: 
            this.relativeBase += position;
            break;
        default: 
            console.log('not found', partialArr[0])
            break;
    }
    return { value: value, position: position, jump: jump };
}

optCode.prototype.ifNullReturnZero = function(val) {
    return val === undefined ? 0 : val;
}

optCode.prototype.run = function(i = 0) {
    var i = i;
    while (this.instr[i] !== 99 && i < this.instr.length && !this.stop) {
        let code = (this.instr[i] + "");
        //console.log('code', code);

        let splitCode = code.split('').map(d => +d);
        let firstVal = splitCode[splitCode.length - 1];
        // console.log(firstVal)
        // console.log([3,4].some(d => d === firstVal))
        let sliceVal = [3,4,9].some(d => d === firstVal) ? 2 : [5,6].some(d => d === firstVal) ? 3 : 4;
        let opC = this.instr.slice(i, i += sliceVal);
        opC[0] = firstVal;
        let revSplitCodeParamMode = splitCode.slice(0,splitCode.length - 2).reverse();
        // console.log('opC', opC.slice())
        // console.log('revSplitCode', revSplitCodeParamMode)
        // console.log('opC.slice(1,opC.length - 1)', opC.slice(1,[5,6].some(d => d === firstVal) ? opC.length : opC.length - 1))

        // optCode 3 and 4 never go here
        opC.slice(1,[5,6].some(d => d === firstVal) ? opC.length : opC.length - 1)
                .forEach((d,i) => {
                    if (revSplitCodeParamMode[i] === 0 || revSplitCodeParamMode[i] === undefined) {
                        opC[i+1] = this.instr[opC[i+1]] === undefined ? 0 : this.instr[opC[i+1]];
                    } else if (revSplitCodeParamMode[i] === 1) {
                        opC[i+1] = opC[i+1];
                    } else if (revSplitCodeParamMode[i] === 2) {
                        opC[i+1] = this.instr[opC[i+1] + this.relativeBase] === undefined ? 0 : this.instr[opC[i+1] + this.relativeBase];
                    }
                });

        if (splitCode.length > 4) {
            let lastVal = splitCode[0]
            if (lastVal !== 2) {
                opC[3] = opC[3];
            } else if (lastVal === 2) {
                opC[3] = opC[3] + this.relativeBase;
            }
        }
            
        if (opC.slice(1,opC.length - 1).length === 0 && [3,4,9].some(d => d === firstVal)) {
            if (revSplitCodeParamMode[0] === 0 || revSplitCodeParamMode[0] === undefined) {
                opC[1] = this.instr[opC[1]];
            } else if (revSplitCodeParamMode[0] === 2) {
                if (firstVal === 4) opC[1] = this.ifNullReturnZero(this.instr[opC[1] + this.relativeBase]);
                else if (firstVal === 3) opC[1] = opC[1] + this.relativeBase;
                else if (firstVal === 9) opC[1] = this.ifNullReturnZero(this.instr[opC[1] + this.relativeBase]);
                //opC[1] = [3,9].some(d => d === firstVal) ? opC[1] + this.relativeBase : this.instr[opC[1] + this.relativeBase];
            } 
        } 
        
        // console.log('optCode', this.instr.slice(i - sliceVal, i))
        // console.log('opC', opC)
        //console.log('split code slice', splitCode.slice(0,splitCode.length - 2))

        let out = this.checkType(opC);

        // console.log('arr', this.instr.slice())
        // console.log('relBase', this.relativeBase)
        // console.log('out', out)
        // console.log('------------------------------')

        if (out.jump) {
            i = out.value;
        }

        // console.log('set', this.instr.slice());
        // console.log('i', i);
    }
    //console.log(this.instr[i]);
    this.answer = { finished: this.instr[i] === 99, i: i, relBase: this.relativeBase, next: this.instr[i + 1], output: this.output.slice(-1).pop(), arr: this.instr.slice() };
}