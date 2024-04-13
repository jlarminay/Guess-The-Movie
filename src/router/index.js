import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import MovieView from '@/views/MovieView.vue';
import ScoresView from '@/views/ScoresView.vue';
import InfoView from '@/views/InfoView.vue';
import HelpView from '@/views/HelpView.vue';
import ListView from '@/views/ListView.vue';

export default createRouter({
  history: createWebHistory('/movies/'),
  routes: [
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/movie/:movieId',
      name: 'MovieView',
      component: MovieView,
      props: true,
    },
    {
      path: '/scores',
      name: 'ScoresView',
      component: ScoresView,
    },
    {
      path: '/info',
      name: 'InfoView',
      component: InfoView,
    },
    {
      path: '/help',
      name: 'HelpView',
      component: HelpView,
    },
    {
      path: '/admin/list',
      name: 'ListView',
      component: ListView,
    },

    { path: '/', redirect: '/home' },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
});
