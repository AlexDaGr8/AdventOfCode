<template>
    <h1>Day 1: Similarity</h1>
    <button class="secondary" @click="doSort">Sort</button>
    <button @click="swapData">Swap data {{ filePath }}</button>

    <div class="container grid col-2">
        <div>
            <h2>Part 1</h2>
            <h3>Total sum = {{ dataSum }}</h3>
            <div class="grid col-3 scroll">
                <template v-for="(item, index) in left" :key="index">
                    <div>{{ left[index] }}</div>
                    <div>{{ right[index] }}</div>
                    <div>{{ absDiff(left[index], right[index]) }}</div>
                </template>
            </div>
        </div>
        <div>
            <h2>Part 2</h2>
            <h3>Total similarity score = {{ similaritySum }}</h3>
            <h3>Total selected = {{ totalSelected }}</h3>
            <div class="grid col-3 scroll">
                <template v-for="(item, index) in left" :key="index">
                    <div @click="clicked(left[index])">{{ left[index] }}</div>
                    <div :class="{ 'selected': isSelected(right[index]) }">{{ right[index] }}</div>
                    <div>{{ similarityScore(left[index], right) }}</div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getInput } from '@/util';
import { ref, computed, onMounted } from 'vue';

onMounted(initData)

const filePath = ref('day1/part1test.txt');
const data = ref([]);
const dataSum = computed(() => left.value.reduce(
    (a,c,ci) => a += absDiff(c, right.value[ci]),
    0
));
const totalSelected = computed(() => right.value.filter(r => r === selectedItem.value).length)
const similaritySum = computed(() => left.value.reduce(
    (a,c,ci) => a += similarityScore(c, right.value),
    0
));
const left = ref([]);
const right = ref([]);
const sortFunc = (a,b) => +a - +b;
const absDiff = (num1, num2) => Math.abs(num1 - num2);
const similarityScore = (num, arr) => {
    const unique = arr.filter(a => a === num);

    return unique.length * num;
}
const selectedItem = ref(-1);
const clicked = (val) => selectedItem.value = val;
const isSelected = (val) => selectedItem.value === val;

async function initData() {
    let file = await getInput(filePath.value);

    data.value = file.split('\n');

    for (const d of data.value) {
        const split = d.match(/\d+/g);

        left.value.push(split[0]);
        right.value.push(split[1]);
    }
}
function doSort() {
    left.value.sort(sortFunc);
    right.value.sort(sortFunc);
}

function swapData() {
    filePath.value = 'day1/part1.txt';

    left.value = [];
    right.value = [];

    initData();
}
</script>

<style scoped>
.selected {
    color: forestgreen;
    font-size: larger;
    font-weight: bolder;
}

</style>