import { getResult } from '../Util.js';

console.clear();
init();
async function init() {
  let data = await getResult('./day6/inputtest.txt').then(part2);

}
function part1(input) {
  console.log('-----part1-----')
  // let data = input.split(',').map(d => +d);
  let data = [0];
  let set = [];

  console.log('formula', fishFormula(data[0], 18))

  for (let day = 0; day < 18; day++) {
    for (let i in data) {
      data[i]--;
      if (data[i] < 0) {
        data.push(8);
        data[i] = 6
      }
    }
  }

  console.log('data', data.length);
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
  let create = Math.floor(1 + (firstFishDay / 7));
  console.log('create', create)
  console.log('firstFishDay', firstFishDay)
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
        let created = Math.floor((day - 8) / 7);
        console.log(day, thisIter, created)
        creations += created;
        console.log(creations)
        day = day - 8;
        findCreations(day, created)
      }
    }
  }
  console.log('creations', creations);
  return 1 + create + creations;
}
