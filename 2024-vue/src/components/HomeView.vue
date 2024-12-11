<template>
  <h1>Home</h1>
  <div class="grid col-7 container">

    <h3 class="header bottom-divider" v-for="header of headers">{{ header }}</h3>
    <div v-for="day of days">

      <RouterLink class="calendar" :to="day.path" v-if="day.path !== ''">
        {{ day.name }}
        <span class="stars">{{ day.stars }}</span>
      </RouterLink>
      <div v-else></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { routes } from '../router';

onMounted(() => {
  getDays();
})

const headers = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday', 'Sunday'];
const days = ref([]);

function getDays() {
  const startDay = new Date('November 25, 2024');
  const endDay = new Date('December 25, 2024');

  for (let date = startDay; date <= endDay; date.setDate(date.getDate() + 1)) {
    const newDate = new Date(date);
    let path = '';
    let stars = ''

    if (newDate.getMonth() === 11) {
      path = `/day${newDate.getDate()}`;

      stars = routes.find(r => r.path === path).meta.stars;
    }


    days.value.push({ 
      date: new Date(date),
      path,
      name: `Day ${newDate.getDate()}`,
      toString: function() { return this.date.toLocaleDateString() },
      stars
    })
  }
}
</script>

<style>
.header {
  margin-bottom: 3rem;
}

.bottom-divider {
  border-bottom: solid 2px var(--green);
}

.stars {
  display: block;
  font-size: 1.5rem;
  color: var(--yellow);
}

.calendar {
  margin: 0.2rem;
  padding: 2rem;
  place-items: center;
  display: block;
}
</style>

