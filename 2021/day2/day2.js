import Scale from '../Scale.js';
console.clear();
init();
async function init() {
  
  let chartArr1 = await getResult('day2/day2.txt').then(part1);
  let chartArr2 = await getResult('day2/day2.txt').then(part2);
  console.log(chartArr1);
  console.log(chartArr2);
  
  chart(chartArr1, chartArr2);
}

function part2(input) {
  let inputArr = input.match(/\w+\s\d+/gm)
    .map(d => ({
      direction: d.match(/\w+/gm)[0],
      value: +d.match(/\d+/gm)
    }));
  
  let depth = 0;
  let aim = 0;
  let hzPos = 0;
  let posArr = [];
  
  for (let inp of inputArr) {
    switch(inp.direction) {
      case 'forward':
        hzPos += inp.value;
        depth += aim * inp.value;
        break;
      case 'up': 
        aim -= inp.value;
        break;
      case 'down':
        aim += inp.value;
        break;
      default:
        break;
    }
    posArr.push({ hzPos, depth });
  }
  
  
  let result = document.getElementById('result');

  result.innerText = hzPos * depth;
  
  return posArr;
}

function part1(input) {
  let inputArr = input.match(/\w+\s\d+/gm)
    .map(d => ({
      direction: d.match(/\w+/gm)[0],
      value: +d.match(/\d+/gm)
    }));
  
  let depth = 0;
  let hzPos = 0;
  let posArr = [];
  
  for (let inp of inputArr) {
    switch(inp.direction) {
      case 'forward':
        hzPos += inp.value;
        break;
      case 'up': 
        depth -= inp.value;
        break;
      case 'down':
        depth += inp.value;
        break;
      default:
        break;
    }
    posArr.push({ hzPos, depth });
  }   
  let result = document.getElementById('result');

  result.innerText = depth * hzPos;
  
  return posArr;
};

function chart(arr1, arr2) {
  let max = (arr, func) => Math.max(...arr.map(func))
  let min = (arr, func) => Math.min(...arr.map(func))
  let extent = (arr, func) => ([min(arr, func), max(arr, func)])
  let canvas = document.createElement('canvas');
  let width = canvas.width = 900;
  let height = canvas.height = 500;
  let padding = 20;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d');
  let x1 = new Scale().range([padding, width - padding]).domain(extent(arr1, d => d.hzPos));
  let y1 = new Scale().range([padding, height - padding]).domain(extent(arr1, d => d.depth));
  let x2 = new Scale().range([padding, width - padding]).domain(extent(arr2, d => d.hzPos));
  let y2 = new Scale().range([padding, height - padding]).domain(extent(arr2, d => d.depth));
  
  let animation = requestAnimationFrame(draw);
  
  let currentPos = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'steelblue';
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < currentPos; i++) {
      circle(x1.scale(arr1[i].hzPos), y1.scale(arr1[i].depth), 1, 'yellow')
      circle(x2.scale(arr2[i].hzPos), y2.scale(arr2[i].depth), 1, 'red')
    }
    
    crossHair(x1,y1,arr1[currentPos]);
    crossHair(x2,y2,arr2[currentPos]);
    
    currentPos++;
    if (currentPos === Math.max(arr1.length, arr2.length)) {
      cancelAnimationFrame(animation);
      console.log('stopped');
    } else {
      animation = requestAnimationFrame(draw)
    }
  }
  function circle(x,y,r,color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
  function crossHair(x,y,pos) {
    ctx.fillStyle = 'black';
    ctx.fillText(
      pos.hzPos,                                                  // text
      x.scale(pos.hzPos) - ctx.measureText(pos.hzPos).width/2,    // x
      y.scale(pos.depth) - 25                                     // y
    );
    ctx.fillText(
      pos.depth,                                                  // text
      x.scale(pos.hzPos) - 20 - ctx.measureText(pos.depth).width, // x
      y.scale(pos.depth) - 5                                      // y
    );
    
    line({
      x:x.scale(pos.hzPos),
      y:y.scale(pos.depth) - 20
    },
    {
      x:x.scale(pos.hzPos),
      y:y.scale(pos.depth) + 20
    })
    line({
      x:x.scale(pos.hzPos) - 20,
      y:y.scale(pos.depth)
    },
    {
      x:x.scale(pos.hzPos) + 20,
      y:y.scale(pos.depth)
    })
  }
  function line(start,end) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }
}

async function getResult(file) {
  return new Promise((resolve, reject) => {
     resolve(fetch(file).then(x => x.text()));
  });
}