import { defineStore } from 'pinia';

export default defineStore({
  id: 'score',
  persist: true,

  state: () => ({
    games: 0,
    wins: 0,
    loses: 0,
    breakdown: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    rawScores: {},
  }),

  actions: {
    addScore(movieId, score) {
      // add to raw score
      this.rawScores[movieId] = score;
      // add to score breakdown
      this.breakdown[score]++;
      // add to total games
      this.games++;
      // add to wins or loses
      if (score <= 5) {
        this.wins++;
      } else {
        this.loses++;
      }
    },
    getRawScores() {
      return this.rawScores;
    },
    resetScore() {
      this.games = 0;
      this.wins = 0;
      this.loses = 0;
      this.breakdown = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      };
      this.rawScores = {};
    },
  },
});
