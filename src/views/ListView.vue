<script setup>
import { ref, onMounted, computed } from 'vue'
import { useFilmStore } from '@/stores'

const filmStore = useFilmStore()

const allMovies = ref([])
const search = ref('')
const loadAmount = ref(50)

onMounted(async () => {
  allMovies.value = await filmStore.getAllMovies(true)
})

function image (title, number) {
  title = title
    .replace(/[/:*"<>|]/g, '')
    .replace(/ /g, '_')
    .toLowerCase()
  return `/images/${title}/${number}.jpg`
}
function loadMore () {
  loadAmount.value += 20
}

const cleanedMovies = computed(() => {
  // only return up to loadAmount
  return allMovies.value
    .filter(movie => {
      return movie.title.toLowerCase().includes(search.value.toLowerCase())
    })
    .slice(0, loadAmount.value)
})

</script>

<template>
  <div class="tw_mt-6 tw_p-4">
    <div class="tw_mb-10">
      <q-input
        v-model="search"
        placeholder="Search..."
        outlined
        dense
        class="tw_rounded tw_bg-white"
      />
      <div class="tw_text-center">
        {{ cleanedMovies.length }}/{{ allMovies.length }} movies
      </div>
    </div>

    <div>
      <div v-for="(movie, i) in cleanedMovies" :key="i" class="tw_mb-10 tw_flex tw_items-center tw_justify-between">
        <div class="tw_w-[25%] tw_pr-2">
          {{ movie.title }}
          <hr class="tw_my-1 tw_opacity-10">
          {{ movie.date.toFormat('DD') }}
        </div>
        <div class="tw_w-[15%]">
          <img
            :src="image(movie.title, 1)"
            alt="none"
            class="tw_h-full tw_w-full tw_object-contain"
          >
        </div>
        <div class="tw_w-[15%]">
          <img
            :src="image(movie.title, 2)"
            alt=""
            class="tw_h-full tw_w-full tw_object-contain"
          >
        </div>
        <div class="tw_w-[15%]">
          <img
            :src="image(movie.title, 3)"
            alt=""
            class="tw_h-full tw_w-full tw_object-contain"
          >
        </div>
        <div class="tw_w-[15%]">
          <img
            :src="image(movie.title, 4)"
            alt=""
            class="tw_h-full tw_w-full tw_object-contain"
          >
        </div>
        <div class="tw_w-[15%]">
          <img
            :src="image(movie.title, 5)"
            alt=""
            class="tw_h-full tw_w-full tw_object-contain"
          >
        </div>
      </div>

      <div class="tw_mb-10 tw_text-center">
        <q-btn
          label="Load More"
          color="primary"
          unelevated
          @click="loadMore"
        />
      </div>
    </div>
  </div>
</template>
