<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useFilmStore, useScoreStore } from '@/stores'
import { DateTime, Duration } from 'luxon'

const filmStore = useFilmStore()
const scoreStore = useScoreStore()
const allMovies = ref([])
const timer = ref(null)
const timeleft = ref(0)

onMounted(async () => {
  allMovies.value = await filmStore.getAllMovies()
  timer.value = setInterval(() => {
    timeleft.value = DateTime.now().plus({ days: 1 }).startOf('day').diffNow('seconds').as('seconds').toFixed(0)
  }, 500)
})
onUnmounted(() => {
  clearInterval(timer.value)
})

function image (title) {
  title = title
    .replace(/[/:*"<>|]/g, '')
    .replace(/ /g, '_')
    .toLowerCase()
  return `/images/${title}/1.jpg`
}
</script>

<template>
  <div class="tw_mt-6 tw_p-4">
    <div
      v-if="Object.keys(scoreStore.rawScores).length === allMovies.length"
      class="tw_mb-10 tw_mt-4 tw_text-center"
    >
      <h3>You've' played all the games!</h3>
      <h4>You can reset you score and play again!</h4>
      <q-btn
        color="negative"
        label="Reset Score"
        size="lg"
        flat
        no-caps
        @click="scoreStore.resetScore"
        class="tw_mt-2"
      />
    </div>
    <q-btn
      v-if="allMovies.length !== scoreStore.games"
      color="primary"
      label="Random Movie"
      size="lg"
      no-caps
      unelevated
      :to="{name: 'MovieView', params: {movieId: 'random'}}"
      class="tw_mb-8 tw_w-full"
    />

    <div v-if="allMovies.length !== filmStore.totalMovieCount" class="tw_mb-8 tw_text-center">
      <h5>Next Game in <span class="mono">{{ Duration.fromObject({seconds: timeleft}).toFormat('hh:mm:ss') }}</span></h5>
    </div>

    <div
      v-for="movie in allMovies"
      :key="movie.id"
      class="tw_mb-2 tw_flex tw_items-center tw_justify-center tw_gap-2"
    >
      <q-btn
        color="secondary"
        :to="{name: 'MovieView', params: {movieId: movie.id}}"
        class="
          tw_inline-block
          tw_w-[100px]
          tw_rounded
          tw_bg-accent
          tw_px-4
          tw_py-2
          tw_text-center
        "
      >
        # {{ movie.id }}
      </q-btn>
      <div class="tw_flex tw_justify-center">
        <div
          v-for="i in 5"
          :key="i"
          class="tw_m-0.5 tw_h-[20px] tw_w-[20px] tw_rounded "
          :class="scoreStore.rawScores[movie.id]?(i>=scoreStore.rawScores[movie.id]?(i==scoreStore.rawScores[movie.id]?'tw_bg-positive':'tw_bg-[#6b7d95]'):'tw_bg-negative'):'tw_bg-[#6b7d95] tw_opacity-50'"
        />
      </div>
      <span class="tw_w-[90px] tw_text-center">
        {{ scoreStore.rawScores[movie.id]?(scoreStore.rawScores[movie.id]<=5?'🏆 Won':'😞 Lost'):' Not Played' }}
      </span>
      <div v-if="false" class="tw_w-[250px] tw_border">
        {{ movie.title }}
        <img
          :src="image(movie.title)"
          alt="no image"
          class="tw_h-full tw_w-full tw_object-contain"
        >
      </div>
    </div>
  </div>
</template>
