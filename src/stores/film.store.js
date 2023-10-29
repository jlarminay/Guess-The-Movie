import { defineStore } from 'pinia'
import { DateTime } from 'luxon'

import movieData from '@/assets/movieData.js'
import possibleMovies from '@/assets/possibleMovies.js'

const env = import.meta.env

export default defineStore({
  id: 'film',
  persist: false,

  state: () => ({
    totalMovieCount: movieData.length,
    allMovies: []
  }),

  actions: {
    async getAllMovies () {
      this.allMovies = movieData
        .filter((_movie, id) => {
          return DateTime.fromISO(env.VITE_FIRST_DATE).plus({ days: id }).diffNow('days').toObject().days <= 0
        })
        .map((movie, id) => {
          return {
            id: id + 1,
            title: movie
          }
        })
        .reverse()

      return this.allMovies
    },
    async getAll () {
      return movieData
    },
    async getSingleMovie (id) {
      await this.getAllMovies()
      if (id === 'random') id = Math.floor(Math.random() * this.allMovies.length) + 1
      id = parseInt(id)
      return this.allMovies.reverse()[id - 1] || false
    },
    async getAllPossibleMovies () {
      const combination = [
        ...movieData,
        ...possibleMovies
      ].sort((_a, _b) => Math.random() > 0.5)
      return [...new Set(combination)]
    }
  }
})
