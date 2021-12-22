getResult().then(input => {
  let inputArr = input.match(/\d+/gm).map(d => +d);
  console.log(inputArr);

  let increased = 0;

  for (let i = 0; i < inputArr.length; i++) {
    let sum1 = inputArr.slice(i, i + 3).reduce((a,c) => a + c, 0);
    let sum2 = inputArr.slice(i + 1, i + 4).reduce((a,c) => a + c, 0);
    
    if (sum2 > sum1) {
      increased++;
    }
  }

  let result = document.getElementById('result');

  result.innerText = increased;
});
async function getResult() {
  return new Promise((resolve, reject) => {
     resolve(fetch('day1/day1input.txt').then(x => x.text()));
  });
}