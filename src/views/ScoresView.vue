<script setup>
import { useScoreStore } from '@/stores'

const scoreStore = useScoreStore()

function formatNumber (number) {
  if (number === Infinity) return 0
  return (Math.floor(number * 100)).toFixed(1) || 0
}
</script>

<template>
  <div class="tw_mt-6 tw_p-4">
    <h3>Stats</h3>
    <pre>{{ scoreStore.allScores }}</pre>

    <div class="tw_flex tw_justify-center tw_gap-2">
      <div class="tw_w-1/4 tw_px-4 tw_text-center">
        <h3 class="tw_mb-0">{{ scoreStore.games }}</h3>
        <h4>Played</h4>
      </div>
      <div class="tw_w-1/4 tw_px-4 tw_text-center">
        <h3 class="tw_mb-0">{{ scoreStore.wins }}</h3>
        <h4>Won</h4>
      </div>
      <div class="tw_w-1/4 tw_px-4 tw_text-center">
        <h3 class="tw_mb-0">{{ formatNumber(scoreStore.wins/scoreStore.games) }}</h3>
        <h4>Win %</h4>
      </div>
    </div>

    <div>
      <pre>{{ scoreStore.breakdown }}</pre>
    </div>

    <div class="tw_mt-10 tw_text-center">
      <p>You can reset your score here. This will delete everything and you can try playing again.</p>
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
  </div>
</template>
