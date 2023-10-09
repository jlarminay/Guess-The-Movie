import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/MovieView.vue'
import ScoresView from '@/views/ScoresView.vue'
import InfoView from '@/views/InfoView.vue'
import HelpView from '@/views/HelpView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/movie/:movieId',
      name: 'MovieView',
      component: MovieView,
      props: true
    },
    {
      path: '/scores',
      name: 'ScoresView',
      component: ScoresView
    },
    {
      path: '/info',
      name: 'InfoView',
      component: InfoView
    },
    {
      path: '/help',
      name: 'HelpView',
      component: HelpView
    },

    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', redirect: '/home' }
  ]
})
