/// tests ///
const test = [
    {
        str: "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
        seq: [4,3,2,1,0]
    },
    {
        str: "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
        seq: [0,1,2,3,4]
    },
    {
        str: "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
        seq: [1,0,4,3,2]
    },
].forEach((t,i) => console.log(`t ${i}`, ampCircuit(t)));
var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};

let thrusterSigTest = [];
const testStr = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
permute([0,1,2,3,4]).forEach(d => {
    var input = {
        str: testStr,
        seq: d
    }
    thrusterSigTest.push({
        thrust: ampCircuit(input),
        seq: d
    })
});
console.log(thrusterSigTest);
console.log(thrusterSigTest.reduce((acc, curr) => acc.thrust > curr.thrust ? acc : curr));
console.log(Math.max(...thrusterSigTest.map(d => d.thrust)));

const realDeal = "3,8,1001,8,10,8,105,1,0,0,21,46,67,76,101,118,199,280,361,442,99999,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,1002,9,5,9,101,5,9,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99";
let thrustVals = [];
permute([0,1,2,3,4]).forEach(d => {
    var input = {
        str: realDeal,
        seq: d
    }
    thrustVals.push({
        thrust: ampCircuit(input),
        seq: d
    })
});
console.log('thrustVals', thrustVals);
console.log('thrustVals.reduce', thrustVals.reduce((acc, curr) => acc.thrust > curr.thrust ? acc : curr));
console.log('thrustVals.max', Math.max(...thrustVals.map(d => d.thrust)));



function ampCircuit ({ str, seq }) {
    let ampOutput = [0];
    
    seq.forEach((phase,i) => {
        let amp = new optCode(str, ampOutput[i], phase);
    
        ampOutput.push(amp.output.slice(-1).pop())
    })
    return ampOutput.slice(-1).pop();
}