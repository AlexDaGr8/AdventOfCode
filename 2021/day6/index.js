import { getResult } from '../Util.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day6/inputtest.txt').then(part1);

}
function part1(input) {
  console.log('-----part1-----')
  let data = input.split(',').map(d => +d);
  // let data = [0]
  let days = 80
  let fish = data.slice();
  for (let day = 0; day < days; day++) {
    for (let i in fish) {
      fish[i]--;
      if (fish[i] < 0) {
        fish.push(8);
        fish[i] = 6
      }
    }
  }

  console.log('fish', fish.length)

  let newFish = 0;
  data.forEach(d => {
    console.log('-------d-------', d)
    let created = fishFormula(d, days);
    console.log('created', created)
    newFish += created;
    console.log('newFish', newFish)
  });
};

function part2(input) {
  console.log('-----part2-----')
  let data = input.split(',').map(d => +d);
  const growSchool = (data, days = 0) => {
    const fish = Array(9).fill()
      .map((_, idx) => {
        console.log('idx', idx);
        console.log('filter', data.filter(t => t === idx));
        return data.filter(t => t === idx).length
      });
    console.log(fish.slice());
    
    Array(days).fill().forEach((_, idx) => {
      const newFish = fish.shift();
      console.log('newFish', newFish);
      console.log('fish[6]', fish[6]);
      fish.push(newFish);
      fish[6] += newFish;
      console.log(fish.slice());
    });

    return fish.reduce((a,b) => a + b, 0);
  }

  console.log(growSchool(data, 80))

};

function fishFormula(life, days, created) {
  let firstFishDay = (days - life);
  let create = Math.round((firstFishDay / 6));
  console.log('initial create', create)
  let creations = 0;
  let iteration = 0;
  findCreations(firstFishDay, create)
  function findCreations(day,fish) {
    let thisIter = iteration++;
    console.log('iteration', thisIter);
    console.log('day', day);
    console.log('fish', fish);
    for (let i = 0; i < fish; i++) {
      if (day <= 7) break;
      else {
        let created = Math.round((day - 2) / 6);
        console.log('fish created', created)
        creations += created;
        console.log('new creations', creations)
        day = day - 9;
        findCreations(day, created)
      }
    }
  }
  console.log('creations', creations);
  return create + creations;
}
