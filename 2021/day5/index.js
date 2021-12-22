import { getResult } from '../Util.js';
import Scale from '../Scale.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day5/input.txt').then(part2);

  chart(data);
}
function part1(input) {
  console.log('-----part1-----')
  let data = input.split('\n')
    .map(d => d.split(' -> '))
    .map(d => ({
      x1: +d[0].split(',')[0],
      y1: +d[0].split(',')[1],
      x2: +d[1].split(',')[0],
      y2: +d[1].split(',')[1],
    }));
  let noDiags = data.filter(d => d.x1 === d.x2 || d.y1 === d.y2);
  let max = (arr, func) => Math.max(...arr.map(func));
  let min = (arr, func) => Math.min(...arr.map(func));
  let maxX = Math.max(max(noDiags, d => d.x1), max(noDiags, d => d.x2));
  let maxY = Math.max(max(noDiags, d => d.y1), max(noDiags, d => d.y2));
  let grid = Array(maxY + 1).fill(null).map(() => Array(maxX + 1).fill(0));

  console.log(noDiags)

  for (let d of noDiags) {
    if (d.x1 === d.x2) {
      let yMin = Math.min(d.y1, d.y2);
      let yMax = Math.max(d.y1, d.y2);
      while (yMin <= yMax) {
        grid[yMin][d.x1]++;
        yMin++;
      }
    } else if (d.y1 === d.y2) {
      let xMin = Math.min(d.x1, d.x2);
      let xMax = Math.max(d.x1, d.x2);
      while (xMin <= xMax) {
        grid[d.y1][xMin]++;
        xMin++;
      }
    }
  }

  let gridString = grid.join('\n')
  console.log(gridString)

  console.log('result', grid.flat().filter(d => d > 1).length);

  return noDiags;
};

function part2(input) {
  console.log('-----part2-----')
  let data = input.split('\n')
    .map(d => d.split(' -> '))
    .map(d => ({
      x1: +d[0].split(',')[0],
      y1: +d[0].split(',')[1],
      x2: +d[1].split(',')[0],
      y2: +d[1].split(',')[1],
    }));
  let max = (arr, func) => Math.max(...arr.map(func));
  let maxX = Math.max(max(data, d => d.x1), max(data, d => d.x2));
  let maxY = Math.max(max(data, d => d.y1), max(data, d => d.y2));
  let grid = Array(maxY + 1).fill(null).map(() => Array(maxX + 1).fill(0));

  for (let d of data) {
    console.log('----------')
    console.log('d', d)
    let yMin = Math.min(d.y1, d.y2);
    let yMax = Math.max(d.y1, d.y2);
    let xMin = Math.min(d.x1, d.x2);
    let xMax = Math.max(d.x1, d.x2);
    if (d.x1 === d.x2) {
      while (yMin <= yMax) {
        grid[yMin][d.x1]++;
        yMin++;
      }
    } else if (d.y1 === d.y2) {
      while (xMin <= xMax) {
        grid[d.y1][xMin]++;
        xMin++;
      }
    } else {
      console.log('in else')
      while (xMin <= xMax && yMin <= yMax) {
        let x = (d.x1 < d.x2) ? xMin : xMax;
        let y = (d.y1 < d.y2) ? yMin : yMax;
        grid[y][x]++;
        if (d.x1 < d.x2) {
          xMin++;
        } else {
          xMax--;
        }
        if (d.y1 < d.y2) {
          yMin++;
        } else {
          yMax--;
        }
      }
    }
  }

  let gridString = grid.join('\n')
  console.log(gridString)

  console.log('result', grid.flat().filter(d => d > 1).length);

  return data;
};


function chart(data) {
  let max = (arr, func) => Math.max(...arr.map(func));
  let min = (arr, func) => Math.min(...arr.map(func));
  let extent = (arr, func) => ([min(arr, func), max(arr, func)]);

  let canvas = document.createElement('canvas');
  let width = canvas.width = document.body.clientWidth;
  let height = canvas.height = document.body.clientWidth * .6;
  let padding = 50;
  document.body.appendChild(canvas);
  let ctx = canvas.getContext('2d');
  let colors = {
    purple: (alpha = 1) => `rgba(41, 23, 32, ${alpha})`,
    pink: (alpha = 1) => `rgba(217, 3, 104, ${alpha})`,
    green: (alpha = 1) => `rgba(4, 167, 119, ${alpha})`,
    white: (alpha = 1) => `rgba(255, 255, 255, ${alpha})`,
    blue: (alpha = 1) => `rgba(175, 210, 233, ${alpha})`
  }
  canvas.style.background = colors.purple();
  
  let animation = requestAnimationFrame(draw);

  let maxX = Math.max(max(data, d => d.x1), max(data, d => d.x2));
  let maxY = Math.max(max(data, d => d.y1), max(data, d => d.y2));
  let xScale = new Scale().range([padding, width - padding]).domain([0,maxX]);
  let yScale = new Scale().range([padding, height - padding]).domain([0,maxY]);

  function draw() {
    ctx.clearRect(0,0,width,height);
    ctx.strokeRect(0,0,width,height);
    let gridRadius = Math.min(xScale.bandwidth(), yScale.bandwidth()) * .03;
    console.log(gridRadius)
    grid(xScale.domain(),yScale.domain(), 5);
    for (let d of data) {
      line(d,colors.pink(0.5), 4)
    }
  }
  function grid(xdim,ydim,r) {
    for (let x = xdim[0]; x < xdim[1]+1; x++) {
      for (let y = ydim[0]; y < ydim[1]+1; y++) {
        circle(xScale.scale(x),yScale.scale(y),r,colors.blue());
      }
    }
  }
  function circle(x,y,r,color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
  function line({ x1, x2, y1, y2}, stroke, strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(xScale.scale(x1), yScale.scale(y1));
    ctx.lineTo(xScale.scale(x2), yScale.scale(y2));
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
  }
}
