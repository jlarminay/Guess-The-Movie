<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFilmStore, useScoreStore } from '@/stores'

const filmStore = useFilmStore()
const scoreStore = useScoreStore()

const movie = ref(null)
const move = ref(1)
const showImage = ref(1)
const guess = ref('')
const pastGuesses = ref([])
const state = ref('playing') // playing, won, lost
const possibleMovies = ref([])
const cleanedPossibleMovies = ref([])
const showGuesses = ref(false)
const props = defineProps({
  movieId: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  await getRequiredData()
})

async function getRequiredData () {
  movie.value = await filmStore.getSingleMovie(props.movieId)
  possibleMovies.value = await filmStore.getAllPossibleMovies()
}

function filterMovieList (val, update, abort) {
  // check if val is empty or only 1 character
  if (val.length <= 1) {
    abort()
    return
  }
  update(() => {
    // filter possibleMovies to only include movies that include val
    cleanedPossibleMovies.value = possibleMovies.value
      .filter(movie =>
        // check normal name
        movie.toLowerCase().includes(val.toLowerCase()) ||
        // check name without special characters
        movie.replace(/[^\w\s]/gi, '').toLowerCase().includes(val.toLowerCase()) ||
        // check name without diacritics
        movie.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(val.toLowerCase())
      )
      .sort((_a, _b) =>
        Math.random() - 0.5
      )
  })
}
function checkGuess (skip = false) {
  // if no guess or skip is flase, return
  if (guess.value === '' && skip !== true) return
  // if state is not playing, return
  if (state.value !== 'playing') return

  // if skip is true, add false to pastGuesses, otherwise add guess
  pastGuesses.value.push(skip === true ? false : guess.value)

  // check if guess is correct
  if (guess.value === movie.value.title) {
    // if correct, add score to scoreStore and set state to won
    scoreStore.addScore(movie.value.id, move.value)
    state.value = 'won'
    return
  }
  // if incorrect, check if move is 5
  if (move.value >= 5) {
    move.value++
    // if move is 5, add score to scoreStore and set state to lost
    scoreStore.addScore(movie.value.id, move.value, pastGuesses.value)
    state.value = 'lost'
    return
  }
  // if move is not 5, increment move and showImage
  guess.value = ''
  move.value++
  showImage.value = move.value
}
const imageUrl = computed(() => {
  const title = movie.value.title
    .replace(/[/:*"<>|]/g, '')
    .replace(/ /g, '_')
    .toLowerCase()
  return `/images/${title}/${showImage.value}.jpg`
})
const previousGuesses = computed(() => {
  const tmp = pastGuesses.value
  tmp.reverse()
  return tmp
})

function playAgain () {
  getRequiredData()
  move.value = 1
  showImage.value = 1
  guess.value = ''
  pastGuesses.value = []
  state.value = 'playing'
}
</script>

<template>
  <div v-if="movie!==null" class="tw_mt-6 tw_p-4">
    <div class="tw_mb-2 tw_text-center">
      <h5>Movie #{{ movie.id }} | {{movie.date.toFormat('DD')}}</h5>
    </div>
    <div>
      <div class="tw_pointer-events-none tw_aspect-video tw_overflow-hidden tw_rounded tw_bg-black">
        <img
          :src="imageUrl"
          class="tw_h-full tw_w-full tw_object-contain"
        >
      </div>

      <div class="tw_mt-2 tw_flex tw_justify-center tw_gap-2 tw_text-center">
        <q-btn
          v-for="i in 5"
          :key="i"
          dense
          unelevated
          color="secondary"
          :label="i"
          class="tw_w-[40px]"
          :disable="move < i && state === 'playing'"
          @click="showImage = i"
        />
        <q-btn
          color="secondary"
          label="Skip >"
          no-caps
          unelevated
          @click="checkGuess(true)"
        />
      </div>

      <div class="tw_mt-6 tw_text-center">
        <div  v-if="state==='playing'">
          <p class="tw_text-center">{{ 6 - move }} {{ (6-move)>1?'guesses':'guess'}} left</p>
          <div class="tw_mt-4 tw_flex tw_max-w-full">
            <q-select
              color="primary"
              v-model="guess"
              :options="cleanedPossibleMovies"
              bordered
              outlined
              clearable
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              bg-color="blue-grey-10"
              input-style="color:white;"
              class="tw_w-full"
              @filter="filterMovieList"
            />
            <q-btn
              color="primary"
              :label="$q.screen.gt.xs?'Submit':''"
              icon="search"
              no-caps
              unelevated
              class="tw_rounded-l-none"
              :class="$q.screen.gt.xs?'tw_min-w-[120px]':'tw_min-w-[50px]'"
              @click="checkGuess"
            />
          </div>
        </div>

        <div v-if="state==='won'">
          <h3 class="tw_text-positive">You guessed it!</h3>
          <div class="tw_flex tw_justify-center">
            <div
              v-for="i in 5"
              :key="i"
              class="tw_m-0.5 tw_h-[20px] tw_w-[20px] tw_rounded "
              :class="i>=move?(i>move?'tw_bg-[#6b7d95]':'tw_bg-positive'):'tw_bg-negative'"
            />
          </div>
        </div>
        <div v-if="state==='lost'">
          <h4 class="tw_text-negative">Better luck next time.</h4>
          <h3>{{ movie.title }}</h3>
        </div>

        <div v-if="state!=='playing'" class="tw_flex tw_justify-center tw_gap-2">
          <q-btn
            color="primary"
            label="Back to Home"
            size="md"
            no-caps
            unelevated
            :to="{name: 'HomeView'}"
            class="tw_mt-2"
          />
          <q-btn
            v-if="movieId==='random'"
            color="primary"
            label="Random Movie"
            size="md"
            no-caps
            unelevated
            class="tw_mt-2"
            @click="playAgain()"
          />
        </div>

        <div class="tw_mt-6">
          <hr class="tw_opacity-20">
          <p
            v-if="state!=='playing'"
            class="tw_mt-2 tw_cursor-pointer tw_text-center tw_underline"
            @click="showGuesses = !showGuesses"
          >
            Past Guesses
          </p>
          <div
            v-if="state==='playing' || showGuesses"
          >
            <div
              v-for="(guess,i) in previousGuesses"
              :key="i"
              class="tw_flex tw_items-center tw_justify-start tw_gap-2 tw_p-2"
            >
              <div
                class="tw_h-[16px] tw_w-[16px] tw_rounded "
                :class="guess===movie.title?'tw_bg-positive':'tw_bg-negative'"
              />
              {{ guess?guess:'Skipped' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
:deep(.q-field__control){
  @apply tw_rounded-r-none tw_border-r-0;

  &::before {
    @apply tw_border-2 tw_border-primary tw_border-r-0;

    &:hover {
      @apply tw_border-primary;
    }
  }
}
</style>
