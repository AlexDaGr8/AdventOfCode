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
function ampCircuit ({ str, seq }) {
    let ampOutput = [0];
    
    seq.forEach((phase,i) => {
        let amp = new optCode(str, ampOutput[i], phase);
        console.log('answer', amp.answer)
        ampOutput.push(amp.output.slice(-1).pop())
    })
    return ampOutput.slice(-1).pop();
}

/// tests ///
// const test = [
//     {
//         str: "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
//         seq: [4,3,2,1,0]
//     },
//     {
//         str: "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
//         seq: [0,1,2,3,4]
//     },
//     {
//         str: "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//         seq: [1,0,4,3,2]
//     },
// ].forEach((t,i) => console.log(`t ${i}`, ampCircuit(t)));


// part 1 testing
// let thrusterSigTest = [];
// const testStr = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0";
// permute([0,1,2,3,4]).forEach(d => {
//     var input = {
//         str: testStr,
//         seq: d
//     }
//     thrusterSigTest.push({
//         thrust: ampCircuit(input),
//         seq: d
//     })
// });
// console.log(thrusterSigTest);
// console.log(thrusterSigTest.reduce((acc, curr) => acc.thrust > curr.thrust ? acc : curr));
// console.log(Math.max(...thrusterSigTest.map(d => d.thrust)));


function ampCircuitFeedback ({ str, seq }, amps) {
    let ampOutput = [0];

    while (!amps[0].finished) {
        seq.forEach((phase,i) => {
            if (amps[i].oc === null) {
                amps[i].oc = new optCode(str, ampOutput[ampOutput.length - 1], phase);
            } else {
                amps[i].oc.input = ampOutput[ampOutput.length - 1]
                amps[i].oc.stop = false;
                amps[i].oc.run(amps[i].output.i);
            }
            amps[i].output = amps[i].oc.answer;
            amps[i].finished = amps[i].output.finished;
            ampOutput.push(amps[i].oc.answer.output)
        });
    }
    return ampOutput.slice(-1).pop();
}


const testFB = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";
const testFB2 = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10"
const realDeal = "3,8,1001,8,10,8,105,1,0,0,21,46,67,76,101,118,199,280,361,442,99999,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,1002,9,5,9,101,5,9,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99";

runItYo(testFB);
runItYo(testFB2);
runItYo(realDeal);

function runItYo(inputStr) {
    let thrustFeedback = [];
    permute([5,6,7,8,9]).forEach(d => {
        var input = {
            str: inputStr,
            seq: d
        };
        let amps = [
            {
                oc: null,
                output: null,
                finished: false,
            },
            {
                oc: null,
                output: null,
                finished: false,
            },
            {
                oc: null,
                output: null,
                finished: false,
            },
            {
                oc: null,
                output: null,
                finished: false,
            },
            {
                oc: null,
                output: null,
                finished: false,
            }
        ];
        thrustFeedback.push({
            thrust: ampCircuitFeedback(input, amps),
            seq: d
        })
    });
    
    console.log('thrustFeedback', thrustFeedback);
    console.log('thrustFeedback.reduce', thrustFeedback.reduce((acc, curr) => acc.thrust > curr.thrust ? acc : curr));
    console.log('thrustFeedback.max', Math.max(...thrustFeedback.map(d => d.thrust)));
    
    console.log('---------------------')
}

// const realDeal = "3,8,1001,8,10,8,105,1,0,0,21,46,67,76,101,118,199,280,361,442,99999,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,1001,9,3,9,102,2,9,9,1001,9,2,9,1002,9,3,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,1002,9,5,9,101,5,9,9,1002,9,4,9,101,5,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99";
// let thrustVals = [];
// permute([0,1,2,3,4]).forEach(d => {
//     var input = {
//         str: realDeal,
//         seq: d
//     }
//     thrustVals.push({
//         thrust: ampCircuit(input),
//         seq: d
//     })
// });
// console.log('thrustVals', thrustVals);
// console.log('thrustVals.reduce', thrustVals.reduce((acc, curr) => acc.thrust > curr.thrust ? acc : curr));
// console.log('thrustVals.max', Math.max(...thrustVals.map(d => d.thrust)));



