<script setup>
import { useScoreStore } from '@/stores';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors);

const scoreStore = useScoreStore();

function formatNumber(number) {
  if (number === Infinity) return 0;
  return Math.floor(number * 100).toFixed(1) || 0;
}
</script>

<template>
  <div class="tw_mt-6 tw_p-2">
    <h3>Stats</h3>

    <div class="tw_flex tw_justify-center tw_gap-2">
      <div class="tw_w-1/4 tw_px-4 tw_text-center">
        <p class="tw_mb-0">{{ scoreStore.games }}</p>
        <p>Played</p>
      </div>
      <div class="tw_w-1/4 tw_px-4 tw_text-center">
        <p class="tw_mb-0">{{ scoreStore.wins }}</p>
        <p>Won</p>
      </div>
      <div class="tw_w-1/4 tw_px-4 tw_text-center">
        <p class="tw_mb-0">{{ formatNumber(scoreStore.wins / scoreStore.games) }}</p>
        <p>Win %</p>
      </div>
    </div>

    <div class="tw_pt-10">
      <h3>Guess Breakdown</h3>
      <Bar
        :options="{
          responsive: true,
          legend: {
            display: false,
          },
        }"
        :data="{
          labels: ['1', '2', '3', '4', '5'],
          datasets: [
            {
              data: [
                scoreStore.breakdown[1],
                scoreStore.breakdown[2],
                scoreStore.breakdown[3],
                scoreStore.breakdown[4],
                scoreStore.breakdown[5],
              ],
            },
          ],
        }"
      />
    </div>

    <div class="tw_mt-10 tw_text-center">
      <p>
        You can reset your score here. This will delete everything and you can try playing again.
      </p>
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
