 <template>
    <h1>{{ splitCap(route.path) }}: Word Search</h1>
    <button @click="swapData">Swap data {{ filePath }}</button>
    <div class="container grid col-2">
        <div class="grid scroll">
            <h2>Part 1</h2>
            <h3>Total Count: {{ totalCount }}</h3>
            <h3>All Line Count: {{ allLines.length }}</h3>
            <!-- {{ data }}
            <p class="font-lg" v-html="dataHtml"></p> -->
            <div v-for="line of allLines" :key="line">{{ line }}</div>
        </div>
        <div class="grid scroll">
            <h2>Part 2</h2>
            <h3>{{ crossCount }}</h3>
            <div v-for="line of diagonals" :key="line">{{ line }}</div>
        </div>
    </div>
    <!-- <div class="sticky">
        X: <input type="number" v-model="findXValue">
        Y: <input type="number" v-model="findYValue">
        <button class="secondary" @click="part2Real(data)">Find Value</button>
    </div> -->
    <p class="font-lg" v-html="dataHtml2"></p>
</template>

<script setup>
import { getInput, splitCap } from '@/util';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(initData)

const route = useRoute();
const day = route.path.replace('/', '');
const filePath = ref(`${day}/test.txt`);
const data = ref([]);
const dataHtml = ref();
const dataHtml2 = ref();
const findXValue = ref();
const findYValue = ref();
const allLines = ref([]);
const diagonals = ref([]);
let crossCount = ref(0);
const totalCount = computed(() => allLines.value.reduce((a,c) => {
    let rm = right(c);
    let lm = left(c);

    a += rm ? rm.length : 0;
    a += lm ? lm.length : 0;

    return a;
}, 0));
// THIS IS THE QUICK SOLUTION TO PART2
const part2Real = (data) => {
    let samLtoR = (x,y) => 
        (data[y - 1][x - 1] === 'M' && data[y + 1][x + 1] === 'S') ||
        (data[y - 1][x - 1] === 'S' && data[y + 1][x + 1] === 'M');
    let samRtoL = (x,y) => 
        (data[y + 1][x - 1] === 'M' && data[y - 1][x + 1] === 'S') ||
        (data[y + 1][x - 1] === 'S' && data[y - 1][x + 1] === 'M');

    let count = 0;
    for (let y = 1; y < data.length - 1; y++) {
        for (let x = 1; x < data[0].length; x++) {
            if (data[y][x] === 'A') {
                console.log('found a');
                if (samLtoR(x,y) && samRtoL(x,y)) {
                    count++;
                }
            }
        }
    }

    console.log(count);
}
const right = (line) => line.match(/XMAS/g);
const left = (line) => line.match(/SAMX/g);
const horizontal = () => {
    for (const line of data.value) {
        allLines.value.push(line.join(''));
    }
}
const vertical = () => {
    for (const i in data.value[0]) {
        const vertical = data.value.reduce((a,c) => a += c[i], '');

        allLines.value.push(vertical);
    }
}
const convertToDiagonals = (data) => {
    let resultArr = [];
    for (const [i, line] of Object.entries(data)) {
        let k = +i;

        if (k > 0) {
            let v = 0;
            let result = '';
            while (k < data.length) {
                result += data[k][v];
                k++;
                v++;
            }

            resultArr.push(result)
        }
        for (const [j, char] of Object.entries(line)) {
            let k = +i;
            let v = +j;

            if (k === 0)  {
                const lrDiag = data.reduce((a, c, ci) => {
                    if (k < data.length && v < line.length) {
                        a += data[k][v];

                        k++;
                        v++;
                    }

                    return a;
                }, '')

                resultArr.push(lrDiag)
            }
        }
    }

    return resultArr;
}
const convertToDiagonalsWithId = (data, reversed) => {
    let resultArr = [];
    for (const [i, line] of Object.entries(data)) {
        let k = +i;
        let lineLength = line.length - 1;
        let startPoint = { y: k, x: reversed ? lineLength : 0}


        if (k > 0) {
            let v = 0;
            let result = '';
            while (k < data.length) {
                result += data[k][v];
                k++;
                v++;
            }

            resultArr.push({ line: result, ...startPoint, isReversed: reversed })
        } else {

            for (const [j, char] of Object.entries(line)) {
                let k = +i;
                let v = +j;
                let startPoint = { y: k, x: reversed ? lineLength - v : v}

                if (k === 0)  {
                    const lrDiag = data.reduce((a, c, ci) => {
                        if (k < data.length && v < line.length) {
                            a += data[k][v];

                            k++;
                            v++;
                        }

                        return a;
                    }, '')

                    resultArr.push({ line: lrDiag, ...startPoint, isReversed: reversed })
                }
            }
        }
    }

    return resultArr;
}

function part1(data) {
    horizontal();
    vertical();
    allLines.value.push(...convertToDiagonals(data));
    allLines.value.push(...convertToDiagonals(data.map(d => d.slice().reverse())));
}

function part2(data) {
    diagonals.value.push(...convertToDiagonalsWithId(data, false));
    diagonals.value.push(...convertToDiagonalsWithId(data.map(d => d.slice().reverse()), true));

    const foundMAS = [];
    const start = { x: 0, y: 0};
    let reversed = false;

    function replacer(match, p1, p2, offset, string) {
        const x = reversed ? start.x - offset : start.x + offset;
        const y = start.y + offset;

        foundMAS.push({ x, y, reversed })
    }

    for (const diag of diagonals.value) {
        start.x = diag.x;
        start.y = diag.y;
        reversed = diag.isReversed;
        diag.line.replace(/(MAS)|(SAM)/g, replacer)
    }

    console.log('foundMAS', foundMAS);

    let foundCross = [];
    crossCount.value = 0;
    for (let mas of foundMAS) {
        const isCross = foundMAS.find(f => f.x === (mas.x + 2) && f.y === mas.y);

        if (isCross && !foundCross.find(f => f.x === isCross.x && f.y === isCross.y)) {
            crossCount.value++;

            foundCross.push(isCross);
        }
    }

    for (let fc of foundCross) {
        const dataPoint = data[fc.y][fc.x];


        if (dataPoint.length < 2) {
            data[fc.y][fc.x] = `<em class="pink">${dataPoint}</em>`
        }
    }

    dataHtml2.value = data.map(d => d.join('')).join('<br/>');
}

function convertToHTML(data) {
    dataHtml.value = data.replace(/\n/g, '<br/>');
    // dataHtml2.value = data.replace(/\n/g, '<br/>');
}

async function initData() {
    console.log(day);

    allLines.value = [];

    let file = await getInput(filePath.value);

    data.value = file.split('\n').map(d => d.split(''));

    // part1(file.split('\n').map(d => d.split('')));
    part2(file.split('\n').map(d => d.split('')));
    // convertToHTML(file);
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
