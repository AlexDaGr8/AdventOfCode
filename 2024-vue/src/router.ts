import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '@/components/HomeView.vue';
import DayTemplate from '@/components/DayTemplate.vue';

export const routes = [
    { path: '/', component: HomeView },
    { path: '/day1', component: () => import('@/components/DayOne.vue'), meta: { stars: '★★' } },
    { path: '/day2', component: () => import('@/components/DayTwo.vue'), meta: { stars: '★★' }  },
    { path: '/day3', component: () => import('@/components/DayThree.vue'), meta: { stars: '★★' }  },
    { path: '/day4', component: () => import('@/components/DayFour.vue'), meta: { stars: '★★' }  },
    { path: '/day5', component: () => import('@/components/DayFive.vue'), meta: { stars: '★★' }  },
    { path: '/day6', component: () => import('@/components/DaySix.vue'), meta: { stars: '★☆' }  },
    { path: '/day7', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day8', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day9', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day10', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day11', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day12', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day13', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day14', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day15', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day16', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day17', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day18', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day19', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day20', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day21', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day22', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day23', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day24', component: DayTemplate, meta: { stars: '☆☆' }  },
    { path: '/day25', component: DayTemplate, meta: { stars: '☆☆' }  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})