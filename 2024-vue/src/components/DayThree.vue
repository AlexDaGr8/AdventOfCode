<template>
    <h1>Day 3: Corrupted Input</h1>
    <button @click="swapData">Swap data {{ filePath }}</button>
    <div class="container grid col-2">
        <div class="grid">
            <p class="word-break" v-html="dataHtml"></p>
        </div>
        <div>
            <h2>Part 2</h2>
            <h3>{{ part2Total }}</h3>
            <div class="grid col-2">
                <div>
                    <h4>Do matches</h4>
                    <div v-for="d in doMatches" :key="d">{{ d }}</div>
                </div>
                <div>
                    <h4>Don't matches</h4>
                    <div v-for="dn in dontMatches" :key="dn">{{ dn }}</div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { getInput } from '@/util';
import { ref, computed, onMounted } from 'vue';

onMounted(initData)

const filePath = ref('day3/test.txt');
const data = ref([]);
const dataHtml = ref();
const part1Total = ref(0);
const part2Total = ref(0);
const matches = ref([]);
const mulRegex = /mul\(\d{1,3}\,\d{1,3}\)/g;
const doRegex = /(?<=(do\(\).+))(?<!(don\'t\(\).+))(mul\(\d{1,3}\,\d{1,3}\))/g
const dontRegex = /(?<=(don\'t\(\).+))(mul\(\d{1,3}\,\d{1,3}\))/g

const doMatches = ref([]);
const dontMatches = ref([]);

function part1() {
    part1Total.value = 0;

    matches.value = data.value.match(mulRegex);

    for (const m of matches.value) {
        let [num1, num2] = m.match(/\d{1,3}/g);
        num1 = +num1;
        num2 = +num2;

        part1Total.value += (num1 * num2);
    }
}
function part2(fileData) {
    const replaceR = fileData.replace(/\r/g, "");
    const split = replaceR.split('\n');
    const filter = split.filter(x => x !== "");
    const map = filter.map(x => x.matchAll(/(?:mul\((\d+),(\d+)\))|(?:(do\(\)))|(?:(don't\(\)))/g))

    let enabled = true;
    let afterDo = false;
    part2Total.value = map.reduce((a,c) => {
        if (!c) return a;

        let result = 0;
        for (let m of c) {
            let [match, num1, num2] = m;

            console.log('match', match);

            if (match === "don't()") {
                enabled = false;

                dataHtml.value = dataHtml.value.replaceAll(match, '<em class="green">$&</em>')
            }
            else if (match === "do()") {
                afterDo = true;
                enabled = true;

                dataHtml.value = dataHtml.value.replaceAll(match, '<em class="pink">$&</em>')
            }
            else if (enabled) {
                result += num1 * num2;

                if (afterDo) {
                    dataHtml.value = dataHtml.value.replace(match, '<em class="purple">$&</em>')
                } else {
                    dataHtml.value = dataHtml.value.replace(match, '<em class="yellow">$&</em>')
                }
            } else if (!enabled) {
                dataHtml.value = dataHtml.value.replace(match, '<em class="blue">$&</em>')
            }
        }

        return a + result;
    }, 0);
}

function convertToHtml(fileData) {
    const testDo = /(?<=(do\(\).+))(mul\(\d{1,3}\,\d{1,3}\))(?=(.+don't\(\).*)|(.+do\(\).*))/g
    const testDont = /(?<=(don't\(\).+))(mul\(\d{1,3}\,\d{1,3}\))(?=(.+don't\(\).*)|(.+do\(\).*))/g
    dataHtml.value = fileData.replace(/do\(\)/g, '<em class="pink">$&</em>');
    dataHtml.value = dataHtml.value.replace(/don\'t\(\)/g, '<em class="green">$&</em>');
    dataHtml.value = dataHtml.value.replace(/(mul\(\d{1,3}\,\d{1,3}\))/g, '<em class="yellow">$&</em>');
    dataHtml.value = dataHtml.value.replace(testDo, '<em class="purple">$&</em>');
    dataHtml.value = dataHtml.value.replace(testDont, '<em class="blue">$&</em>');

    console.log('dont', fileData.match(testDont));
    console.log('do', fileData.match(testDo));
}

async function initData() {
    console.log('day 3');

    let file = await getInput(filePath.value);

    data.value = file;
    dataHtml.value = file;

    // convertToHtml(file)

    part1();
    part2(file);
}

function swapData() {
    if (filePath.value.includes('test')) {
        filePath.value = 'day3/data.txt';
    } else {
        filePath.value = 'day3/test.txt';
    }

    initData();
}
</script>
