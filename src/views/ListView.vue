<script setup>
import { ref, onMounted } from 'vue'
import { useFilmStore } from '@/stores'

const filmStore = useFilmStore()
const allMovies = ref([])

onMounted(async () => {
  allMovies.value = await filmStore.getAll()
  allMovies.value.sort(() => Math.random() - 0.5)
})
</script>

<template>
  <pre>{{ allMovies }}</pre>
</template>
