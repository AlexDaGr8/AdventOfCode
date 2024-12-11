<template>
    <h1>{{ splitCap(route.path) }}: Sleigh launch safety manual</h1>
    <button @click="swapData">Swap data {{ filePath }}</button>
    <div class="container grid col-2">
        <div>
            <h2>Part 1</h2>
            <h3>{{ correctSum }}</h3>
            <p v-html="correctUpdates.map(u => u.join(',')).join('<br/>')"></p>
        </div>
        <div>
            <h2>Part 2</h2>
            <h3>{{ incorrectSum }}</h3>
            <p v-html="incorrectUpdates.map(u => u.join(',')).join('<br/>')"></p>
        </div>
    </div>
</template>

<script setup>
import { getInput, splitCap } from '@/util';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

onMounted(initData)

const route = useRoute();
const day = route.path.replace('/', '');
const filePath = ref(`${day}/test.txt`);
const rules = ref([]);
const updates = ref([]);
const correctUpdates = ref([]);
const incorrectUpdates = ref([]);
const correctSum = computed(() => {
    const sum = correctUpdates.value.reduce((a,c) => a += c[Math.floor(c.length / 2)], 0);

    return sum;
});
const incorrectSum = computed(() => {
    const sum = incorrectUpdates.value.reduce((a,c) => a += c[Math.floor(c.length / 2)], 0);

    return sum;
});

function filterUpdates(rules, updates) {
    const correct = [];
    const incorrect = [];
    const incorrectRules = [];

    for (let update of updates) {
        let correctOrder = true;

        for (const rule of rules) {
            const before = update.findIndex(u => u === rule.before);
            const after = update.findIndex(u => u === rule.after);

            if (before > -1 && after > -1 && before > after) {
                correctOrder = false;

                incorrectRules.push(rule);
            }
        }
        if (correctOrder) {
            correct.push(update);
        } else {
            incorrect.push(update)
        }
    }

    return { correct, incorrect, incorrectRules };
}

function part1(rules, updates) {
    console.log('--- part 1 ---')

    const { correct, incorrect } = filterUpdates(rules, updates);

    correctUpdates.value = correct;
}

function fixUpdates(rules, updates) {
    for (let update of updates) {
        for (const rule of rules) {
            const beforeId = update.findIndex(u => u === rule.before);
            const afterId = update.findIndex(u => u === rule.after);

            if (beforeId > -1 && afterId > -1 && beforeId > afterId) {
                    const temp = update[beforeId];
                    update[beforeId] = update[afterId]
                    update[afterId] = temp;
            }
        }
    }

    return updates;
}

function part2(rules, updates) {
    console.log('---- part 2 ----')
    const beforeFix = filterUpdates(rules, updates);

    console.log('before fix', beforeFix);

    const newUpdates = fixUpdates(beforeFix.incorrectRules, beforeFix.incorrect);
    const afterFix = filterUpdates(rules, newUpdates);

    console.log('afterFix', afterFix);

    const afterUpdates = fixUpdates(afterFix.incorrectRules, afterFix.incorrect);
    const afterFix2 = filterUpdates(rules, afterFix.incorrect);

    console.log('afterFix2', afterFix2);

    incorrectUpdates.value = beforeFix.incorrect;
}

async function initData() {
    console.clear();

    console.log('day 2');

    let file = await getInput(filePath.value);

    rules.value = [];
    updates.value = [];

    for (let line of file.split('\n')) {
        if (line.includes('|')) {
            const [before, after] = line.split('|');
            rules.value.push({ before: +before, after: +after });
        } else if (line !== '') {
            updates.value.push(line.split(',').map(l => +l));
        }
    }

    console.log('rules', rules.value);
    console.log('updates', updates.value);

    part1(rules.value, updates.value);
    part2(rules.value, updates.value);
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
