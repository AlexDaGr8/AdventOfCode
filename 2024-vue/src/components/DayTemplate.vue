<template>
    <h1>{{ splitCap(route.path) }}</h1>
    <button @click="swapData">Swap data {{ filePath }}</button>
    <div class="container grid col-2">
        <div>
            <h2>Part 1</h2>
        </div>
        <div>
            <h2>Part 2</h2>
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
const data = ref([]);

async function initData() {
    console.log('day 2');

    let file = await getInput(filePath.value);

    data.value = file.split('\n');
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
