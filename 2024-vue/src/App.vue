<template>
  <nav>
    <RouterLink :to="previousDay" v-if="previousDay">< Previous Day</RouterLink>
    <RouterLink to="/" v-if="route.path !== '/'">Home</RouterLink>
    <RouterLink :to="nextDay" v-if="nextDay">Next Day ></RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { splitCap } from '@/util';

const route = useRoute();
const previousDay = computed(() => {
  const path = route.path;

  if (path === '/' || path === '/day1') return undefined;

  return path.replace(/\d+/g, (match) => (+match - 1));
});
const nextDay = computed(() => {
  const path = route.path;

  if (path === '/' || path === '/day25') return undefined;

  return path.replace(/\d+/g, (match) => (+match + 1));
});
</script>
