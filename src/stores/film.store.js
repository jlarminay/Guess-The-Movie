import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

import { useScoreStore } from '@/stores';

import movieData from '@/assets/movieData.js';
import possibleMovies from '@/assets/possibleMovies.js';

const env = import.meta.env;

export default defineStore({
  id: 'film',
  persist: false,

  state: () => ({
    totalMovieCount: movieData.length,
    allMovies: [],
  }),

  actions: {
    async getAllMovies(getAll = false) {
      this.allMovies = movieData
        .filter((_movie, id) => {
          if (getAll) return true;
          return (
            DateTime.fromISO(env.VITE_FIRST_DATE)
              .plus({ days: id * 2 })
              .diffNow('days')
              .toObject().days <= 0
          );
        })
        .map((movie, id) => {
          return {
            id: id + 1,
            title: movie,
            date: DateTime.fromISO(env.VITE_FIRST_DATE).plus({ days: id * 2 }),
          };
        })
        .reverse();

      return this.allMovies;
    },
    async getSingleMovie(id) {
      await this.getAllMovies();
      const scoreStore = useScoreStore();
      const tempMovies = this.allMovies.filter((movie) => !scoreStore.getRawScores()[movie.id]);

      // if random and user played all games
      if (id === 'random' && tempMovies.length === 0) {
        id = Math.floor(Math.random() * this.allMovies.length) + 1;
        id = parseInt(id);
        return this.allMovies.reverse()[id - 1] || false;
      }

      // if random
      if (id === 'random') {
        id = Math.floor(Math.random() * tempMovies.length) + 1;
        return tempMovies[id - 1] || false;
      }

      id = parseInt(id);
      return this.allMovies.reverse()[id - 1] || false;
    },
    async getAllPossibleMovies() {
      const combination = [...movieData, ...possibleMovies].sort((_a, _b) => Math.random() > 0.5);
      // Remove duplicates
      return [...new Set(combination)];
    },
  },
});
