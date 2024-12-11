<template>
    <h1>{{ splitCap(route.path) }} - Suit manufacturing</h1>
    <button @click="swapData">Swap data {{ filePath }}</button>
    <div class="container grid">
        part1: {{ data.filter(d => d.visited).length }}
        <br>
        part 2: {{ loops.length }}
        <div class="grid" :class="colSize">
            <span v-for="d of data"
                class="item"
                :class="{ 
                    'visited': d.visited,
                    'blocker': d.value === '#',
                    'guard': d.isGuard
                }">
                {{ d.value }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { getInput, splitCap } from '@/util';
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

onMounted(initData)

const route = useRoute();
const day = route.path.replace('/', '');
const filePath = ref(`${day}/test.txt`);
const colSize = ref();
const data = ref([]);
const loops = ref([]);
const max = reactive({ x: 0, y: 0 });

function part1() {
    let isDone = false;
    let guardLocations = [];

    while (!isDone) {
        isDone = checkVals();
    }

    function checkVals() {
        const locationId = data.value.findIndex(d => !['.', '#', 'X'].includes(d.value));
        const timeout = 1;

        if (locationId === -1) {
            return true;
        }

        const location = data.value[locationId];
        const outOfBounds = location.x + 1 > max.x || location.x - 1 < 0 || location.y + 1 > max.y || location.y - 1 < 0;
        const upId = data.value.findIndex(d => d.x === location.x && d.y === location.y - 1);
        const rightId = data.value.findIndex(d => d.x === location.x + 1 && d.y === location.y);
        const downId = data.value.findIndex(d => d.x === location.x && d.y === location.y + 1);
        const leftId = data.value.findIndex(d => d.x === location.x - 1 && d.y === location.y);
        const currentValue = location.value;
        
        guardLocations.push({...location});
        
        location.visited = true;
        location.value = 'X'

        if (outOfBounds) {
            return true;
        }

        if (currentValue === '^') {
            if (data.value[upId].value === '#') {
                data.value[rightId].value = '>';
                // data.value[rightId].isGuard = true;
            } else {
                data.value[upId].value = '^';
                // data.value[upId].isGuard = true;
            }
        } else if (currentValue === '>') {
            if (data.value[rightId].value === '#') {
                data.value[downId].value = 'v';
                // data.value[downId].isGuard = true;
            } else {
                data.value[rightId].value = '>';
                // data.value[rightId].isGuard = true;
            }
        } else if (currentValue === 'v') {
            if (data.value[downId].value === '#') {
                data.value[leftId].value = '<';
                // data.value[leftId].isGuard = true;
            } else {
                data.value[downId].value = 'v';
                // data.value[downId].isGuard = true;
            }
        } else if (currentValue === '<') {
            if (data.value[leftId].value === '#') {
                data.value[upId].value = '^';
                // data.value[upId].isGuard = true;
            } else {
                data.value[leftId].value = '<';
                // data.value[leftId].isGuard = true;
            }
        }

        return false;
    }

    return guardLocations;
}

function getNextBlock(dir, location, data) {
    let block;
    if (dir === '^') {
        const blocks = data
            .filter(d => d.value === '#' && d.x === location.x && d.y < location.y);
        blocks.sort((a, b) => b.y - a.y)

        block = blocks[0];

        if (!block) { return undefined; }

        const nextId = data.findIndex(d => d.x === block.x && d.y === (block.y + 1))
        data[nextId].value = '>';
    } else if (dir === '>') {
        const blocks = data
            .filter(d => d.value === '#' && d.y === location.y && d.x > location.x);
        blocks.sort((a, b) => a.x - b.x)
        
        block = blocks[0];

        if (!block) { return undefined; }

        const nextId = data.findIndex(d => d.x === (block.x - 1) && d.y === block.y)
        data[nextId].value = 'v';
    } else if (dir === 'v') {
        const blocks = data
            .filter(d => d.value === '#' && d.x === location.x && d.y > location.y);
        blocks.sort((a, b) => a.x - b.x)
        
        block = blocks[0];

        if (!block) { return undefined; }

        const nextId = data.findIndex(d => d.x === block.x && d.y === (block.y - 1))
        data[nextId].value = '<';
    } else if (dir === '<') {
        const blocks = data
            .filter(d => d.value === '#' && d.y === location.y && d.x < location.x);
        blocks.sort((a, b) => b.x - a.x)
        
        block = blocks[0];

        if (!block) { return undefined; }

        const nextId = data.findIndex(d => d.x === (block.x + 1) && d.y === block.y)
        data[nextId].value = '^';
    }

    return block;
}

function checkVisited(arr) {
    const ids = arr.map(v => v.id);
    const set = [...new Set(ids)];

    return ids.length > set.length;
}

function checkLoops(lines, obstical) {
    let data = formatData(lines);
    let newBlock = data.findIndex(d => d.x === obstical.x && d.y === obstical.y);
    data[newBlock].value = '#';

    let i = 0;
    let isDone = false;
    let isLoop = false;
    let visited = [];

    while(!isDone && !isLoop) {
        isDone = checkVals();

        isLoop = checkVisited(visited);

        if (isLoop) {
            const lastTwoIds = visited.slice(visited.length - 2).map(v => v.id);
            const lastTwoSame = lastTwoIds[0] === lastTwoIds[1];


            if (!lastTwoSame) loops.value.push(obstical);
        }

        i++;
    }

    function checkVals() {
        const locationId = data.findIndex(d => !['.', '#', 'X'].includes(d.value));

        if (locationId === -1) {
            return true;
        }

        const location = data[locationId];
        const currentValue = location.value;

        location.value = 'X'
        location.visited = true;
        location.visits.push(currentValue);
        visited.push(location);

        let block = getNextBlock(currentValue, location, data);

        return !block ? true : false;
    }
}

function formatData(lines) {
    let data = [];

    for (let [y, line] of Object.entries(lines)) {
        for (let [x, char] of Object.entries(line)) {
            data.push({
                value: char,
                isGuard: char === '^',
                visited: false,
                visits: [],
                x: +x,
                y: +y,
                id: `${x}-${y}`
            });
        }
    }

    return data;
}

function part2(lines, guardLocations) {
    for (const location of guardLocations) {
        checkLoops(lines, location);
    }

    console.log('part2', loops.value);
}

async function initData() {
    console.clear();
    console.log('day 2');

    let file = await getInput(filePath.value);
    const lines = file.split('\n');

    data.value = [];

    for (let [y, line] of Object.entries(lines)) {
        for (let [x, char] of Object.entries(line)) {
            data.value.push({
                value: char,
                isGuard: char === '^',
                visited: false,
                visits: [],
                x: +x,
                y: +y,
                id: `${x}-${y}`
            });
        }
    }

    max.x = Math.max(...data.value.map(d => d.x));

    max.y = Math.max(...data.value.map(d => d.y));

    colSize.value = `col-${max.x + 1}`

    const guardLocations = part1();
    const distinctGuardLocations = [...new Map(guardLocations.map(item => [item['id'], item])).values()];

    part2(lines, distinctGuardLocations);
}

function swapData() {
    if (filePath.value.includes('test')) {
        filePath.value = `${day}/data.txt`;
    } else {
        filePath.value = `${day}/test.txt`;
    }

    initData();
}
</script>

<style scoped>
.container {
    width: auto;
}

.col-130 {
    grid-template-columns: repeat(130, 15px);
}
.item {
    height: 20px;
    font-size: 15px;
}
.visited {
    color: var(--pink);
    background: var(--blue);
}
.blocker {
    background: var(--yellow);
}
.guard {
    background: var(--pink);
}
</style>
