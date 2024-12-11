<template>
    <h1>Day 2: Nuclear safety report</h1>
    <button @click="swapData">Swap data {{ filePath }}</button>


    <div class="container grid col-2">
        <div>
            <h2>Part 1</h2>
            <h3>Safe Reports: {{ safeReports }}</h3>
            <div class="grid col-2 center">
                <template v-for="d in data" :key="d">
                    <span>
                        <span v-for="(l,i) in d.levels"
                            :key="`${l}-level`"
                            class="level">
                            {{ l }} 
                        </span>
                    </span>
                    <div>
                        <p>
                            inc: <span :class="d.isSafe.inc ? 'true' : 'false'"></span>
                        </p>
                        <p>
                            dec: <span :class="d.isSafe.dec ? 'true' : 'false'"></span>
                        </p>
                        <p>
                            safe: <span :class="d.isSafe.safe ? 'true' : 'false'"></span>
                        </p>
                    </div>
                </template>
            </div>
        </div>
        <div>
            <h2>Part 2</h2>
            <h3>
                Safe Reports: {{ part2SafeReports }}
                <button @click="testReports">Test Reports</button>
            </h3>
            <div class="grid col-2 center">
                <template v-for="d in unsafeReports" :key="d">
                    <span>
                        <span v-for="(l,i) in d.levels"
                            :key="`${l}-level`"
                            class="level"
                            :class="{ 'unsafe': isUnsafe(d, i) }">
                            {{ l }}
                        </span>
                    </span>
                    <div>
                        <p>
                            inc: <span :class="d.isSafe.inc ? 'true' : 'false'"></span>
                        </p>
                        <p>
                            dec: <span :class="d.isSafe.dec ? 'true' : 'false'"></span>
                        </p>
                        <p>
                            safe: <span :class="d.unsafeId > -1 ? 'true' : 'false'"></span>
                        </p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getInput } from '@/util';
import { ref, computed, onMounted } from 'vue';

onMounted(initData)

const filePath = ref('day2/test.txt');
const data = ref([]);
const safeReports = computed(() => data.value.filter(d => d.isSafe.safe).length);
const unsafeReports = computed(() => data.value.filter(d => !d.isSafe.safe));
const part2SafeReports = computed(() => 
    data.value.filter(d => d.isSafe.safe).length + unsafeReports.value.filter(r => r.unsafeId > -1).length
)
const isInc = (report) => report.reduce((a,c) => c > a ? c : Infinity, -1) !== Infinity;
const isDec = (report) => report.reduce((a,c) => c < a ? c : -1, Infinity) !== -1;
const isUnsafe = (report, index) => report.unsafeId === index;
const isSafe = (report) => {
    const inc = isInc(report);
    const dec = isDec(report);
    let safe = false;

    if (inc || dec) {
        let first = report[0];
        let levelSafety = [];

        for (const r of report.slice(1)) {
            const levelDiff = Math.abs(first - r);

            levelSafety.push(levelDiff !== 0 && levelDiff < 4);

            first = r;
        }

        safe = levelSafety.every(ls => ls);
    }

    return { inc, dec, safe }
}

function testReports() {
    for (const report of unsafeReports.value) {
        const testLevel = report.levels.slice();

        for (let [ci,c] of Object.entries(testLevel)) {
            ci = +ci;
            
            const testArray = [
                ...testLevel.slice(0, ci),
                ...testLevel.slice(ci + 1)
            ];
            const check = isSafe(testArray);

            if (check.safe) {
                report.unsafeId = ci;

                break;
            }
        }
    }
}

async function initData() {
    console.log('day 2');

    let file = await getInput(filePath.value);

    data.value = file.split('\n')
        .map(s => {
            const levels = s.split(' ').map(r => +r)
            
            return {
                levels,
                isSafe: isSafe(levels),
                unsafeId: -1
            }
        });
}

function swapData() {
    if (filePath.value.includes('test')) {
        filePath.value = 'day2/data.txt';
    } else {
        filePath.value = 'day2/test.txt';
    }

    initData();
}
</script>

<style scoped>
.level {
    padding: 0 1rem;

    &.unsafe {
        color: var(--white);
        font-size: larger;
        text-shadow: 0 0 3px var(--white);
    }
}
.true {
    color: var(--green);

    &::before {
        content: 'true';
    }
}
.false {
    color: var(--red);

    &::before {
        content: 'false';
    }
}
</style>